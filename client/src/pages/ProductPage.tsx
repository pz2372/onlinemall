import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import BrandCarousel from "../components/carousel/BrandCarousel";
import { useSelector, useDispatch } from 'react-redux'
import { add } from '../reducers/CarouselSlice'

const ProductsContainer = styled.div``;

const ProductsPage = (props: any) => {
  const carousel = useSelector((state: { carousel: [{}] }) => state.carousel)
  const dispatch = useDispatch();

  useEffect(() => {
    fetch("/api/getmentshirts")
      .then((response) => response.json())
      .then((data) => dispatch(add(data)))
  }, []);

  return (
    <ProductsContainer>
      {carousel.map((data: any) => {
        return <BrandCarousel key={props.pageName + data.id} carousel={data} />;
      })}
    </ProductsContainer>
  );
};

export default ProductsPage;