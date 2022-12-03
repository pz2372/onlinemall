import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import styled from "styled-components";
import Navigation from "./components/Navigation";

import ProductCard from "./components/ProductCard";
import Carousel from "./components/Carousel";
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
      <Navigation></Navigation>
      <HomeContainer>
        <CardContainer>
          <ProductCard title={"Men's Hoodies"} />
          <ProductCard title={"Dresses"} />
          <ProductCard title={"Men's Hoodies"} />
          <ProductCard title={"Shorts"} />
        </CardContainer>
        <Carousel title={"Trending Products"}></Carousel>
        <Carousel title={"Swimsuits"}></Carousel>
        <Carousel title={"Hot T-Shirts"}></Carousel>
      </HomeContainer>
      <Footer></Footer>
    </AppContainer>
  );
};

export default App;
