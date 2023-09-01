import { NavLink } from "react-router-dom";

interface DiscountSmallCardProps {
  parcent: string;
  imagePath: string;
  path: string;
  bgColor: string;
}

const DiscountSmallCard: React.FunctionComponent<DiscountSmallCardProps> = ({
  parcent,
  imagePath,
  path,
  bgColor,
}) => {
  return (
    <div
      style={{
        backgroundColor: bgColor,
      }}
      className="md:px-8 px-5 md:py-9 py-6 flex items-center justify-between rounded-lg"
    >
      {/* Left Side */}
      <div className="md:w-auto w-full">
        <h2 className="text-2xl lg:text-[34px] font-semibold leading-[112%] text-discountTextBlack">
          {parcent} Off <br /> Lorem ipsum
        </h2>

        <p className="text-discountParaText pt-3 pb-5 md:text-base text-sm">
          Lorem ipsum dolor
        </p>

        <NavLink to={path}>
          <span className="text-discountTextBlack text-sm font-medium underline underline-offset-4 cursor-pointer">
            Find More
          </span>
        </NavLink>
      </div>

      {/* Right Side */}
      <div className="md:w-auto w-full">
        <img src={imagePath} alt="" />
      </div>
    </div>
  );
};

export default DiscountSmallCard;
