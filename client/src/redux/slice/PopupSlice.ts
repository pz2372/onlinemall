import { createSlice } from "@reduxjs/toolkit";

const popupSlice = createSlice({
  name: "popup",
  initialState: {
    quickviewPopup: {
      show: false,
      productId: undefined,
    },
  },
  reducers: {
    toggleQuickviewPopup: (state, action) => {
      state.quickviewPopup = action.payload;
    },
  },
});

export default popupSlice.reducer;

export const { toggleQuickviewPopup } = popupSlice.actions;
