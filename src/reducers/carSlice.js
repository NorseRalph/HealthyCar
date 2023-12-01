import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Async thunk to add a new car
export const addCar = createAsyncThunk(
  "cars/addCar",
  async (carData, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:8080/cars", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Include other headers if needed, like authorization tokens
        },
        body: JSON.stringify(carData),
      });

      if (!response.ok) {
        throw new Error("Server responded with an error!");
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchUserCarsByOwnerId = createAsyncThunk(
  "cars/fetchUserCarsByOwnerId",
  async (ownerId, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:8080/cars/owner/ownerId`);

      if (!response.ok) {
        throw new Error("Server responded with an error!");
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
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:8080/rides/car/carId");

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
