import React from "react";
import styles from "./BrandWithProductsSlider.module.scss";
import { Link } from "react-router-dom";
import ProductCard from "../productCard/ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import { TProduct, TProductRating } from "../../types/products.type";
import { BrandWithProductsSliderProps } from "../../types/props.type";

const BrandWithProductsSlider = ({ product }: BrandWithProductsSliderProps) => {
  return (
    <div className={`${styles.brandWithProductsSliderGrid} mb-20`}>
      <div className={`${styles.brandLogo}`}>
        <Link to={`/brand/${product[0].brand._id}`}>
          <img
            alt={product[0].brand.name}
            src={`${process.env.REACT_APP_S3_BUCKET_URL}/${product[0].brand.logo}`}
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
          let prod = { ...p };
          const sum = prod.ratings.reduce(
            (accumulator: number, object: TProductRating) => {
              return accumulator + object.rate;
            },
            0
          );
          let total = sum > 0 ? sum / prod.ratings.length : 0;
          prod.totalRatings = Number(total.toFixed(1));
          return (
            <SwiperSlide key={prod._id}>
              <ProductCard product={prod} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default BrandWithProductsSlider;
