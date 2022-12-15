import { apiUrl } from "../../config/constants";
import axios from "axios";
import { fetchSchools, fetchOneSchool } from "./slice";

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

export const fetchSchoolDetails = (token) => async (dispatch, getState) => {
  try {
    const id = getState().plannedTrip.plannedTripDetails.schoolId;

    const response = await axios.get(`${apiUrl}/schools/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("GET STATE", getState());

    const schoolDetails = response.data;
    dispatch(fetchOneSchool(schoolDetails));
  } catch (error) {
    console.log(error.message);
  }
};
