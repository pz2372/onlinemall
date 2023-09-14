import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const signup = createAsyncThunk(
  "auth/signup",
  async (data: any, { rejectWithValue }) => {
    try {
      const response: any = await axios.post(`/api/auth/signup`, data);
      return response;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (data: any, { rejectWithValue }) => {
    try {
      const response: any = await axios.post(`/api/auth/login`, data);
      return response;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoading: false,
    data: [],
    isError: false,
    message: "",
    accessToken: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signup.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(signup.fulfilled, (state, action) => {
      state.isLoading = false;
      state.message = action.payload.data.message;
      if (!action.payload.data.success) {
        state.isError = true;
      }
    });
    builder.addCase(signup.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
    builder.addCase(login.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.message = action.payload.data.message;
      state.accessToken = action.payload.data.accessToken;
      if (!action.payload.data.success) {
        state.isError = true;
      }
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export default authSlice.reducer;
