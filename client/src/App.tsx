import React, { useState, useEffect } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import "./App.scss";
import Navbar from "./components/navigation/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BrandDashboard from "./brandUser/BrandDashboard";
import BrandPage from "./pages/BrandPage";
import CategoryPage from "./pages/CategoryPage";
import BrandProductUpload from "./brandUser/BrandProductUpload";
import AdminDashboard from "./admin/AdminDashboard";
import Footer from "./components/Footer";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { AppDispatch, RootState } from "./redux/store";
import { useDispatch, useSelector } from "react-redux";
import { me } from "./redux/slice/UserSlice";
import BrandsPage from "./pages/BrandsPage";
import TrendingPage from "./pages/TrendingPage";
import Terms from "./pages/Terms";
import Favorites from "./pages/favorites/Favorites";
import Card from "./pages/card/Card";
import ProductPage from "./pages/ProductPage";
import "reactjs-popup/dist/index.css";
import Popup from "reactjs-popup";
import SingleProduct from "./components/product/SingleProduct";
import { toggleQuickviewPopup } from "./redux/slice/PopupSlice";
import { TQuickview } from "./types/redux.type";
import Checkout from "./components/payment/Checkout";
import PaymentSuccess from "./pages/Payment/PaymentSuccess";
import PaymentFail from "./pages/Payment/PaymentFail";

const App = () => {
  const dispatch: AppDispatch = useDispatch();
  const { accessToken } = useSelector((state: RootState) => state.auth);
  const { userInfo } = useSelector((state: RootState) => state.user);
  const popupState = useSelector((state: RootState) => state.popup);
  const quickviewPopup: TQuickview = popupState.quickviewPopup;

  useEffect(() => {
    if (sessionStorage.access_token) {
      dispatch(me());
    }
  }, [accessToken]);

  return (
    <div className="bg-white h-full font-Verdana">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={userInfo ? <Navigate to={"/"} /> : <Login />}
        />
        <Route
          path="/register"
          element={userInfo ? <Navigate to={"/"} /> : <Register />}
        />
        <Route path="/brandproductupload" element={<BrandProductUpload />} />
        <Route path="/branddashboard" element={<BrandDashboard />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/men" element={<CategoryPage />} />
        <Route path="/women" element={<CategoryPage />} />
        <Route path="/trending" element={<TrendingPage />} />
        <Route path="/brands" element={<BrandsPage />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/card" element={<Card />} />
        <Route path="brand/:id" element={<BrandPage />} />
        <Route path="product/:id" element={<ProductPage />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="payment/success" element={<PaymentSuccess />} />
        <Route path="payment/fail" element={<PaymentFail />} />
      </Routes>

      <ToastContainer />
      <Footer />
      <Popup
        contentStyle={{
          position: "relative",
          width: "90%",
          maxHeight: "calc(100vh - 10%)",
          overflowY: "auto",
        }}
        open={quickviewPopup.show}
        modal
        lockScroll
        onClose={() =>
          dispatch(toggleQuickviewPopup({ show: false, productId: undefined }))
        }
      >
        <span
          className="absolute top-[20px] right-[20px] text-[40px] leading-[20px] cursor-pointer"
          onClick={() =>
            dispatch(
              toggleQuickviewPopup({ show: false, productId: undefined })
            )
          }
        >
          &times;
        </span>
        <SingleProduct productId={quickviewPopup.productId} hideReviews />
      </Popup>
    </div>
  );
};

export default App;
