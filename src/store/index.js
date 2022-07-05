import { configureStore } from "@reduxjs/toolkit";

import appStateReducer from "./appState/slice";
import userReducer from "./user/slice";
import plannedTripReducer from "./plannedTrip/slice";

export default configureStore({
  reducer: {
    appState: appStateReducer,
    user: userReducer,
    plannedTrip: plannedTripReducer,
  },
});
