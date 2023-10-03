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

const categorySlice = createSlice({
  name: "category",
  initialState: {
    isLoading: false,
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
        state.categories = action.payload.data.data.filter(
          (category) => category.path !== "MEN" && category.path !== "WOMEN"
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
  },
});

export default categorySlice.reducer;
