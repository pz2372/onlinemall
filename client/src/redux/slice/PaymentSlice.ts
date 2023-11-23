import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface PaymentState {
  loading: boolean;
  error: string | null;
  sessionId?: string;
}

interface PaymentData {
  products: any;
  customerId: string;
  customerEmail: string;
  successUrl: string;
  cancelUrl: string;
  formData: any;
}

const initialState: PaymentState = {
  loading: false,
  error: null,
  sessionId: "",
};

export const createCheckoutSession = createAsyncThunk(
  "payment/create-checkout-session",
  async (obj: PaymentData, { rejectWithValue, dispatch }) => {
    try {
      const response: any = await axios.post(
        `/api/payment/create-checkout-session`,
        obj,
        {
          headers: { Authorization: `Bearer ${sessionStorage.access_token}` },
        }
      );

      return response?.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    startPayment: (state) => {
      state.loading = true;
      state.error = null;
    },
    paymentSuccess: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = null;
    },
    paymentFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    // checkout session
    builder.addCase(createCheckoutSession.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createCheckoutSession.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.sessionId = action.payload?.sessionId;
    });
    builder.addCase(createCheckoutSession.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      state.sessionId = "";
    });
  },
});

export const { startPayment, paymentSuccess, paymentFailure } =
  paymentSlice.actions;

export default paymentSlice.reducer;
