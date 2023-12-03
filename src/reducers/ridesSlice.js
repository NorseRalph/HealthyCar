import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseUrl from "../components/baseUrl";
// We now pass carId as an argument to the thunk
// We now pass carId as an argument to the thunk
export const fetchRides = createAsyncThunk(
  "rides/fetchRides",
  async (carId, { getState, rejectWithValue }) => {
    const userId = getState().auth.userId; // Assuming you have user ID in your auth slice state

    if (!userId) {
      console.error("User ID is not available");
      return rejectWithValue("User ID is not available");
    }

    try {
      // Use the base URL in the request
      const response = await fetch(`${baseUrl}rides/car/${carId}`);
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      const rides = await response.json();

      // Filter rides based on userId
      const userRides = rides.filter((ride) => ride.userId === userId);

      if (userRides.length === 0) {
        console.error("No rides found for this user");
        return rejectWithValue("No rides found for this user");
      }

      // Here we just return all rides for the user
      return userRides;
    } catch (error) {
      console.error("Fetch rides failed", error);
      return rejectWithValue(error.message || "Unknown server error");
    }
  }
);

const initialState = {
  currentRide: null,
  allRides: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  carId: null,
};

const ridesSlice = createSlice({
  name: "rides",
  initialState,
  reducers: {
    setCarId(state, action) {
      state.carId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRides.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchRides.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.allRides = action.payload; // Store all the user's rides
        state.currentRide = action.payload[0]; // Optionally set the first ride as current
      })
      .addCase(fetchRides.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        state.allRides = []; // Clear rides on failure
      });
  },
});

export const { setCarId } = ridesSlice.actions;

export default ridesSlice.reducer;
