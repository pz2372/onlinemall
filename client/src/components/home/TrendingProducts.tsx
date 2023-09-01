import Slider from "../Slider";
import Heading from "./Heading";

const TrendingProducts = () => {
  // trending cards Data
  const trendingProductsData = [
    {
      id: 1,
      img: "./images/trending-product.png",
      title: "Product Name",
      price: "$50.00",
      oldPrice: "$60.00",
    },
    {
      id: 2,
      img: "./images/trending-product.png",
      title: "Product Name",
      price: "$50.00",
      oldPrice: "$60.00",
    },
    {
      id: 3,
      img: "./images/trending-product.png",
      title: "Product Name",
      price: "$50.00",
      oldPrice: "$60.00",
    },
    {
      id: 4,
      img: "./images/trending-product.png",
      title: "Product Name",
      price: "$50.00",
      oldPrice: "$60.00",
    },
    {
      id: 5,
      img: "./images/trending-product.png",
      title: "Product Name",
      price: "$50.00",
      oldPrice: "$60.00",
    },
    {
      id: 6,
      img: "./images/trending-product.png",
      title: "Product Name",
      price: "$50.00",
      oldPrice: "$60.00",
    },
    {
      id: 7,
      img: "./images/trending-product.png",
      title: "Product Name",
      price: "$50.00",
      oldPrice: "$60.00",
    },
  ];

  return (
    <div className="container mx-auto lg:w-10/12 w-11/12">
      <div className="pb-20 lg:pb-32">
        {/* Heading */}
        <Heading title="Trending Products" />

        {/* Contents */}
        <div className="mt-10">
          {/* Silder */}
          <Slider ItemView={5} data={trendingProductsData} isHomePage={true} />
        </div>
      </div>
    </div>
  );
};

export default TrendingProducts;
