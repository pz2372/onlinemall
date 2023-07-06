import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./styles.css";
import { Pagination, Navigation } from "swiper";
import styled from "styled-components";

const CarouselContainer = styled.div`
  background: white;
  margin: 0 20px 20px 20px;
`;
const CarouselTitle = styled.h2`
  margin-left: 30px;
  padding-top: 15px;
`;
const StyledSwiper = styled(Swiper)`
height: 150px;
`

const Carousel = (props: any) => {
  var screenSlides;
  var width = window.innerWidth;

  if (width <= 1000) {
    screenSlides = 3;
  } else if (width <= 1300) {
    screenSlides = 4;
  } else {
    screenSlides = 5;
  }

  return (
    <CarouselContainer>
      <CarouselTitle>{props.title}</CarouselTitle>
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
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide>
        <SwiperSlide>Slide 9</SwiperSlide>
      </StyledSwiper>
    </CarouselContainer>
  );
};

export default Carousel;
