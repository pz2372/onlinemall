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

export const createAdmin = createAsyncThunk("admin/create", async (data) => {
  try {
    const response = await axios.post(`/api/auth/adminCreate`, data, {
      headers: { Authorization: `Bearer ${sessionStorage.access_token}` },
    });
    return response;
  } catch (err) {
    return err.response.data;
  }
});

export const updateAdmin = createAsyncThunk("admin/update", async (data) => {
  try {
    const response = await axios.put(`/api/admin/update/${data._id}`, data.data, {
      headers: { Authorization: `Bearer ${sessionStorage.access_token}` },
    });
    return response;
  } catch (err) {
    return err.response.data;
  }
});

export const deleteAdmin = createAsyncThunk("admin/delete", async (adminId) => {
  try {
    const response = await axios.delete(`/api/admin/delete/${adminId}`, {
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

    builder.addCase(createAdmin.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(createAdmin.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload.data?.success) {
        state.admins.push(action.payload.data?.data);
      }
    });
    builder.addCase(createAdmin.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });

    builder.addCase(updateAdmin.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(updateAdmin.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload.data?.success) {
        const adminIndex = state.admins.findIndex(
          (admin) => admin._id === action.payload.data?.data._id
        );
        const cloneAdmins = [...state.admins];
        cloneAdmins[adminIndex] = action.payload.data?.data;
        state.admins = cloneAdmins;
      }
    });
    builder.addCase(updateAdmin.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });

    builder.addCase(deleteAdmin.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(deleteAdmin.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload.data?.success) {
        state.admins = state.admins.filter((admin) => admin._id !== action.payload.data?._id);
      }
    });
    builder.addCase(deleteAdmin.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export const { logout } = adminSlice.actions;
export default adminSlice.reducer;
