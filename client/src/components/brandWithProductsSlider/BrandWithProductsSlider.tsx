import React from "react";
import styles from "./BrandWithProductsSlider.module.scss";
import { Link } from "react-router-dom";
import ProductCard from "../productCard/ProductCard";

const BrandWithProductsSlider = ({ product }: any) => {
  return (
    <div className={`${styles.brandWithProductsSliderGrid}`}>
      <div className={`${styles.brandLogo} mr-10`}>
        <Link to={`/brand/${product[0].brand.name}`}>
          <img
            alt={product[0].brand.name}
            src={`${process.env.REACT_APP_S3_BUCKET_URL}${product[0].brand.logo}`}
            loading="lazy"
          />
        </Link>
      </div>
      {product.map((p: any) => {
        return <ProductCard key={p._id} product={p} />;
      })}
    </div>
  );
};

export default BrandWithProductsSlider;
