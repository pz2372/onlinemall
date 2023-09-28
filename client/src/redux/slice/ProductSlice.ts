import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { TAddReview } from "../../types/redux.type";

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

export const fetchProductsByBrand = createAsyncThunk(
  "product/getByBrand",
  async (filters: any) => {
    try {
      const response: any = await axios.post(
        `/api/product/getProductsByBrand/`,
        filters
      );
      return response;
    } catch (err: any) {
      return err.response.data;
    }
  }
);

export const fetchProductById = createAsyncThunk(
  "product/getById",
  async (productId: string) => {
    try {
      const response: any = await axios.get(
        `/api/product/getById/${productId}`
      );
      return response;
    } catch (err: any) {
      return err.response.data;
    }
  }
);

export const addReviewToProduct = createAsyncThunk(
  "product/addReview",
  async (data: TAddReview) => {
    try {
      const response: any = await axios.post(`/api/product/addReview`, data);
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
    isAddReviewLoading: false,
    products: {},
    brandProducts: [],
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
    builder.addCase(fetchProductsByBrand.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProductsByBrand.fulfilled, (state, action) => {
      state.isLoading = false;
      // if (action.payload?.success || action.payload?.data?.success) {
      //   state.brandProducts = action.payload.data.data;
      // } else {
      //   state.isError = true;
      // }
    });
    builder.addCase(fetchProductsByBrand.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
    builder.addCase(fetchProductById.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProductById.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(fetchProductById.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });

    builder.addCase(addReviewToProduct.pending, (state, action) => {
      state.isAddReviewLoading = true;
    });
    builder.addCase(addReviewToProduct.fulfilled, (state, action) => {
      state.isAddReviewLoading = false;
    });
    builder.addCase(addReviewToProduct.rejected, (state, action) => {
      state.isAddReviewLoading = false;
    });
  },
});

export const { addToCart, addToFavorites } = productSlice.actions;
export default productSlice.reducer;
