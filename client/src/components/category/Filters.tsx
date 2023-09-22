import { useState } from "react";
import TshirtOutlet from "./TshirtOutlet";
import SweetShirtsOutlet from "./SweetShirtsOutlet";
import PantsOutlet from "./PantsOutlet";
import JeansOutlet from "./JeansOutlet";
import FilterHeading from "./FilterHeading";
import FilterSidebar from "./FilterSidebar";
import {
  tshirtData,
  sweatshirts,
  pantsData,
  jeansData,
} from "../../assets/clothingData";

const Filters = () => {
  // btns Data
  const btnsData = [
    {
      id: 1,
      title: "T-Shirt",
    },
    {
      id: 2,
      title: "Sweatshirts",
    },
    {
      id: 3,
      title: "Pants",
    },
    {
      id: 4,
      title: "Jeans",
    },
  ];

  // State for toggling the active button
  const [activeBtn, setActiveBtn] = useState(1);

  return (
    <>
      {/* filter cards */}
      <div className="lg:mt-16 mt-10 lg:mb-32 mb-20">
        {/* Categories */}
        <div className="w-full flex items-start justify-between md:flex-row flex-col gap-10 lg:gap-16 mt-8">
          {/* Left Side Buttons */}
          <FilterSidebar
            key={"sidebar"}
            btnsData={btnsData}
            activeBtn={activeBtn}
            setActiveBtn={setActiveBtn}
          />

          <div className="w-full md:w-[75%] lg:w-[80%]">
            {activeBtn === 1 ? (
              <TshirtOutlet key="Tshirts" data={tshirtData} />
            ) : activeBtn === 2 ? (
              <SweetShirtsOutlet key="Sweatshirt" data={sweatshirts} />
            ) : activeBtn === 3 ? (
              <PantsOutlet data={pantsData} key="Pants" />
            ) : activeBtn === 4 ? (
              <JeansOutlet key="Jeans" data={jeansData} />
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default Filters;
