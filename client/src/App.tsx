import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
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

const AppContainer = styled.div`
  background-color: #e6e6e6;
  height: 100%;
  font-family: Verdana;
`;

interface Size {
  width: number;
  height: number;
}

const App = () => {
  const [size, setSize] = useState<Size>();

  // This function updates the state thus re-render components
  const resizeHanlder = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    setSize({
      width: width,
      height: height,
    });
  };

  // Listening for the window resize event
  useEffect(() => {
    window.onresize = resizeHanlder;
  }, []);

  return (
    <AppContainer>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
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
