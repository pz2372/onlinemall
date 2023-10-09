import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllProducts = createAsyncThunk("product/getAll", async (query) => {
  try {
    const response = await axios.get(`/api/product/getAll?page=${query.page}&limit=${query.limit}`);
    return response;
  } catch (err) {
    return err.response.data;
  }
});

const productSlice = createSlice({
  name: "product",
  initialState: {
    isLoading: false,
    isError: false,
    products: [],
    currentPage: 1,
    totalCount: 0,
    totalPages: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllProducts.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAllProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload?.success || action.payload?.data?.success) {
        state.products = action.payload.data.data;
        state.currentPage = action.payload.data.currentPage;
        state.totalCount = action.payload.data.totalCount;
        state.totalPages = action.payload.data.totalPages;
      } else {
        state.isError = true;
      }
    });
    builder.addCase(fetchAllProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export default productSlice.reducer;
