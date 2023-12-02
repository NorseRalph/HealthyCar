// carActions.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addCarAction = createAsyncThunk(
  "car/add",
  async (carData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/cars", carData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteCarAction = createAsyncThunk(
  "car/delete",
  async (carId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/cars/delete/${carId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
