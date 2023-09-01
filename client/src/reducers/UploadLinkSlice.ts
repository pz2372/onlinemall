import { createSlice } from "@reduxjs/toolkit";

const uploadLinkSlice = createSlice({
  name: "links",
  initialState: [] as string[],
  reducers: {
    modifyURL: (state, action) => {
      const newArray = state;
      const { index, value } = action.payload;
      newArray[index] = value;
      return newArray;
    },
    addLinks: (state, action) => {
      state = [];
      return action.payload;
    },
  },
});
export default uploadLinkSlice.reducer;
export const { modifyURL, addLinks } = uploadLinkSlice.actions;
