import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllBrands = createAsyncThunk("brand/fecthAll", async () => {
  try {
    const response = await axios.get(`/api/brand/getAll`);
    return response;
  } catch (err) {
    return err.response.data;
  }
});

export const fetchBrandById = createAsyncThunk("brand/getById", async (brandId) => {
  try {
    const response = await axios.get(`/api/brand/getById/${brandId}`);
    return response;
  } catch (err) {
    return err.response.data;
  }
});

export const createBrand = createAsyncThunk("brand/create", async (data) => {
  try {
    const response = await axios.post(`/api/brand/create`, data, {
      headers: { Authorization: `Bearer ${sessionStorage.access_token}` },
    });
    return response;
  } catch (err) {
    return err.response.data;
  }
});

export const updateBrand = createAsyncThunk("brand/update", async (data) => {
  try {
    const response = await axios.put(`/api/brand/update/${data._id}`, data.data, {
      headers: { Authorization: `Bearer ${sessionStorage.access_token}` },
    });
    return response;
  } catch (err) {
    return err.response.data;
  }
});

export const deleteBrand = createAsyncThunk("brand/delete", async (brandId) => {
  try {
    const response = await axios.delete(`/api/brand/delete/${brandId}`, {
      headers: { Authorization: `Bearer ${sessionStorage.access_token}` },
    });
    return response;
  } catch (err) {
    return err.response.data;
  }
});

const brandSlice = createSlice({
  name: "brand",
  initialState: {
    isLoading: false,
    isError: false,
    brands: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllBrands.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAllBrands.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload.data?.success) {
        state.brands = action.payload.data?.data;
      }
    });
    builder.addCase(fetchAllBrands.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });

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

    builder.addCase(createBrand.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(createBrand.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload.data?.success) {
        state.brands.push(action.payload.data?.data);
      }
    });
    builder.addCase(createBrand.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });

    builder.addCase(updateBrand.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(updateBrand.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload.data?.success) {
        const brandIndex = state.brands.findIndex(
          (brand) => brand._id === action.payload.data?.data._id
        );
        const cloneBrands = [...state.brands];
        cloneBrands[brandIndex] = action.payload.data?.data;
        state.brands = cloneBrands;
      }
    });
    builder.addCase(updateBrand.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });

    builder.addCase(deleteBrand.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(deleteBrand.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload.data?.success) {
        state.brands = state.brands.filter((brand) => brand._id !== action.payload.data?._id);
      }
    });
    builder.addCase(deleteBrand.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export default brandSlice.reducer;
