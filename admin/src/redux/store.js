import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./slice/AuthSlice";
import AdminSlice from "./slice/AdminSlice";
import BrandSlice from "./slice/BrandSlice";
import CategorySlice from "./slice/CategorySlice";
import ProductSlice from "./slice/ProductSlice";
import ColorSlice from "./slice/ColorSlice";
import SizeSlice from "./slice/SizeSlice";

const store = configureStore({
  reducer: {
    auth: AuthSlice,
    admin: AdminSlice,
    brand: BrandSlice,
    category: CategorySlice,
    product: ProductSlice,
    color: ColorSlice,
    size: SizeSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActionPaths: ["meta.arg", "payload"],
      },
    }),
});

export default store;
