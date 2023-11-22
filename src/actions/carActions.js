// carActions.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const addCar = createAsyncThunk(
  'cars/addCar',
  async (carData, thunkAPI) => {
    try {
      const response = await axios.post('/api/cars', carData);
      return response.data; // The new car data is expected to be in the response
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
