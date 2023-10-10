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

export const createProduct = createAsyncThunk("product/create", async (data) => {
  try {
    const response = await axios.post(`/api/product/create`, data, {
      headers: { Authorization: `Bearer ${sessionStorage.access_token}` },
    });
    return response;
  } catch (err) {
    return err.response.data;
  }
});

export const updateProduct = createAsyncThunk("product/update", async (data) => {
  try {
    const response = await axios.put(`/api/product/update/${data._id}`, data.data, {
      headers: { Authorization: `Bearer ${sessionStorage.access_token}` },
    });
    return response;
  } catch (err) {
    return err.response.data;
  }
});

export const deleteProduct = createAsyncThunk("product/delete", async (productId) => {
  try {
    const response = await axios.delete(`/api/product/delete/${productId}`, {
      headers: { Authorization: `Bearer ${sessionStorage.access_token}` },
    });
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

    builder.addCase(createProduct.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(createProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload.data?.success) {
        state.products = action.payload.data.data;
        state.currentPage = action.payload.data.currentPage;
        state.totalCount = action.payload.data.totalCount;
        state.totalPages = action.payload.data.totalPages;
      }
    });
    builder.addCase(createProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });

    builder.addCase(updateProduct.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload.data?.success) {
        const productIndex = state.products.findIndex(
          (product) => product._id === action.payload.data?.data._id
        );
        const cloneProducts = [...state.products];
        cloneProducts[productIndex] = action.payload.data?.data;
        state.products = cloneProducts;
      }
    });
    builder.addCase(updateProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });

    builder.addCase(deleteProduct.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload.data?.success) {
        state.products = action.payload.data.data;
        state.currentPage = action.payload.data.currentPage;
        state.totalCount = action.payload.data.totalCount;
        state.totalPages = action.payload.data.totalPages;
      }
    });
    builder.addCase(deleteProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export default productSlice.reducer;
