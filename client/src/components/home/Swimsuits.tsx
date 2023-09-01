import Slider from "../Slider";
import Heading from "./Heading";
import CategoryCarousel from "../CategoryCarousel"

const Swimsuits = () => {
  // trending cards Data
  const swimsuitsData = [
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
  ];

  return (
    <div className="py-32 bg-grayBg">
      <CategoryCarousel title="Swimsuit" data={swimsuitsData}/>
    </div>
  );
};

export default Swimsuits;
