import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allPlannedTrips: [],
};

export const plannedTripSlice = createSlice({
  name: "plannedTrip",
  initialState,
  reducers: {
    fetchAllPlannedTrips: (state, action) => {
      state.allPlannedTrips = action.payload;
    },
  },
});

export const { fetchAllPlannedTrips } = plannedTripSlice.actions;

export default plannedTripSlice.reducer;
