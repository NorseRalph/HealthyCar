import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import baseUrl from "../components/baseUrl";
import Cookies from "js-cookie";
import axios from "axios";

// Async thunk to add a new car
export const addCar = createAsyncThunk(
  "cars/addCar",
  async (carData, { rejectWithValue }) => {
    try {
      // You may need to get the ownerId from the state if it's stored there
      const userId = localStorage.getItem("userId");

      // Add ownerId to the carData before sending it to the API
      const completeCarData = { ...carData, ownerId: userId };

      // Use the correct endpoint as per your API specification in Postman
      const response = await axios.post(
        `http://localhost:8080/cars/add`,
        completeCarData,
        {
          headers: {
            "Content-Type": "application/json",
            // Include the Authorization header if your API requires it
            // "Authorization": `Bearer ${yourAuthToken}`,
          },
        }
      ); 

      // No need to check for response.ok as axios will throw an error if the status is not 2xx
      return response.data; // Return the response data from the API
    } catch (error) {
      if (error.response) {
        // Reject with the error message or error response data
        return rejectWithValue(error.response.data);
      } else {
        // Reject with a generic error message or the error object
        return rejectWithValue("An error occurred while adding the car");
      }
    }
  }
);

// Async thunk to fetch cars by the owner's ID using the ID from cookies
export const fetchUserCarsByOwnerId = createAsyncThunk(
  "cars/fetchUserCarsByOwnerId",
  async (_, { rejectWithValue }) => {
    try {
      // Get the user ID from cookies
      const ownerId = Cookies.get("userId");
      if (!ownerId) {
        throw new Error("No owner ID found in cookies");
      }

      const response = await fetch(`${baseUrl}cars/owner/${ownerId}`);

      if (!response.ok) {
        throw new Error(`Server responded with an error: ${response.status}`);
      }

      const userCars = await response.json();
      return userCars;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchLatestRideByCarId = createAsyncThunk(
  "rides/fetchLatestRideByCarId",
  async (carId, { rejectWithValue }) => {
    try {
      const url = `http://localhost:8080/rides/latest/${carId}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Server responded with an error!");
      }

      const rideData = await response.json();

      // Convert the date array to an ISO string
      const isoDate = new Date(
        rideData.date[0],      // year
        rideData.date[1] - 1,  // month index (0-based)
        rideData.date[2],      // day
        rideData.date[3],      // hour
        rideData.date[4],      // minute
        rideData.date[5]       // second
      ).toISOString();

      // Return the ride data with the date as an ISO string
      return {
        ...rideData,
        date: isoDate, // Store the date as a string
      };
    } catch (error) {
      console.error("Fetch latest ride by car ID failed", error);
      return rejectWithValue(error.message || "Unknown server error");
    }
  }
);


const carSlice = createSlice({
  name: "cars",
  initialState: {
    cars: [],
    carDetails: null,
    carRide: null, // <-- Change this to a single object rather than an array
    status: "idle",
    error: null,
  },
  reducers: {
    // Your reducers here (if any)
  },
  extraReducers: (builder) => {
    builder
      .addCase(addCar.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addCar.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cars.push(action.payload);
      })
      .addCase(addCar.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchUserCarsByOwnerId.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserCarsByOwnerId.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cars = action.payload;
      })
      .addCase(fetchUserCarsByOwnerId.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchLatestRideByCarId.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLatestRideByCarId.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Now we store a single ride object, not an array
        state.carRide = action.payload;
      })
      .addCase(fetchLatestRideByCarId.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// Only reducers are typically exported from the slice, not the async thunks.
// Async thunk actions are exported from where they are created.
export default carSlice.reducer;

// If you have any reducers in this slice, export them like this:
// export const { yourReducer } = carSlice.actions;

