import React from "react";
import HeartIcon from "../svgs/HeartIcon";
import BagIcon from "../svgs/BagIcon";
import QuickViewIcon from "../svgs/QuickViewIcon";

const ProductCard = ({ product }: any) => {
  const handleAddToFavoritesClick = (productId: string) => {
    console.log("productId", productId);
  };

  const handleAddToCartClick = (productId: string) => {
    console.log("productId", productId);
  };

  const handleQuickViewClick = (productId: string) => {
    console.log("productId", productId);
  };
  return (
    <div className="group p-3 bg-transparent rounded-2xl hover:shadow-2xl rounded-lg overflow-hidden cursor-pointer">
      <div
        className="bg-cover bg-center h-72 p-4 rounded-2xl relative flex flex-col justify-between "
        style={{
          backgroundImage: `url(${process.env.REACT_APP_S3_BUCKET_URL}${product.images[0]})`,
        }}
      >
        <div
          className="flex justify-end"
          title="Add to favorites"
          onClick={() => handleAddToFavoritesClick(product._id)}
        >
          <HeartIcon width="30px" height="30px" fill="white" hover="#FF6D2E" />
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
