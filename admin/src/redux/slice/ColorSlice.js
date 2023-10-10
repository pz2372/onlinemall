import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllColors = createAsyncThunk("color/getAll", async () => {
  try {
    const response = await axios.get("/api/color/getAll");
    return response;
  } catch (err) {
    return err.response.data;
  }
});

export const createColor = createAsyncThunk("color/create", async (data) => {
  try {
    const response = await axios.post(`/api/color/create`, data, {
      headers: { Authorization: `Bearer ${sessionStorage.access_token}` },
    });
    return response;
  } catch (err) {
    return err.response.data;
  }
});

export const updateColor = createAsyncThunk("color/update", async (data) => {
  try {
    const response = await axios.put(`/api/color/update/${data._id}`, data.data, {
      headers: { Authorization: `Bearer ${sessionStorage.access_token}` },
    });
    return response;
  } catch (err) {
    return err.response.data;
  }
});

export const deleteColor = createAsyncThunk("color/delete", async (colorId) => {
  try {
    const response = await axios.delete(`/api/color/delete/${colorId}`, {
      headers: { Authorization: `Bearer ${sessionStorage.access_token}` },
    });
    return response;
  } catch (err) {
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
        state.colors = action.payload.data?.data;
      } else {
        state.isError = true;
      }
    });
    builder.addCase(fetchAllColors.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });

    builder.addCase(createColor.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(createColor.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload.data?.success) {
        state.colors.push(action.payload.data?.data);
      }
    });
    builder.addCase(createColor.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });

    builder.addCase(updateColor.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(updateColor.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload.data?.success) {
        const colorIndex = state.colors.findIndex(
          (color) => color._id === action.payload.data?.data._id
        );
        const cloneColors = [...state.colors];
        cloneColors[colorIndex] = action.payload.data?.data;
        state.colors = cloneColors;
      }
    });
    builder.addCase(updateColor.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });

    builder.addCase(deleteColor.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(deleteColor.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload.data?.success) {
        state.colors = state.colors.filter((color) => color._id !== action.payload.data?._id);
      }
    });
    builder.addCase(deleteColor.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export default colorSlice.reducer;
