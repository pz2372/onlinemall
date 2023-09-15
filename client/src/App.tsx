import React, { useState, useEffect } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import "./App.scss";
import styled from "styled-components";
import Navbar from "./components/navigation/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BrandDashboard from "./brandUser/BrandDashboard";
import BrandPage from "./pages/BrandPage";
import CategoryPage from "./pages/CategoryPage";
import BrandProductUpload from "./brandUser/BrandProductUpload";
import AdminDashboard from "./admin/AdminDashboard";
import { categories, brands } from "./assets/Categories";
import Footer from "./components/Footer";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { AppDispatch, RootState } from "./redux/store";
import { useDispatch, useSelector } from "react-redux";
import { me } from "./redux/slice/UserSlice";

const AppContainer = styled.div`
  background-color: #e6e6e6;
  height: 100%;
  font-family: Verdana;
`;

const App = () => {
  const dispatch: AppDispatch = useDispatch();
  const { accessToken } = useSelector((state: RootState) => state.auth);
  const { userInfo } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (sessionStorage.access_token) {
      dispatch(me());
    }
  }, [accessToken]);

  return (
    <AppContainer>
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
        {categories.map((category) => (
          <Route
            key={category.path}
            path={`/${category.path}`}
            element={<CategoryPage category={category} />}
          />
        ))}
        {brands.map((brand) => (
          <Route key={brand} path={`/${brand}`} element={<BrandPage />} />
        ))}
      </Routes>
      <ToastContainer />
      <Footer />
    </AppContainer>
  );
};

export default App;
