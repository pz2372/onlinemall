import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import BrandCarousel from "../client/src/components/carousel/BrandCarousel";
import { useSelector, useDispatch } from 'react-redux'
import { add } from '../client/src/reducers/CarouselSlice'

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