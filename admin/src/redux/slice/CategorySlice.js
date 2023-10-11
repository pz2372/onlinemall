import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllCategories = createAsyncThunk("category/getAll", async () => {
  try {
    const response = await axios.get("/api/category/getAll");
    return response;
  } catch (err) {
    return err.response.data;
  }
});

export const createCategory = createAsyncThunk("category/create", async (data) => {
  try {
    const response = await axios.post(`/api/category/create`, data, {
      headers: { Authorization: `Bearer ${sessionStorage.access_token}` },
    });
    return response;
  } catch (err) {
    return err.response.data;
  }
});

export const updateCategory = createAsyncThunk("category/update", async (data) => {
  try {
    const response = await axios.put(`/api/category/update/${data._id}`, data.data, {
      headers: { Authorization: `Bearer ${sessionStorage.access_token}` },
    });
    return response;
  } catch (err) {
    return err.response.data;
  }
});

export const deleteCategory = createAsyncThunk("category/delete", async (categoryId) => {
  try {
    const response = await axios.delete(`/api/category/delete/${categoryId}`, {
      headers: { Authorization: `Bearer ${sessionStorage.access_token}` },
    });
    return response;
  } catch (err) {
    return err.response.data;
  }
});

const categorySlice = createSlice({
  name: "category",
  initialState: {
    isLoading: false,
    parentCategories: [],
    categories: [],
    menCategories: [],
    womenCategories: [],
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
        state.categories = action.payload.data.data.filter((category) =>
          category.path.includes("/")
        );
        state.parentCategories = action.payload.data.data.filter(
          (category) => !category.path.includes("/")
        );
        const menCat = [];
        const womenCat = [];
        action.payload.data.data.forEach((category) => {
          category.checked = false;
          if (category.path.startsWith("MEN") && category.path !== "MEN") {
            menCat.push(category);
            state.menCategories = menCat;
          } else if (category.path.startsWith("WOMEN") && category.path !== "WOMEN") {
            womenCat.push(category);
            state.womenCategories = womenCat;
          }
        });
      } else {
        state.isError = true;
      }
    });
    builder.addCase(fetchAllCategories.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });

    builder.addCase(createCategory.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(createCategory.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload.data?.success) {
        let category = action.payload.data?.data;
        category.checked = false;
        state.categories.push(category);
      }
    });
    builder.addCase(createCategory.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });

    builder.addCase(updateCategory.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(updateCategory.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload.data?.success) {
        const categoryIndex = state.categories.findIndex(
          (category) => category._id === action.payload.data?.data._id
        );
        const cloneCategories = [...state.categories];
        cloneCategories[categoryIndex] = action.payload.data?.data;
        state.categories = cloneCategories;
      }
    });
    builder.addCase(updateCategory.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });

    builder.addCase(deleteCategory.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(deleteCategory.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload.data?.success) {
        state.categories = state.categories.filter(
          (category) => category._id !== action.payload.data?._id
        );
      }
    });
    builder.addCase(deleteCategory.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export default categorySlice.reducer;
