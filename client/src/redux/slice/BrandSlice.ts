import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchBrandById = createAsyncThunk(
  "brand/getById",
  async (brandId: string) => {
    try {
      const response: any = await axios.get(`/api/brand/getById/${brandId}`);
      return response;
    } catch (err: any) {
      return err.response.data;
    }
  }
);

const brandSlice = createSlice({
  name: "brand",
  initialState: {
    isLoading: false,
    isError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBrandById.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchBrandById.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(fetchBrandById.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export default brandSlice.reducer;
