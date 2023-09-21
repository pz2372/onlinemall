import React from "react";
import styles from "./BrandWithProductsSlider.module.scss";
import { Link } from "react-router-dom";
import ProductCard from "../productCard/ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";

const BrandWithProductsSlider = ({ product }: any) => {
  return (
    <div className={`${styles.brandWithProductsSliderGrid} mb-20`}>
      <div className={`${styles.brandLogo}`}>
        <Link to={`/brand/${product[0].brand.name}`}>
          <img
            alt={product[0].brand.name}
            src={`${process.env.REACT_APP_S3_BUCKET_URL}${product[0].brand.logo}`}
            loading="lazy"
          />
        </Link>
      </div>
      <Swiper
        slidesPerView={3}
        spaceBetween={10}
        navigation={true}
        modules={[Navigation]}
        className="px-2.5"
      >
        {product.map((p: any) => {
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
