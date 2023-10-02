import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./slice/AuthSlice";
import AdminSlice from "./slice/AdminSlice";

const store = configureStore({
  reducer: {
    auth: AuthSlice,
    admin: AdminSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActionPaths: ["meta.arg", "payload"],
      },
    }),
});

export default store;
