import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  schools: null,
  schoolDetails: null,
};

export const schoolSlice = createSlice({
  name: "school",
  initialState,
  reducers: {
    fetchSchools: (state, action) => {
      state.schools = action.payload;
    },
    fetchOneSchool: (state, action) => {
      state.schoolDetails = action.payload;
    },
  },
});

export const { fetchSchools, fetchOneSchool } = schoolSlice.actions;

export default schoolSlice.reducer;
