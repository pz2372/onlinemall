import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const adminCreate = createAsyncThunk(
  "auth/adminCreate",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/api/auth/adminCreate`, data);
      return response;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const adminLogin = createAsyncThunk("auth/adminLogin", async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post(`/api/auth/adminLogin`, data);
    return response;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoading: false,
    isError: false,
    message: "",
    accessToken: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(adminCreate.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(adminCreate.fulfilled, (state, action) => {
      state.isLoading = false;
      state.message = action.payload.data.message;
      if (!action.payload.data.success) {
        state.isError = true;
      }
    });
    builder.addCase(adminCreate.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
    builder.addCase(adminLogin.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(adminLogin.fulfilled, (state, action) => {
      state.isLoading = false;
      state.message = action.payload.data.message;
      if (!action.payload.data.success) {
        state.isError = true;
      } else {
        sessionStorage.access_token = action.payload.data?.accessToken;
        state.accessToken = action.payload.data.accessToken;
      }
    });
    builder.addCase(adminLogin.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export default authSlice.reducer;
