import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  scheduledTrips: null,
  scheduledTripsbyUser: null,
};
export const scheduledTripSlice = createSlice({
  name: "scheduledTrip",
  initialState,
  reducers: {
    fetchScheduledTrips: (state, action) => {
      state.scheduledTrips = action.payload;
    },
    scheduleATrip: (state, action) => {
      state.scheduledTrips = [...state.scheduledTrips, action.payload];
    },
    fetchScheduledTripsbyUser: (state, action) => {
      state.scheduledTripsbyUser = action.payload;
    },
  },
});
export const { fetchScheduledTrips, scheduleATrip, fetchScheduledTripsbyUser } =
  scheduledTripSlice.actions;

export default scheduledTripSlice.reducer;
