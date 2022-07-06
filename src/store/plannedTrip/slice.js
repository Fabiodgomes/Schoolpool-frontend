import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allPlannedTrips: [],
  plannedTripDetails: null,
  scheduledTrips: null,
};
export const plannedTripSlice = createSlice({
  name: "plannedTrip",
  initialState,
  reducers: {
    fetchAllPlannedTrips: (state, action) => {
      state.allPlannedTrips = action.payload;
    },
    fetchOnePlannedTrip: (state, action) => {
      state.plannedTripDetails = action.payload;
    },
    fetchScheduledTrips: (state, action) => {
      state.scheduledTrips = action.payload;
    },
    inscription: (state, action) => {
      state.plannedTripDetails.capacity =
        state.plannedTripDetails.capacity - action.payload;
    },
    scheduleATrip: (state, action) => {
      state.scheduledTrips = [...state.scheduledTrips, action.payload];
    },
    planATrip: (state, action) => {
      state.allPlannedTrips = [...state.allPlannedTrips, action.payload];
    },
  },
});

export const {
  fetchAllPlannedTrips,
  fetchOnePlannedTrip,
  fetchScheduledTrips,
  inscription,
  scheduleATrip,
  planATrip,
} = plannedTripSlice.actions;

export default plannedTripSlice.reducer;
