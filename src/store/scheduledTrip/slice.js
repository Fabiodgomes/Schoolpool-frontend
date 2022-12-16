import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  scheduledTrips: null,
  scheduledTripsByUser: null,
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
    fetchScheduledTripsByUser: (state, action) => {
      state.scheduledTripsByUser = action.payload;
    },
  },
});
export const { fetchScheduledTrips, scheduleATrip, fetchScheduledTripsByUser } =
  scheduledTripSlice.actions;

export default scheduledTripSlice.reducer;
