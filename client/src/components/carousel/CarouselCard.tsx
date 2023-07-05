import React, { useRef, useState } from "react";
import styled from "styled-components";

const CardContainer = styled.div`
  background: white;
  height: 100%;
  width: 100%;
`;
const CardImage = styled.img``;

const CarouselCard = (props: any) => {
  return (
    <CardContainer>
      <a href={props.link}>
        <CardImage src={props.image} />
      </a>
    </CardContainer>
  );
};

export default CarouselCard;
