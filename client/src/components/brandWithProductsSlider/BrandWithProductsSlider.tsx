import React from "react";
import styles from "./BrandWithProductsSlider.module.scss";
import { Link } from "react-router-dom";

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
        return (
          <div className={styles.productCard} key={p._id}>
            <div className={styles.productImage}>
              <img
                alt={p.name}
                src={`${process.env.REACT_APP_S3_BUCKET_URL}${p.images[0]}`}
                loading="lazy"
              />
            </div>
            <div className={styles.productInfo}>
              <h3 className="font-bold">{p.name}</h3>
              <p>{`$${p.price}`}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BrandWithProductsSlider;
