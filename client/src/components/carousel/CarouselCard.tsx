import React, { useRef, useState } from "react";

interface Product {
  image: string;
  link: string;
}

const CarouselCard = (products: Product) => {

  return (
    <div className="bg-white h-full w-full">
      <a href={products.link}>
        <img src={products.image} />
      </a>
    </div>
  );
};

export default CarouselCard;
