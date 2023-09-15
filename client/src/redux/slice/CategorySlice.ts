import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllCategories = createAsyncThunk(
  "category/getAll",
  async () => {
    try {
      const response: any = await axios.get("/api/category/getAll", {
        headers: { Authorization: `Bearer ${sessionStorage.access_token}` },
      });
      return response;
    } catch (err: any) {
      return err.response.data;
    }
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState: {
    isLoading: false,
    categories: [],
    isError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllCategories.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAllCategories.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload?.success || action.payload?.data?.success) {
        state.categories = action.payload.data.data;
      } else {
        state.isError = true;
      }
    });
    builder.addCase(fetchAllCategories.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export default categorySlice.reducer;
