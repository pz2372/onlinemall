import React from "react";
import styles from "./BrandWithProductsSlider.module.scss";
import { Link } from "react-router-dom";
import ProductCard from "../productCard/ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import { TProduct } from "../../types/products.type";
import { BrandWithProductsSliderProps } from "../../types/props.type";

const BrandWithProductsSlider = ({ product }: BrandWithProductsSliderProps) => {
  return (
    <div className={`${styles.brandWithProductsSliderGrid} mb-20`}>
      <div className={`${styles.brandLogo} relative flex justify-center mb-8`}>
        <div className="absolute -top-2 h-[2px] w-[66px] bg-black"></div>
        <Link to={`/brand/${product[0].brand._id}`}>
          <img
            alt={product[0].brand.name}
            src={`${process.env.REACT_APP_S3_BUCKET_URL}${product[0].brand.logo}`}
            loading="lazy"
          />
        </Link>
      </div>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        navigation={true}
        modules={[Navigation]}
        className="px-2.5"
        breakpoints={{
          420: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 4,
          },
          1400: {
            slidesPerView: 5,
          },
        }}
      >
        {product.map((p: TProduct) => {
          return (
            <SwiperSlide key={p._id}>
              <ProductCard product={p} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default BrandWithProductsSlider;
