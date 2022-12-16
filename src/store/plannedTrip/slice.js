import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allPlannedTrips: [],
  plannedTripDetails: null,
  plannedTripsByUser: null,
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
    inscription: (state, action) => {
      state.plannedTripDetails.capacity =
        state.plannedTripDetails.capacity - action.payload;
    },
    planATrip: (state, action) => {
      state.allPlannedTrips = [...state.allPlannedTrips, action.payload];
    },
    fetchPlannedTripsByUser: (state, action) => {
      state.plannedTripsByUser = action.payload;
    },
  },
});

export const {
  fetchAllPlannedTrips,
  fetchOnePlannedTrip,
  inscription,
  planATrip,
  fetchPlannedTripsByUser,
} = plannedTripSlice.actions;

export default plannedTripSlice.reducer;
