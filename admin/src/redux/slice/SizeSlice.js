import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllSizes = createAsyncThunk("size/getAll", async () => {
  try {
    const response = await axios.get("/api/size/getAll");
    return response;
  } catch (err) {
    return err.response.data;
  }
});

export const createSize = createAsyncThunk("size/create", async (data) => {
  try {
    const response = await axios.post(`/api/size/create`, data, {
      headers: { Authorization: `Bearer ${sessionStorage.access_token}` },
    });
    return response;
  } catch (err) {
    return err.response.data;
  }
});

export const updateSize = createAsyncThunk("size/update", async (data) => {
  try {
    const response = await axios.put(`/api/size/update/${data._id}`, data.data, {
      headers: { Authorization: `Bearer ${sessionStorage.access_token}` },
    });
    return response;
  } catch (err) {
    return err.response.data;
  }
});

export const deleteSize = createAsyncThunk("size/delete", async (sizeId) => {
  try {
    const response = await axios.delete(`/api/size/delete/${sizeId}`, {
      headers: { Authorization: `Bearer ${sessionStorage.access_token}` },
    });
    return response;
  } catch (err) {
    return err.response.data;
  }
});

const sizeSlice = createSlice({
  name: "size",
  initialState: {
    isLoading: false,
    sizes: [],
    isError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllSizes.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAllSizes.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload?.success || action.payload?.data?.success) {
        state.sizes = action.payload.data?.data;
      } else {
        state.isError = true;
      }
    });
    builder.addCase(fetchAllSizes.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });

    builder.addCase(createSize.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(createSize.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload.data?.success) {
        state.sizes.push(action.payload.data?.data);
      }
    });
    builder.addCase(createSize.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });

    builder.addCase(updateSize.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(updateSize.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload.data?.success) {
        const sizeIndex = state.sizes.findIndex(
          (size) => size._id === action.payload.data?.data._id
        );
        const cloneSizes = [...state.sizes];
        cloneSizes[sizeIndex] = action.payload.data?.data;
        state.sizes = cloneSizes;
      }
    });
    builder.addCase(updateSize.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });

    builder.addCase(deleteSize.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(deleteSize.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload.data?.success) {
        state.sizes = state.sizes.filter((size) => size._id !== action.payload.data?._id);
      }
    });
    builder.addCase(deleteSize.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export default sizeSlice.reducer;
