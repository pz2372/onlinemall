import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import BrandCarousel from "../../client/src/components/carousel/BrandCarousel";
import { useSelector, useDispatch } from 'react-redux'
import { add } from '../../client/src/reducers/CarouselSlice'

const MenTshirtContainer = styled.div``;

const MenTshirts = () => {
  const carousel = useSelector((state: { carousel: [{}] }) => state.carousel)
  const dispatch = useDispatch();

  useEffect(() => {
    fetch("/api/getmentshirts")
      .then((response) => response.json())
      .then((data) => dispatch(add(data)))
  }, []);

  return (
    <MenTshirtContainer>
      {carousel.map((data: any) => {
        return <BrandCarousel key={"men_tshirt" + data.id} carousel={data} />;
      })}
    </MenTshirtContainer>
  );
};

export default MenTshirts;
