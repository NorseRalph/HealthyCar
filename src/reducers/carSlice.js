import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import baseUrl from "../components/baseUrl";
import Cookies from "js-cookie";

// Async thunk to add a new car
export const addCar = createAsyncThunk(
  "cars/addCar",
  async (carData, { rejectWithValue, getState }) => {
    try {
      // You may need to get the ownerId from the state if it's stored there
      const { userId } = Cookies.get("userId"); // Adjust this to where the user information is stored in your state

      // Add ownerId to the carData before sending it to the API
      const completeCarData = { ...carData, ownerId: userId };

      // Use the correct endpoint as per your API specification in Postman
      const response = await axios.post(
        `${baseUrl}/cars/add`,
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

      const response = await fetch(`${baseUrl}/cars/owner/${ownerId}`);

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

export const fetchFirstRide = createAsyncThunk(
  "rides/fetchFirstRide",
  async (carId, { rejectWithValue }) => {
    try {
      const response = await fetch(`${baseUrl}/rides/car/${carId}`);

      if (!response.ok) {
        throw new Error("Server responded with an error!");
      }

      const rides = await response.json();

      // Assuming rides is an array of ride objects
      if (rides.length > 0) {
        const firstRide = rides[0];

        // Map the readings of the first ride for the chart
        return {
          time: firstRide.readings.map((_, index) => `Reading ${index + 1}`),
          speed: firstRide.readings.map((reading) => reading.speed),
          rpm: firstRide.readings.map((reading) => reading.rpm),

          fuelConsumption: firstRide.readings.map(
            (reading) => reading.fuelConsumption
          ),
          airTemperature: firstRide.readings.map(
            (reading) => reading.airTemperature
          ),
          engineTemperature: firstRide.readings.map(
            (reading) => reading.engineTemperature
          ),
        };
      }

      return null; // Return null if no rides are found
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const carSlice = createSlice({
  name: "cars",
  initialState: {
    cars: [],
    carDetails: null, // Store details for a single car
    carRides: [], // Store car rides
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
      .addCase(fetchFirstRide.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFirstRide.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Make sure to set the firstRide state correctly
        state.firstRide = action.payload;
      })
      .addCase(fetchFirstRide.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default carSlice.reducer;
