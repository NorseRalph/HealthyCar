import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../components/baseUrl";

export const loginUserAction = createAsyncThunk(
  "user/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseUrl}users/login`, {
        email,
        password,
      });
      const { id, token, userData } = response.data; // Adjust these fields based on what your backend actually returns

      // Save the token and userId to localStorage or any other persistent storage you prefer
      localStorage.setItem("token", token);
      localStorage.setItem("userId", id);

      // Optionally save userId to cookies if needed
      document.cookie = `userId=${id}; path=/; max-age=86400;`; // Expires after 1 day

      // Return the full user data
      return { id, token, userData: { ...userData, userId: id } }; // Add the userId property to the userData object
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

// New async thunk for fetching user details
export const fetchUserDetails = createAsyncThunk(
  "user/fetchDetails",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseUrl}users/${userId}`);
      return response.data; // Assuming the response data is the user object
    } catch (error) {
      if (error.response) {
        // Handle a response error status code
        return rejectWithValue(
          error.response.data.message || "Failed to fetch user details"
        );
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
      // The endpoint might be '/users/save' or '/users/add' depending on your backend configuration
      const response = await axios.post(
        `${baseUrl}users/save`, 
        {
          id: user.id, // Include the user ID, if this is an update operation
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          password: user.password,
          carCount: user.carCount, // Assuming you want to include this
          isAdmin: user.isAdmin, // Assuming you want to include this
          // Add other user fields here as required
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const { id } = response.data;
      // You might want to set cookies or local storage here, similar to the login action

      return response.data; // You can modify this to return specific parts of the response
    } catch (error) {
      // Error handling
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
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
      state.userData = action.payload.userData;
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
    [fetchUserDetails.pending]: (state) => {
      state.loading = true;
    },
    [fetchUserDetails.fulfilled]: (state, action) => {
      state.userData = action.payload;
      state.loading = false;
      state.error = null;
    },
    [fetchUserDetails.rejected]: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

// Export actions and reducer
export const { logout } = userSlice.actions;
export default userSlice.reducer;
