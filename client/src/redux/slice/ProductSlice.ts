import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProductsByCategory = createAsyncThunk(
  "product/getByCategory",
  async (categoryId: string) => {
    try {
      const response: any = await axios.get(
        `/api/product/getProductsByCategory?categoryId=${categoryId}`
      );
      return response;
    } catch (err: any) {
      return err.response.data;
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    isLoading: false,
    products: {},
    isError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProductsByCategory.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProductsByCategory.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload?.success || action.payload?.data?.success) {
        state.products = action.payload.data.data;
      } else {
        state.isError = true;
      }
    });
    builder.addCase(fetchProductsByCategory.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export default productSlice.reducer;
