import React, { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import BrandProductUpload from "./BrandProductUpload";
import CategoryCarousel from "../components/CategoryCarousel";

const BrandDashboard = () => {
  const [carousels, setCarousels] = useState<React.ReactElement<any>[]>([]);

  let data = [
    {
      category: "Tshirt",
      items: [
        {
          id: 1,
          img: "./images/swimsuit.png",
          title: "Product Name",
          price: "$50.00",
          oldPrice: "$60.00",
        },
        {
          id: 2,
          img: "./images/swimsuit.png",
          title: "Product Name",
          price: "$50.00",
          oldPrice: "$60.00",
        },
        {
          id: 3,
          img: "./images/swimsuit.png",
          title: "Product Name",
          price: "$50.00",
          oldPrice: "$60.00",
        },
        {
          id: 4,
          img: "./images/swimsuit.png",
          title: "Product Name",
          price: "$50.00",
          oldPrice: "$60.00",
        },
        {
          id: 5,
          img: "./images/swimsuit.png",
          title: "Product Name",
          price: "$50.00",
          oldPrice: "$60.00",
        },
        {
          id: 6,
          img: "./images/swimsuit.png",
          title: "Product Name",
          price: "$50.00",
          oldPrice: "$60.00",
        },
        {
          id: 7,
          img: "./images/swimsuit.png",
          title: "Product Name",
          price: "$50.00",
          oldPrice: "$60.00",
        },
      ],
    },
    {
      category: "Sweatshirts",
      items: [
        {
          id: 1,
          img: "./images/swimsuit.png",
          title: "Product Name",
          price: "$50.00",
          oldPrice: "$60.00",
        },
        {
          id: 2,
          img: "./images/swimsuit.png",
          title: "Product Name",
          price: "$50.00",
          oldPrice: "$60.00",
        },
        {
          id: 3,
          img: "./images/swimsuit.png",
          title: "Product Name",
          price: "$50.00",
          oldPrice: "$60.00",
        },
        {
          id: 4,
          img: "./images/swimsuit.png",
          title: "Product Name",
          price: "$50.00",
          oldPrice: "$60.00",
        },
        {
          id: 5,
          img: "./images/swimsuit.png",
          title: "Product Name",
          price: "$50.00",
          oldPrice: "$60.00",
        },
        {
          id: 6,
          img: "./images/swimsuit.png",
          title: "Product Name",
          price: "$50.00",
          oldPrice: "$60.00",
        },
        {
          id: 7,
          img: "./images/swimsuit.png",
          title: "Product Name",
          price: "$50.00",
          oldPrice: "$60.00",
        },
      ],
    },
  ];

  useEffect(() => {
    var tempCarousel = [];

    for (var i = 0; i < 2; i++) {
      tempCarousel[i] = (
        <CategoryCarousel title={data[i].category} data={data} />
      );
    }
    setCarousels(tempCarousel);
  }, []);

  return (
    <div className="p-40">
      {/*<BrandProductUpload />*/}
      {carousels}
    </div>
  );
};

export default BrandDashboard;
