import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

const ProductsContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const ImagesContainer = styled.div`
width: 60%;
`;

const ProductImage = styled.img`
  height: 600px;
  width: 500px;
`;

const InfoContainer = styled.div`
width: 40%;
`;

const Size = styled.text`

`

const ProductPage = (product: any) => {
  return (
    <ProductsContainer>
        <ImagesContainer>
      {/*<ProductImage src={} />*/}
      </ImagesContainer>
      <InfoContainer>
        {product.name}
        {product.price}
        {product.stars}
        Color: {product.color}
        Size:
        <Size>XS</Size>
        <Size>S</Size>
        <Size>M</Size>
        <Size>L</Size>
        <Size>XL</Size>
      </InfoContainer>
    </ProductsContainer>
  );
};

export default ProductPage;
