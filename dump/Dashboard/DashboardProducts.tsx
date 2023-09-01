import DashboardProductCard from "./DashboardProductCard";

const DashboardProducts = () => {
  // T-shirt Data
  const tshirtData = [
    {
      id: 1,
      title: "Product Name",
      price: "$50.00",
      img: "./images/tshirt.png",
    },
    {
      id: 2,
      title: "Product Name",
      price: "$50.00",
      img: "./images/tshirt.png",
    },
    {
      id: 3,
      title: "Product Name",
      price: "$50.00",
      img: "./images/tshirt.png",
    },
    {
      id: 4,
      title: "Product Name",
      price: "$50.00",
      img: "./images/tshirt.png",
    },
    {
      id: 5,
      title: "Product Name",
      price: "$50.00",
      img: "./images/tshirt.png",
    },
    {
      id: 6,
      title: "Product Name",
      price: "$50.00",
      img: "./images/tshirt.png",
    },
    {
      id: 7,
      title: "Product Name",
      price: "$50.00",
      img: "./images/tshirt.png",
    },
    {
      id: 8,
      title: "Product Name",
      price: "$50.00",
      img: "./images/tshirt.png",
    },
    {
      id: 9,
      title: "Product Name",
      price: "$50.00",
      img: "./images/tshirt.png",
    },
    {
      id: 10,
      title: "Product Name",
      price: "$50.00",
      img: "./images/tshirt.png",
    },
  ];

  // Sweet Shirts Data
  const sweatshirts = [
    {
      id: 1,
      title: "Product Name",
      price: "$50.00",
      img: "./images/sweatshirts.png",
    },
    {
      id: 2,
      title: "Product Name",
      price: "$50.00",
      img: "./images/sweatshirts.png",
    },
    {
      id: 3,
      title: "Product Name",
      price: "$50.00",
      img: "./images/sweatshirts.png",
    },
    {
      id: 4,
      title: "Product Name",
      price: "$50.00",
      img: "./images/sweatshirts.png",
    },
    {
      id: 5,
      title: "Product Name",
      price: "$50.00",
      img: "./images/sweatshirts.png",
    },
    {
      id: 6,
      title: "Product Name",
      price: "$50.00",
      img: "./images/sweatshirts.png",
    },
    {
      id: 7,
      title: "Product Name",
      price: "$50.00",
      img: "./images/sweatshirts.png",
    },
    {
      id: 8,
      title: "Product Name",
      price: "$50.00",
      img: "./images/sweatshirts.png",
    },
    {
      id: 9,
      title: "Product Name",
      price: "$50.00",
      img: "./images/sweatshirts.png",
    },
    {
      id: 10,
      title: "Product Name",
      price: "$50.00",
      img: "./images/sweatshirts.png",
    },
  ];

  // pants Data
  const pantsData = [
    {
      id: 1,
      title: "Product Name",
      price: "$30.00",
      img: "./images/pants.png",
    },
    {
      id: 2,
      title: "Product Name",
      price: "$30.00",
      img: "./images/pants.png",
    },
    {
      id: 3,
      title: "Product Name",
      price: "$30.00",
      img: "./images/pants.png",
    },
    {
      id: 4,
      title: "Product Name",
      price: "$30.00",
      img: "./images/pants.png",
    },
    {
      id: 5,
      title: "Product Name",
      price: "$30.00",
      img: "./images/pants.png",
    },
    {
      id: 6,
      title: "Product Name",
      price: "$30.00",
      img: "./images/pants.png",
    },
    {
      id: 7,
      title: "Product Name",
      price: "$30.00",
      img: "./images/pants.png",
    },
    {
      id: 8,
      title: "Product Name",
      price: "$30.00",
      img: "./images/pants.png",
    },
    {
      id: 9,
      title: "Product Name",
      price: "$30.00",
      img: "./images/pants.png",
    },
    {
      id: 10,
      title: "Product Name",
      price: "$30.00",
      img: "./images/pants.png",
    },
  ];

  return (
    <div className="mt-12">
      {/* Product Card */}
      <DashboardProductCard data={tshirtData} title="T-shirt" />
      <DashboardProductCard data={sweatshirts} title="Sweatshirts" />
      <DashboardProductCard data={pantsData} title="Pants" />
    </div>
  );
};

export default DashboardProducts;
