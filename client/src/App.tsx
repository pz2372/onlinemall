import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import styled from "styled-components";
import NavBar from "./components/nav/NavBar";
import HomeHeader from "./pages/home/HomeHeader";
import ProductCard from "./components/carousel/ProductCard";
import Carousel from "./components/carousel/Carousel";
import Home from "./pages/home/Home";
import ProductsPage from "./pages/ProductPage"
import User from "./user/User"
import Admin from "./admin/Admin"
import { menCategories, womenCategories } from "./assets/Categories"
import Footer from "./components/Footer";

const AppContainer = styled.div`
  background-color: #e6e6e6;
  height: 100%;
  font-family: Verdana;
`;
const HomeContainer = styled.div`
  max-width: 1500px;
  margin: auto;
`;
const CardContainer = styled.div`
  display: flex;
  justify-items: center;
  align-items: center;
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

    // You can also use:
    // window.addEventListener('resize', resizeHanlder);
  }, []);


  return (
    <AppContainer>
      <NavBar></NavBar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/user" element={<User />} />
        {menCategories.map((pageName) => (
          <Route
            key={pageName}
            path={`/${pageName}`}
            element={<ProductsPage pageName={pageName} />}
          />
        ))}
      </Routes>
      <Footer></Footer>
    </AppContainer>
  );
};

export default App;
