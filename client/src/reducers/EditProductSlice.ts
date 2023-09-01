import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Product {
  key: string;
  name: string;
  price: number;
  description: string;
  SKU: number;
  link: string,
  images: string[];
  brand: string;
  category: string;
}

const editProductSlice = createSlice({
  name: "products",
  initialState: [] as Product[],
  reducers: {
    addProduct: (state, action) => {
      state.push(action.payload);
    },
    removeProduct: (state, action) => {
      return state.filter((product) => product.key !== action.payload);
    },
    updateProduct: (state, action) => {
      const { key, changes } = action.payload;
      const productToUpdate = state.find((product) => product.key === key);
      if (productToUpdate) {
        Object.assign(productToUpdate, changes);
      }
    },
  },
});

export const { addProduct, removeProduct, updateProduct } =
  editProductSlice.actions;
export default editProductSlice.reducer;
