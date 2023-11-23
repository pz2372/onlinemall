import { configureStore } from "@reduxjs/toolkit";
import MobileSlice from "./slice/MobileSlice";
import CarouselSlice from "./slice/CarouselSlice";
import UploadImgSlice from "./slice/UploadImgSlice";
import UploadLinkSlice from "./slice/UploadLinkSlice";
import UploadNameSlice from "./slice/UploadNameSlice";
import UploadPriceSlice from "./slice/UploadPriceSlice";
import EditProductSlice from "./slice/EditProductSlice";
import AuthSlice from "./slice/AuthSlice";
import UserSlice from "./slice/UserSlice";
import CategorySlice from "./slice/CategorySlice";
import ProductSlice from "./slice/ProductSlice";
import ColorSlice from "./slice/ColorSlice";
import SizeSlice from "./slice/SizeSlice";
import PopupSlice from "./slice/PopupSlice";
import BrandSlice from "./slice/BrandSlice";
import PaymentSlice from "./slice/PaymentSlice";

const store = configureStore({
  reducer: {
    auth: AuthSlice,
    user: UserSlice,
    category: CategorySlice,
    color: ColorSlice,
    brand: BrandSlice,
    size: SizeSlice,
    product: ProductSlice,
    popup: PopupSlice,
    mobile: MobileSlice,
    carousel: CarouselSlice,
    uploadImg: UploadImgSlice,
    uploadLink: UploadLinkSlice,
    uploadName: UploadNameSlice,
    uploadPrice: UploadPriceSlice,
    editProduct: EditProductSlice,
    payment: PaymentSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActionPaths: ["meta.arg", "payload"],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
