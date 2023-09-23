import React, { useState } from "react";
import HeartIcon from "../svgs/HeartIcon";
import BagIcon from "../svgs/BagIcon";
import QuickViewIcon from "../svgs/QuickViewIcon";
import styles from "./ProductCard.module.scss";
import { ProductCardProps } from "../../types/props.type";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, addToFavorites } from "../../redux/slice/ProductSlice";

type TProductInCart = {
  id: string;
  quantity: number;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const { favorites } = useSelector((state: RootState) => state.product);
  const dispatch: AppDispatch = useDispatch();

  const handleAddToFavoritesClick = (productId: string) => {
    if (localStorage.favoritesIds) {
      const favoritesIds = JSON.parse(localStorage.favoritesIds);
      if (!favoritesIds.includes(productId)) {
        favoritesIds.push(productId);
      } else {
        favoritesIds.splice(favoritesIds.indexOf(productId), 1);
      }
      localStorage.favoritesIds = JSON.stringify(favoritesIds);
      dispatch(addToFavorites(favoritesIds));
    } else {
      localStorage.favoritesIds = JSON.stringify([productId]);
      dispatch(addToFavorites(productId));
    }
  };

  const handleAddToCartClick = (productId: string) => {
    if (localStorage.productsInCart) {
      const products = JSON.parse(localStorage.productsInCart);
      const productIndex = products.findIndex(
        (p: TProductInCart) => p.id === productId
      );
      if (productIndex === -1) {
        products.push({ id: productId, quantity: 1 });
      } else {
        products[productIndex].quantity += 1;
      }
      localStorage.productsInCart = JSON.stringify(products);
      dispatch(addToCart(products));
    } else {
      localStorage.productsInCart = JSON.stringify([
        { id: productId, quantity: 1 },
      ]);
      dispatch(addToCart([{ id: productId, quantity: 1 }]));
    }
  };

  const handleQuickViewClick = (productId: string) => {
    console.log("productId", productId);
  };
  return (
    <div className="group p-3 bg-transparent rounded-2xl hover:shadow-2xl rounded-lg overflow-hidden cursor-pointer">
      <div
        className="bg-cover bg-center h-72 p-4 rounded-2xl relative flex flex-col justify-between"
        style={{
          backgroundImage: `url(${process.env.REACT_APP_S3_BUCKET_URL}${product.images[0]})`,
        }}
      >
        <div
          className={`flex justify-end ${styles.addToFavorites} ${
            favorites.includes(product._id) ? styles.active : ""
          }`}
          title="Add to favorites"
          onClick={() => handleAddToFavoritesClick(product._id)}
        >
          <HeartIcon width="30px" height="30px" fill="white" />
        </div>
        <div
          className="hidden group-hover:flex items-center justify-center w-11/12 mx-auto bg-white/[.7] hover:bg-white gap-3 py-1 rounded-3xl"
          onClick={() => handleQuickViewClick(product._id)}
        >
          <QuickViewIcon width="20px" height="20px" fill="#000000" />
          <span className="text-sm">Quickview</span>
        </div>
      </div>
      <div className="flex items-center justify-between mt-3">
        <div>
          <p className="uppercase tracking-wide text-sm font-bold text-gray-700">
            {product.name}
          </p>
          <p className="text-sm text-gray-900">{`$${product.price}`}</p>
        </div>
        <div
          title="Add to cart"
          onClick={() => handleAddToCartClick(product._id)}
        >
          <BagIcon width="30px" height="30px" fill="#000000" />
        </div>
        {/* <p className="text-gray-700">{product.description}</p> */}
      </div>
    </div>
  );
};

export default ProductCard;
