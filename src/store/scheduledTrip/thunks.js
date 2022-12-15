import { apiUrl } from "../../config/constants";
import axios from "axios";
import {
  fetchScheduledTrips,
  scheduleATrip,
  fetchScheduledTripsbyUser,
} from "./slice";
import { showMessageWithTimeout } from "../appState/thunks";

export const fetchAllScheduledTrips = (token) => async (dispatch, getState) => {
  try {
    const response = await axios.get(`${apiUrl}/scheduledtrips`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const scheduledTrips = response.data;

    dispatch(fetchScheduledTrips(scheduledTrips));
  } catch (error) {
    console.log(error.message);
  }
};

export const fetchUsersScheduledTrips =
  (token) => async (dispatch, getState) => {
    try {
      const response = await axios.get(`${apiUrl}/plannedtrips`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const plannedTrips = response.data;

      dispatch(fetchAllPlannedTrips(plannedTrips));

      const responseUsersScheduledTrips = await axios.get(
        `${apiUrl}/scheduledtrips/myscheduledtrips`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const scheduledTrips = responseUsersScheduledTrips.data;

      const addAddressScheduled = await Promise.all(
        scheduledTrips &&
          scheduledTrips.map(async (scheduledTrip) => {
            const addressResponse = await axios.get(
              `https://api.geoapify.com/v1/geocode/reverse?lat=${scheduledTrip.latitude}&lon=${scheduledTrip.longitude}&apiKey=e6ff33bae51a4163acddd7ac1183398f`
            );

            return {
              ...scheduledTrip,
              address:
                addressResponse?.data.features[0].properties.address_line2,
            };
          })
      );

      dispatch(fetchScheduledTripsbyUser(addAddressScheduled));
    } catch (error) {
      console.log(error.message);
    }
  };

export const makeInscription =
  (id, token, numberOfKids, latitude, longitude, capacity) =>
  async (dispatch, getState) => {
    if (numberOfKids > capacity) {
      dispatch(
        showMessageWithTimeout(
          "failure",
          true,
          `You are trying to register ${numberOfKids} kid(s) and there's only ${capacity} spot(s) left`,
          3000
        )
      );
    }
    if (!numberOfKids || numberOfKids < 1) {
      dispatch(
        showMessageWithTimeout(
          "failure",
          true,
          `You are trying to register a trip but you didn't provide the number of kids or it's less than 1`,
          3000
        )
      );
    }
    if (!latitude || !longitude) {
      dispatch(
        showMessageWithTimeout(
          "failure",
          true,
          `You have to provide a pick up point`,
          3000
        )
      );
    }
    try {
      const response = await axios.patch(
        `${apiUrl}/plannedtrips/${id}/inscription`,
        { numberOfKids, latitude, longitude },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch(
        showMessageWithTimeout(
          "success",
          true,
          `${numberOfKids} kid(s) registered on the trip`,
          3000
        )
      );
      dispatch(inscription(numberOfKids));
      dispatch(
        scheduleATrip({
          numberOfKids: numberOfKids,
          latitude: latitude,
          longitude: longitude,
          plannedTripId: id,
          userId: getState().user.user.id,
        })
      );
    } catch (error) {
      console.log(error.message);
    }
  };
