import { apiUrl } from "../../config/constants";
import axios from "axios";
import { fetchAllPlannedTrips } from "./slice";

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
