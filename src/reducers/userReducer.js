import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for logging in a user
export const userLogin = createAsyncThunk(
  'user/login',
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post('/api/users/login', credentials);
      // Save the logged-in user's information to localStorage or handle the token logic here
      // localStorage.setItem('userInfo', JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for registering a user
export const register = createAsyncThunk(
  'user/register',
  async ({ username, email, password }, thunkAPI) => {
    try {
      const response = await axios.post('/api/users/register', {
        username,
        email,
        password,
      });
      // Save the registered user's information to localStorage or handle the token logic here
      // localStorage.setItem('userInfo', JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Slice for user operations
const userSlice = createSlice({
  name: 'user',
  initialState: {
    userData: null,
    loading: false,
    error: null,
  },
  reducers: {
    // You can add reducers here for other synchronous user operations
    logout(state) {
      state.userData = null;
      // Remove user info from localStorage or clean up session/token
      // localStorage.removeItem('userInfo');
    },
  },
  extraReducers: {
    // Handle pending, fulfilled, and rejected states of userLogin
    [userLogin.pending]: (state) => {
      state.loading = true;
    },
    [userLogin.fulfilled]: (state, action) => {
      state.loading = false;
      state.userData = action.payload;
    },
    [userLogin.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // Handle pending, fulfilled, and rejected states of register
    [register.pending]: (state) => {
      state.loading = true;
    },
    [register.fulfilled]: (state, action) => {
      state.loading = false;
      state.userData = action.payload;
    },
    [register.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// Export actions and reducer
export const { logout } = userSlice.actions;
export default userSlice.reducer;
