import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllSizes = createAsyncThunk("size/getAll", async () => {
  try {
    const response = await axios.get("/api/size/getAll");
    return response;
  } catch (err) {
    return err.response.data;
  }
});

const sizeSlice = createSlice({
  name: "size",
  initialState: {
    isLoading: false,
    sizes: [],
    isError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllSizes.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAllSizes.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload?.success || action.payload?.data?.success) {
        state.sizes = action.payload.data?.data;
      } else {
        state.isError = true;
      }
    });
    builder.addCase(fetchAllSizes.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export default sizeSlice.reducer;
