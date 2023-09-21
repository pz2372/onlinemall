import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./styles.css";
import { Pagination, Navigation } from "swiper";
import logo from "../assets/Logo.png";
import CarouselCard from "./CarouselCard";

interface BrandCarouselProps {
  brandImage: string;
  products: { link: string; image: string; }[];
}

interface Product {
  image: string;
  link: string;
}

const BrandCarousel: React.FC<BrandCarouselProps> = ({ brandImage, products }) => {
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
    <div className="bg-white m-20 flex flex-row">
      <img src={brandImage} className="h-44 w-44"/>
      <Swiper
        slidesPerView={screenSlides}
        spaceBetween={30}
        slidesPerGroup={3}
        loop={true}
        loopFillGroupWithBlank={true}
        navigation={true}
        modules={[Navigation]}
        className="carousel h-44"
      >
        {products.map((product: Product) => (
          <SwiperSlide>
            <CarouselCard {...product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BrandCarousel;
