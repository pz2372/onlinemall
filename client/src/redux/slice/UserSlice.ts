import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const me = createAsyncThunk("user/me", async () => {
  try {
    const response: any = await axios.get("/api/user/me", {
      headers: { Authorization: `Bearer ${sessionStorage.access_token}` },
    });
    return response;
  } catch (err: any) {
    return err.response.data;
  }
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoading: false,
    userInfo: null,
    isError: false,
  },
  reducers: {
    logout(state) {
      state.userInfo = null;
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
        state.userInfo = action.payload.data.data;
      } else {
        state.isError = true;
      }
    });
    builder.addCase(me.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
