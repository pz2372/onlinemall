import React, { useState, useEffect } from "react";
import HeartIcon from "../svgs/HeartIcon";
import QuickViewIcon from "../svgs/QuickViewIcon";
import styles from "./ProductCard.module.scss";
import { ProductCardProps } from "../../types/props.type";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { addToFavorites } from "../../redux/slice/ProductSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { toggleQuickviewPopup } from "../../redux/slice/PopupSlice";
// @ts-ignore
import ReactStars from "react-rating-stars-component";

const ProductCard = ({ product }: ProductCardProps) => {
  const { favorites } = useSelector((state: RootState) => state.product);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToFavoritesClick = (productId: string) => {
    if (localStorage.favoritesIds) {
      const favoritesIds = JSON.parse(localStorage.favoritesIds);
      if (!favoritesIds.includes(productId)) {
        favoritesIds.push(productId);
        toast.success("Product added to your favorites", {
          autoClose: 2000,
        });
      } else {
        favoritesIds.splice(favoritesIds.indexOf(productId), 1);
      }
      localStorage.favoritesIds = JSON.stringify(favoritesIds);
      dispatch(addToFavorites(favoritesIds));
    } else {
      localStorage.favoritesIds = JSON.stringify([productId]);
      dispatch(addToFavorites([productId]));
      toast.success("Product added to your favorites", {
        autoClose: 2000,
      });
    }
  };

  const handleQuickViewClick = (productId: string) => {
    dispatch(toggleQuickviewPopup({ show: true, productId }));
  };

  return (
    <div className="relative group p-3 bg-transparent rounded-2xl hover:shadow-2xl rounded-lg overflow-hidden cursor-pointer">
      <div
        className="absolute top-0 left-0 w-full h-[82%] z-10"
        onClick={() => navigate(`/product/${product._id}`)}
      ></div>
      <div
        className="bg-cover bg-center h-72 p-4 rounded-2xl relative flex flex-col justify-between"
        style={{
          backgroundImage: `url(${process.env.REACT_APP_S3_BUCKET_URL}${product.images[0]})`,
        }}
      >
        <div
          className={`relative z-20 flex justify-end ${styles.addToFavorites} ${
            favorites.includes(product._id) ? styles.active : ""
          }`}
          title="Add to favorites"
          onClick={() => handleAddToFavoritesClick(product._id)}
        >
          <HeartIcon width="30px" height="30px" fill="white" />
        </div>
        <div
          className="relative z-20 flex md:hidden group-hover:flex items-center justify-center w-11/12 mx-auto bg-white/[.7] hover:bg-white gap-3 py-1 rounded-3xl"
          onClick={() => handleQuickViewClick(product._id)}
        >
          <QuickViewIcon width="20px" height="20px" fill="#000000" />
          <span className="text-sm">Quickview</span>
        </div>
      </div>
      <div className="mt-3" onClick={() => navigate(`/product/${product._id}`)}>
        <p
          className="uppercase tracking-wide text-sm font-bold text-gray-700 truncate"
          title={product.name}
        >
          {product.name}
        </p>
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-900">{`$${product.price}`}</p>
          <div title={`${product.totalRatings} OUT OF 5`}>
            <ReactStars
              key={product._id}
              count={5}
              size={16}
              activeColor="#FF6D2E"
              isHalf
              value={product.totalRatings}
              edit={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
