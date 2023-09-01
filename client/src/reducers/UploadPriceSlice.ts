import { createSlice } from "@reduxjs/toolkit";

const uploadPriceSlice = createSlice({
  name: "prices",
  initialState: [] as string[],
  reducers: {
    modifyPrice: (state, action) => {
      const newArray: any = [...state];
      const { index, url } = action.payload;
      newArray[index] = url;
      return newArray;
    },
    addPrices: (state, action) => {
      state = [];
      return action.payload;
    },
  },
});

export default uploadPriceSlice.reducer;
export const { modifyPrice, addPrices } = uploadPriceSlice.actions;