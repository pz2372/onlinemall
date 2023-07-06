import React from "react";
import styled from "styled-components";

const CardContainer = styled.div`
  background: white;
  height: 340px;
  width: 23%;
`;
const CardTitle = styled.h2`
  margin-left: 30px;
  padding-top: 15px;
`;
const CardImage = styled.img``;

const ProductCard = (props: any) => {
  return (
    <CardContainer>
      <CardTitle>{props.title}</CardTitle>
      <CardImage />
    </CardContainer>
  );
};

export default ProductCard;
