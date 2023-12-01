import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchRides = createAsyncThunk(
  "rides/fetchRides",
  async (_, { getState, rejectWithValue }) => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      console.error("User ID is not available");
      return rejectWithValue("User ID is not available");
    }

    try {
      const response = await fetch(`http://localhost:8080/rides/car/carId`);
      const rides = await response.json();

      console.log(`Fetched rides: `, rides); // Log all fetched rides
      console.log(`User ID: ${userId}`); // Log the user ID

      // Filter rides based on userId
      const userRides = rides.filter(ride => ride.userId === userId);
      console.log(`Filtered rides for user ${userId}: `, userRides); // Log filtered rides

      if (userRides.length === 0) {
        console.error("No rides found for this user");
        return rejectWithValue("No rides found for this user");
      }

      // If you want to use the first ride only:
      const firstRide = userRides[0];

      return {
        time: firstRide.readings.map((_, index) => `Reading ${index + 1}`),
        speed: firstRide.readings.map((reading) => reading.speed),
        rpm: firstRide.readings.map((reading) => reading.rpm),
        fuelConsumption: firstRide.readings.map(
          (reading) => reading.fuelConsumption
        ),
        airTemp: firstRide.readings.map((reading) => reading.airTemperature),
        engineTemp: firstRide.readings.map(
          (reading) => reading.engineTemperature
        ),
      };
    } catch (error) {
      if (!error.response) {
        return rejectWithValue("Network error or no response received");
      } else {
        return rejectWithValue(error.response.data || "Unknown server error");
      }
    }
  }
);



// Add the appropriate cases in your slice's extraReducers for pending, fulfilled, and rejected




const initialState = {
  currentRide: null,
  allRides: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  carId: null, // Add a new state property for carId
};

const ridesSlice = createSlice({
  name: "rides",
  initialState,
  reducers: {
    // Your existing reducers
    setCarId(state, action) {
      // Add a new reducer to set the carId state
      state.carId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRides.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRides.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentRide = action.payload;
        // Assuming the payload includes the carId, you can also store it
        state.carId = action.payload.carId;
      })
      .addCase(fetchRides.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

// Export the setCarId action creator
export const { setCarId } = ridesSlice.actions;

export default ridesSlice.reducer;
