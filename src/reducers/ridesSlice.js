// ridesSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentRide: {
    time: ['00:00', '01:00', '02:00', '03:00', '04:00'], // Example time labels
    speed: [10, 20, 30, 40, 50], // Example speed data
    rpm: [1000, 2000, 1500, 2500, 3000], // Example RPM data
    fuelConsumption: [5, 6, 5.5, 6.5, 7], // Example fuel consumption data
    airTemperature: [20, 21, 19, 22, 20], // Example air temperature data
    engineTemperature: [90, 95, 93, 100, 105], // Example engine temperature data
  },
  // ...other state and reducers

  allRides: [
    {
      // Ride 1 data
      speed: [10, 20, 30, 40, 50],
      rpm: [1000, 2000, 1500, 2500, 3000],
      fuelConsumption: [5, 6, 5.5, 6.5, 7],
      airTemperature: [20, 21, 19, 22, 20],
      engineTemperature: [90, 95, 93, 100, 105],
    },
    {
      // Ride 2 data
      speed: [15, 25, 35, 45, 55],
      //rpm: [1100, 2100, 1600, 2600, 3100],
      fuelConsumption: [5.5, 6.5, 6, 7, 7.5],
      airTemperature: [21, 22, 20, 23, 21],
      engineTemperature: [92, 97, 95, 102, 107],
    },
    // ... more rides
  ],
  // ... other state and reducers
};

export const ridesSlice = createSlice({
  name: 'rides',
  initialState,
  reducers: {
    // Define reducers to update the state as necessary
  },
});

export default ridesSlice.reducer;
