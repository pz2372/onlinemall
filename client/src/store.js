import { configureStore } from "@reduxjs/toolkit";
import MobileSlice from "./reducers/MobileSlice";
import CarouselSlice from "./reducers/CarouselSlice";
import UploadImgSlice from "./reducers/UploadImgSlice";
import UploadLinkSlice from "./reducers/UploadLinkSlice";
import UploadNameSlice from "./reducers/UploadNameSlice";
import UploadPriceSlice from "./reducers/UploadPriceSlice";
import EditProductSlice from "./reducers/EditProductSlice";

const store = configureStore({
  reducer: {
    mobile: MobileSlice,
    carousel: CarouselSlice,
    uploadImg: UploadImgSlice,
    uploadLink: UploadLinkSlice,
    uploadName: UploadNameSlice,
    uploadPrice: UploadPriceSlice,
    editProduct: EditProductSlice
  },
});

export default store;
