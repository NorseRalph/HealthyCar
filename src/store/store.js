import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../reducers/userReducer.js";
import ridesReducer from "../reducers/ridesSlice.js"; // Import the rides reducer
import carSlice from "../reducers/carSlice.js";

const store = configureStore({
  reducer: {
    user: userReducer,
    rides: ridesReducer,
    cars: carSlice,
    // ... other reducers if you have any
  },
  // Middleware is automatically set up by configureStore
});

export default store;
