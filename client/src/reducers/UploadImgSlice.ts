import { createSlice } from "@reduxjs/toolkit";

const uploadImgSlice = createSlice({
  name: "images",
  initialState: [] as string[],
  reducers: {
    modifyImg: (state, action) => {
      const newArray: any = [...state];
      const { index, url } = action.payload;
      newArray[index] = url;
      return newArray;
    },
    addImages: (state, action) => {
      state = [];
      return action.payload;
    },
  },
});

export default uploadImgSlice.reducer;
export const { modifyImg, addImages } = uploadImgSlice.actions;
