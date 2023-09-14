import { createSlice } from "@reduxjs/toolkit"
import produce from 'immer';

const carouselSlice = createSlice({
  name: 'carousel',
  initialState: [{}],
  reducers: {
    add: (state, action) => {
      return action.payload;
    },
  },
})
export default carouselSlice.reducer;

export const { add } = carouselSlice.actions;

