import { apiUrl } from "../../config/constants";
import axios from "axios";
import {
  fetchAllPlannedTrips,
  fetchOnePlannedTrip,
  fetchScheduledTrips,
  inscription,
  scheduleATrip,
  planATrip,
  fetchScheduledTripsbyUser,
  fetchSchools,
  fetchPlannedTripsbyUser,
  fetchOneSchool,
} from "./slice";
import { showMessageWithTimeout } from "../appState/thunks";

export const fetchPlannedTrips = (token) => async (dispatch, getState) => {
  try {
    const response = await axios.get(`${apiUrl}/plannedtrips`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const plannedTrips = response.data;

    const decodeAddress = await Promise.all(
      plannedTrips?.map(async (plannedTrip) => {
        const addressResponse = await axios.get(
          `https://api.geoapify.com/v1/geocode/reverse?lat=${plannedTrip.latitude}&lon=${plannedTrip.longitude}&apiKey=e6ff33bae51a4163acddd7ac1183398f`
        );
        return {
          ...plannedTrip,
          address: addressResponse?.data.features[0].properties.address_line2,
        };
      })
    );

    dispatch(fetchAllPlannedTrips(decodeAddress));

    const usersTripsResponse = await axios.get(
      `${apiUrl}/plannedtrips/myplannedtrips`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const usersPlannedTrips = usersTripsResponse.data;

    const addAddress = await Promise.all(
      usersPlannedTrips.map(async (userTrip) => {
        const addressResponse = await axios.get(
          `https://api.geoapify.com/v1/geocode/reverse?lat=${userTrip.latitude}&lon=${userTrip.longitude}&apiKey=e6ff33bae51a4163acddd7ac1183398f`
        );
        return {
          ...userTrip,
          address: addressResponse?.data.features[0].properties.address_line2,
        };
      })
    );

    dispatch(fetchPlannedTripsbyUser(addAddress));
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
      const schoolId = response.data.schoolId;

      console.log("PLANNED TRIP DETAILS LATITUDE", plannedTripDetails.latitude);

      dispatch(fetchOnePlannedTrip(plannedTripDetails));

      const schoolResponse = await axios.get(`${apiUrl}/schools/${schoolId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const schoolDetails = schoolResponse.data;
      dispatch(fetchOneSchool(schoolDetails));

      const usersTripsResponse = await axios.get(
        `${apiUrl}/plannedtrips/myplannedtrips`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const usersPlannedTrips = usersTripsResponse.data;
      dispatch(fetchPlannedTripsbyUser(usersPlannedTrips));

      console.log("SCHOOL DETAILS", schoolDetails);
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

    dispatch(fetchScheduledTrips(scheduledTrips));
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

export const newPlannedTrip =
  (token, date, time, capacity, latitude, longitude, schoolId) =>
  async (dispatch, getState) => {
    if (!date || !time || !capacity || !latitude || !longitude || !schoolId) {
      dispatch(
        showMessageWithTimeout(
          "failure",
          true,
          `You have to provide all the informations to plan a new trip`,
          3000
        )
      );
    }
    try {
      const response = await axios.post(
        `${apiUrl}/plannedtrips/newplannedtrip`,
        {
          date,
          time,
          capacity,
          latitude,
          longitude,
          schoolId,
          transportationTypeId: 1,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const plannedTrip = response.data;

      const responsePlannedTrips = await axios.get(`${apiUrl}/plannedtrips`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const plannedTrips = responsePlannedTrips.data;

      const decodeAddress = await Promise.all(
        plannedTrips?.map(async (plannedTrip) => {
          const addressResponse = await axios.get(
            `https://api.geoapify.com/v1/geocode/reverse?lat=${plannedTrip.latitude}&lon=${plannedTrip.longitude}&apiKey=e6ff33bae51a4163acddd7ac1183398f`
          );
          return {
            ...plannedTrip,
            address: addressResponse?.data.features[0].properties.address_line2,
          };
        })
      );

      dispatch(
        planATrip({
          date: date,
          time: time,
          capacity: capacity,
          latitude: latitude,
          longitude: longitude,
          schoolId: schoolId,
          transportationTypeId: 1,
          userId: getState().user.user.id,
        })
      );
      dispatch(
        showMessageWithTimeout(
          "success",
          true,
          `New trip on ${date} at ${time} with ${capacity} booked `,
          3000
        )
      );
      dispatch(fetchAllPlannedTrips(decodeAddress));
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

export const fetchAllSchools = (token) => async (dispatch, getState) => {
  try {
    const response = await axios.get(`${apiUrl}/schools`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const schools = response.data;
    dispatch(fetchSchools(schools));
  } catch (error) {
    console.log(error.message);
  }
};

export const fetchUsersPlannedTrips = (token) => async (dispatch, getState) => {
  try {
    const response = await axios.get(`${apiUrl}/plannedtrips/myplannedtrips`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const plannedTrips = response.data;
    console.log("PLANNED TRIPS IN ACTIONS", plannedTrips);
    dispatch(fetchPlannedTripsbyUser(plannedTrips));
  } catch (error) {
    console.log(error.message);
  }
};

export const fetchSchoolDetails = (token) => async (dispatch, getState) => {
  try {
    const id = getState().plannedTrip.plannedTripDetails.schoolId;
    // console.log("GET STATE", id);

    const response = await axios.get(`${apiUrl}/schools/${1}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("GET STATE", getState());

    const schoolDetails = response.data;
    dispatch(fetchOneSchool(schoolDetails));
  } catch (error) {
    console.log(error.message);
  }
};
