import { createSlice } from "@reduxjs/toolkit";

const uploadNameSlice = createSlice({
  name: "names",
  initialState: [] as string[],
  reducers: {
    modifyName: (state, action) => {
      const newArray: any = [...state];
      const { index, url } = action.payload;
      newArray[index] = url;
      return newArray;
    },
    addNames: (state, action) => {
      state = [];
      return action.payload;
    },
  },
});

export default uploadNameSlice.reducer;
export const { modifyName, addNames } = uploadNameSlice.actions;