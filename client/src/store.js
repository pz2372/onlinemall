import { configureStore } from "@reduxjs/toolkit";
import MobileSlice from "./reducers/MobileSlice";
import CarouselSlice from "./reducers/CarouselSlice";
import UploadImgSlice from "./reducers/UploadImgSlice";
import UploadLinkSlice from "./reducers/UploadLinkSlice";

const store = configureStore({
  reducer: {
    mobile: MobileSlice,
    carousel: CarouselSlice,
    uploadImg: UploadImgSlice,
    uploadLink: UploadLinkSlice,
  },
});

export default store;
