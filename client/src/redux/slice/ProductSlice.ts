import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProductsByCategoryWithBrands = createAsyncThunk(
  "product/getByCategory",
  async (filters: any) => {
    try {
      const response: any = await axios.post(
        `/api/product/getProductsByCategoryWithBrands`,
        filters
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
    productsInCart: localStorage.productsInCart
      ? JSON.parse(localStorage.productsInCart)
      : [],
    favorites: localStorage.favoritesIds
      ? JSON.parse(localStorage.favoritesIds)
      : [],
    isError: false,
  },
  reducers: {
    addToCart: (state, action) => {
      state.productsInCart = action.payload;
    },
    addToFavorites: (state, action) => {
      state.favorites = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchProductsByCategoryWithBrands.pending,
      (state, action) => {
        state.isLoading = true;
      }
    );
    builder.addCase(
      fetchProductsByCategoryWithBrands.fulfilled,
      (state, action) => {
        state.isLoading = false;
        if (action.payload?.success || action.payload?.data?.success) {
          state.products = action.payload.data.data;
        } else {
          state.isError = true;
        }
      }
    );
    builder.addCase(
      fetchProductsByCategoryWithBrands.rejected,
      (state, action) => {
        state.isLoading = false;
        state.isError = true;
      }
    );
  },
});

export const { addToCart, addToFavorites } = productSlice.actions;
export default productSlice.reducer;
