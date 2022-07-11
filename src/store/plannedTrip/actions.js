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

export const newPlannedTrip =
  (
    token,
    date,
    time,
    capacity,
    latitude,
    longitude,
    schoolId,
    transportationTypeId
  ) =>
  async (dispatch, getState) => {
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
          transportationTypeId,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("getState", getState());

      dispatch(
        planATrip({
          date: date,
          time: time,
          capacity: capacity,
          latitude: latitude,
          longitude: longitude,
          schoolId: schoolId,
          transportationTypeId: transportationTypeId,
          userId: getState().user.user.id,
        })
      );
    } catch (error) {
      console.log(error.message);
    }
  };

export const fetchUsersScheduledTrips =
  (token) => async (dispatch, getState) => {
    try {
      const response = await axios.get(
        `${apiUrl}/scheduledtrips/myscheduledtrips`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const scheduledTrips = response.data;
      console.log("SCHEDULED TRIPS IN ACTIONS", scheduledTrips);
      dispatch(fetchScheduledTripsbyUser(scheduledTrips));
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
    // const id = getState().data;
    // console.log("GET STATE", getState().plannedTrip?.plannedTripDetails);
    // // console.log("ID IN ACTIONS", id);
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
