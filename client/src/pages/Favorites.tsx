import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const Favorites = () => {
  const { products, favorites } = useSelector(
    (state: RootState) => state.product
  );
  console.log("products", products);
  console.log("favorites", favorites);
  return <div>Favorites</div>;
};

export default Favorites;
