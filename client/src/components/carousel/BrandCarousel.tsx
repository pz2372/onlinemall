import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./styles.css";
import { Pagination, Navigation } from "swiper";
import styled from "styled-components";
import logo from "../assets/Logo.png";
import CarouselCard from "./CarouselCard";

const CarouselContainer = styled.div`
  background: white;
  margin: 20px 20px 20px 20px;
  display: flex;
  flex-direction: row;
`;
const BrandImage = styled.img`
  height: 180px;
  width: 180px;
`;
const StyledSwiper = styled(Swiper)`
  height: 180px;
`;

const BrandCarousel = (props: any) => {
  var screenSlides;
  var width = window.innerWidth;

  if (width <= 1000) {
    screenSlides = 3;
  } else if (width <= 1300) {
    screenSlides = 4;
  } else {
    screenSlides = 5;
  }

  const carouselData: any = []
  const carouselImages: any = []

  Object.values(props.carousel).forEach((val) => carouselData.push(val));

  //(link, image url)
  for (var i = 2; i < 11; i++) {
    carouselImages.push({link: carouselData[i], image: carouselData[i+9]});
  }
  return (
    <CarouselContainer>
      <BrandImage src={props.brand} />
      <StyledSwiper
        slidesPerView={screenSlides}
        spaceBetween={30}
        slidesPerGroup={3}
        loop={true}
        loopFillGroupWithBlank={true}
        navigation={true}
        modules={[Navigation]}
        className="carousel"
      >
        {carouselImages.map((product: any) => (
          <SwiperSlide>
            <CarouselCard image={product.image} link={product.link} />
          </SwiperSlide>
        ))}
      </StyledSwiper>
    </CarouselContainer>
  );
};

export default BrandCarousel;
