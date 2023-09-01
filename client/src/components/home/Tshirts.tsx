import Slider from "../Slider";
import Heading from "./Heading";

const Tshirts = () => {
  // trending cards Data
  const tshirtsData = [
    {
      id: 1,
      img: "./images/hot-tshirt.png",
      title: "Product Name",
      price: "$50.00",
      oldPrice: "$60.00",
    },
    {
      id: 2,
      img: "./images/hot-tshirt.png",
      title: "Product Name",
      price: "$50.00",
      oldPrice: "$60.00",
    },
    {
      id: 3,
      img: "./images/hot-tshirt.png",
      title: "Product Name",
      price: "$50.00",
      oldPrice: "$60.00",
    },
    {
      id: 4,
      img: "./images/hot-tshirt.png",
      title: "Product Name",
      price: "$50.00",
      oldPrice: "$60.00",
    },
    {
      id: 5,
      img: "./images/hot-tshirt.png",
      title: "Product Name",
      price: "$50.00",
      oldPrice: "$60.00",
    },
    {
      id: 6,
      img: "./images/hot-tshirt.png",
      title: "Product Name",
      price: "$50.00",
      oldPrice: "$60.00",
    },
    {
      id: 7,
      img: "./images/hot-tshirt.png",
      title: "Product Name",
      price: "$50.00",
      oldPrice: "$60.00",
    },
  ];

  return (
    <div className="container mx-auto lg:w-10/12 w-11/12">
      <div className="pb-32">
        {/* Heading */}
        <Heading title="Hot T-Shirt" />

        {/* Contents */}
        <div className="mt-10">
          {/* Silder */}
          <Slider ItemView={5} data={tshirtsData} isHomePage={true} />
        </div>
      </div>
    </div>
  );
};

export default Tshirts;
