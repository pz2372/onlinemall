import { NavLink } from "react-router-dom";
import DiscountSmallCard from "./DiscountSmallCard";

const DiscountBanners = () => {
  // Small Cards Data
  const DSmall = [
    {
      id: 1,
      parcent: "20%",
      imagePath: "./images/discountShoe.png",
      path: "/",
      bgColor: "#EDF0FF",
    },
    {
      id: 2,
      parcent: "40%",
      imagePath: "./images/discountHat.png",
      path: "/",
      bgColor: "#FFF5F5",
    },
  ];

  return (
    <div className="container mx-auto lg:w-10/12 w-11/12">
      <div className="w-full flex justify-between gap-8 pb-20 lg:pb-32 lg:flex-row flex-col">
        {/* Left Side */}
        <div className="w-full lg:w-5/12">
          <div className="flex flex-col gap-8">
            {/* Mapping through the Dsmall array and returning left side small cards */}
            {DSmall?.map((item) => {
              const { id, imagePath, parcent, path, bgColor } = item;

              return (
                <DiscountSmallCard
                  bgColor={bgColor}
                  key={id}
                  imagePath={imagePath}
                  parcent={parcent}
                  path={path}
                />
              );
            })}
          </div>
        </div>

        {/* Right Side */}
        <div className="w-full lg:w-7/12 bg-discountYellow lg:pl-[70px] pl-4 md:pl-12 pt-16 rounded-lg flex items-center justify-between">
          {/* Left Side */}
          <div className="md:w-auto w-full pb-4">
            <h2 className="text-2xl md:text-3xl lg:text-[34px] font-bold leading-[112%] text-discoundBigBannerHeading">
              Let's Lorem <br className="lg:block hidden" /> Suit Up!
            </h2>

            <p className="pt-3 lg:pb-32 md:pb-14 pb-10 font-semibold text-discoundBigBannerHeading">
              Lorem ipsum dolor
            </p>

            <NavLink to="/">
              <span className="text-discountTextBlack text-sm md:text-lg lg:text-xl font-medium underline underline-offset-4 cursor-pointer">
                Find More
              </span>
            </NavLink>
          </div>

          {/* Right Side */}
          <div className="md:w-auto w-full">
            <img src="./images/discound-last.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscountBanners;
