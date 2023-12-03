import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../components/baseUrl";

export const loginUserAction = createAsyncThunk(
  "user/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseUrl}/users/login`, {
        email,
        password,
      });
      const { id, token } = response.data; // Adjust these fields based on what your backend actually returns

      // Save the token and userId to localStorage or any other persistent storage you prefer
      localStorage.setItem("token", token);
      localStorage.setItem("userId", id);

      // Optionally save userId to cookies if needed
      document.cookie = `userId=${id}; path=/; max-age=86400;`; // Expires after 1 day

      // Return the full user data
      return response.data;
    } catch (error) {
      if (error.response) {
        // Handle a response error status code
        return rejectWithValue(error.response.data.message || "Login failed");
      } else {
        // Handle other errors like network issues
        return rejectWithValue(error.message);
      }
    }
  }
);

export const registerUserAction = createAsyncThunk(
  "user/register",
  async (user, { rejectWithValue }) => {
    try {
      // Update URL if needed to match your backend
      const response = await axios.post(
        `${baseUrl}/users/add`,
        {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          password: user.password,
          isFO: user.isFleetOwner, // Assuming isFleetOwner is a boolean, change the key to match the backend's expectation
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const { id } = response.data;
      // Set the cookie with the user ID
      const cookieExpiryDate = new Date();
      cookieExpiryDate.setDate(cookieExpiryDate.getDate() + 1); // Cookie expires after 1 day
      document.cookie = `userId=${id}; path=/; expires=${cookieExpiryDate.toUTCString()}; Secure; HttpOnly`;

      return response.data; // You might want to return a specific part of the response
    } catch (error) {
      // Log the error to the console for debugging
      console.error("Registration Error:", error);

      // Handle the error as per your application's needs
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        // Handling unexpected errors (like network issues)
        return rejectWithValue({ message: "Unexpected error occurred" });
      }
    }
  }
);

export const logoutAction = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      // Perform backend logout if necessary
      // Example: await axios.post(`${baseUrl}/users/logout`);

      // Remove token and user ID from localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("userId");

      // Clear the cookie by setting its expiry date to the past
      document.cookie =
        "userId=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; Secure; HttpOnly";

      // Return any necessary data or simply resolve the action
      return true;
    } catch (error) {
      // Handle any errors during the logout process
      if (error.response) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue("An error occurred during logout");
      }
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
