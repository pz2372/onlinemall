import { createSlice } from "@reduxjs/toolkit"

const mobileSlice = createSlice({
  name: 'mobile',
  initialState: false,
  reducers: {
    mobile: (state) => {
      state = true
    },
    desktop: (state) => {
      state = false
    },
    switchButton: (state) => {
      state = !state
    },
  },
})

export default mobileSlice.reducer;

export const { mobile, desktop, switchButton } = mobileSlice.actions;

