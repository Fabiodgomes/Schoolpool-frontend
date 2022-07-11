export const selectAllPlannedTrips = (state) =>
  state.plannedTrip.allPlannedTrips;

export const selectPlannedTripDetails = (state) =>
  state.plannedTrip.plannedTripDetails;

export const selectScheduledTrips = (state) => state.plannedTrip.scheduledTrips;

export const selectScheduledTripsByUser = (state) =>
  state.plannedTrip.scheduledTripsbyUser;

export const selectSchools = (state) => state.plannedTrip.schools;

export const selectPlannedTripsByUser = (state) =>
  state.plannedTrip.plannedTripsbyUser;
