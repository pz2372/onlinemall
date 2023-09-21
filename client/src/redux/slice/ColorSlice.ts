import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllColors = createAsyncThunk("color/getAll", async () => {
  try {
    const response: any = await axios.get("/api/color/getAll");
    return response;
  } catch (err: any) {
    return err.response.data;
  }
});

const colorSlice = createSlice({
  name: "color",
  initialState: {
    isLoading: false,
    colors: [],
    isError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllColors.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAllColors.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload?.success || action.payload?.data?.success) {
        const colorsData: any = [];
        action.payload.data.data.forEach((color: any) => {
          color.checked = false;
          colorsData.push(color);
          state.colors = colorsData;
        });
      } else {
        state.isError = true;
      }
    });
    builder.addCase(fetchAllColors.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export default colorSlice.reducer;
