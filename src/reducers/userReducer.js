import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUserAction = createAsyncThunk(
  "user/login",
  async (loginData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/login",
        loginData
      );
      // Assuming the response contains an object with the user's info and token
      const { userId, token } = response.data;
 
      // Save the token and userId to localStorage
      localStorage.setItem("token", token); //?
      localStorage.setItem("userId", userId);
      // Save userId to cookies
      document.cookie = `userId=${userId}; path=/; max-age=86400;`; // Expires after 1 day
      // Return the response data to save it in the Redux store
      return response.data;
    } catch (error) {
      if (error.response) {
        // Handle a response error status code
        return rejectWithValue(error.response.data);
      } else {
        // Handle errors like network issues
        return rejectWithValue(error.message);
      }
    }
  }
);

// Register action
export const registerUserAction = createAsyncThunk(
  "user/register",
  async (user, { rejectWithValue }) => {
    try {
      // Update URL if needed to match your backend
      const response = await axios.post("/register", user, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      // Handle token as per backend response
      localStorage.setItem("token", response.data.token);
      return response.data.user;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Logout action
export const logoutAction = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      // Add axios call to backend logout endpoint if it exists
      // Example: await axios.post('/logout');
      localStorage.removeItem("token");
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// User slice
const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: null,
    loading: false,
    error: null,
  },
  extraReducers: {
    [loginUserAction.pending]: (state) => {
      state.loading = true;
    },
    [loginUserAction.fulfilled]: (state, action) => {
      state.userData = action.payload;
      state.loading = false;
      state.error = null;
    },
    [loginUserAction.rejected]: (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.userData = null;
    },
    [logoutAction.fulfilled]: (state) => {
      state.userData = null;
    },
    [registerUserAction.pending]: (state) => {
      state.loading = true;
    },
    [registerUserAction.fulfilled]: (state, action) => {
      state.userData = action.payload;
      state.loading = false;
      state.error = null;
    },
    [registerUserAction.rejected]: (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.userData = null;
    },
  },
});

// Export actions and reducer
export const { logout } = userSlice.actions;
export default userSlice.reducer;
