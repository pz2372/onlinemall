import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const me = createAsyncThunk("admin/me", async () => {
  try {
    const response = await axios.get("/api/admin/me", {
      headers: { Authorization: `Bearer ${sessionStorage.access_token}` },
    });
    return response;
  } catch (err) {
    return err.response.data;
  }
});

export const fetchAllAdmins = createAsyncThunk("admin/fecthAll", async () => {
  try {
    const response = await axios.get(`/api/admin/getAll`, {
      headers: { Authorization: `Bearer ${sessionStorage.access_token}` },
    });
    return response;
  } catch (err) {
    return err.response.data;
  }
});

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    isLoading: false,
    adminInfo: null,
    isError: false,
    admins: [],
  },
  reducers: {
    logout(state, action) {
      state.adminInfo = null;
      sessionStorage.removeItem("access_token");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(me.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(me.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload?.success || action.payload?.data?.success) {
        state.adminInfo = action.payload.data.data;
      } else {
        state.isError = true;
      }
    });
    builder.addCase(me.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });

    builder.addCase(fetchAllAdmins.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAllAdmins.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload.data?.success) {
        state.admins = action.payload.data?.data;
      }
    });
    builder.addCase(fetchAllAdmins.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export const { logout } = adminSlice.actions;
export default adminSlice.reducer;
