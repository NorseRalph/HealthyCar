// carSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { addCar } from './carActions';

const carSlice = createSlice({
  name: 'cars',
  initialState: {
    cars: [],
    status: 'idle', // 'idle', 'loading', 'succeeded', 'failed'
    error: null,
  },
  reducers: {
    // You can add other reducers here
  },
  extraReducers: (builder) => {
    builder
      .addCase(addCar.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addCar.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.cars.push(action.payload); // Add the new car to the state array
      })
      .addCase(addCar.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default carSlice.reducer;
