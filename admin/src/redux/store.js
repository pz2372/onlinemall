import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./slice/AuthSlice";
import AdminSlice from "./slice/AdminSlice";
import BrandSlice from "./slice/BrandSlice";
import CategorySlice from "./slice/CategorySlice";

const store = configureStore({
  reducer: {
    auth: AuthSlice,
    admin: AdminSlice,
    brand: BrandSlice,
    category: CategorySlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActionPaths: ["meta.arg", "payload"],
      },
    }),
});

export default store;
