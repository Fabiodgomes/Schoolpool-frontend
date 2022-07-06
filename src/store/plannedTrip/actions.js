import { apiUrl } from "../../config/constants";
import axios from "axios";
import {
  fetchAllPlannedTrips,
  fetchOnePlannedTrip,
  fetchScheduledTrips,
  inscription,
  scheduleATrip,
} from "./slice";

export const fetchPlannedTrips = (token) => async (dispatch, getState) => {
  try {
    const response = await axios.get(`${apiUrl}/plannedtrips`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const plannedTrips = response.data;
    dispatch(fetchAllPlannedTrips(plannedTrips));
  } catch (error) {
    console.log(error.message);
  }
};

export const fetchPlannedTripDetail =
  (id, token) => async (dispatch, getState) => {
    try {
      const response = await axios.get(`${apiUrl}/plannedtrips/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const plannedTripDetails = response.data;
      dispatch(fetchOnePlannedTrip(plannedTripDetails));
    } catch (error) {
      console.log(error.message);
    }
  };

export const fetchAllScheduledTrips = (token) => async (dispatch, getState) => {
  try {
    const response = await axios.get(`${apiUrl}/scheduledtrips`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const scheduledTrips = response.data;
    console.log("SCHEDULED TRIPS", scheduledTrips);
    dispatch(fetchScheduledTrips(scheduledTrips));
  } catch (error) {
    console.log(error.message);
  }
};

export const makeInscription =
  (id, token, numberOfKids) => async (dispatch, getState) => {
    try {
      const response = await axios.patch(
        `${apiUrl}/plannedtrips/${id}/inscription`,
        { numberOfKids },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("getState", getState());
      dispatch(inscription(numberOfKids));
      dispatch(
        scheduleATrip({
          numberOfKids: numberOfKids,
          plannedTripId: id,
          userId: getState().user.user.id,
        })
      );
    } catch (error) {
      console.log(error.message);
    }
  };
