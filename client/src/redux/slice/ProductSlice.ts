import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { TAddReview, TQuery } from "../../types/redux.type";

export const fetchAllProducts = createAsyncThunk(
  "product/getAll",
  async (query: TQuery) => {
    try {
      const response = await axios.get(
        `/api/product/getAll?page=${query.page}&limit=${query.limit}`
      );
      return response;
    } catch (err: any) {
      return err.response.data;
    }
  }
);

export const fetchTrendingProducts = createAsyncThunk(
  "product/getTrendings",
  async (query: TQuery) => {
    try {
      const response = await axios.get(
        `/api/product/getAll?page=${query.page}&limit=${query.limit}`
      );
      return response;
    } catch (err: any) {
      return err.response.data;
    }
  }
);

export const fetchMenTShirtsProducts = createAsyncThunk(
  "product/getMenTShirtss",
  async (query: TQuery) => {
    try {
      const response = await axios.get(
        `/api/product/getAll?page=${query.page}&limit=${query.limit}&category=${query.categoryId}`
      );
      return response;
    } catch (err: any) {
      return err.response.data;
    }
  }
);

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
    allProducts: [],
    trendingProducts: [],
    menTShirtsProducts: [],
    currentPage: 1,
    totalCount: 0,
    totalPages: 0,
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
    builder.addCase(fetchAllProducts.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAllProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload?.success || action.payload?.data?.success) {
        state.allProducts = action.payload.data.data;
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

    builder.addCase(fetchTrendingProducts.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchTrendingProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload?.success || action.payload?.data?.success) {
        state.trendingProducts = action.payload.data.data;
      } else {
        state.isError = true;
      }
    });
    builder.addCase(fetchTrendingProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });

    builder.addCase(fetchMenTShirtsProducts.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchMenTShirtsProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload?.success || action.payload?.data?.success) {
        state.menTShirtsProducts = action.payload.data.data;
      } else {
        state.isError = true;
      }
    });
    builder.addCase(fetchMenTShirtsProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });

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
