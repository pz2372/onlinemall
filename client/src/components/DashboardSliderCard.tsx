import { NavLink } from "react-router-dom";
import GroupHoveredItem from "./GroupHoveredItem";
import ColorSelector from "./ColorSelector";

interface DashboardSliderCard {
  img?: string;
  name?: string;
  price?: string;
  isHomePage?: boolean;
}

const DashboardSliderCard: React.FC<DashboardSliderCard> = ({
  img,
  name,
  price,
  isHomePage,
}) => {
  return (
    <div className="group relative">
      <NavLink to="/">
        <div className="w-full">
          <img src={img} alt="" className="w-full" />

          <p className="text-themeBlackBold md:text-lg font-semibold pt-2">
            {name}
          </p>
          <span className="text-dropdownText flex items-center gap-2 pb-2">
            {isHomePage === true ? (
              <p className="line-through text-discountPrice text-sm md:text-base">
                {price}
              </p>
            ) : null}{" "}
            <p className="text-sm md:text-base">{price}</p>
          </span>
        </div>
      </NavLink>

      {/* Homepage hover item if it's homepage*/}
      {isHomePage === true ? <GroupHoveredItem /> : null}

      {/* Colors Box */}
      {isHomePage === true ? <ColorSelector /> : null}
    </div>
  );
};

export default DashboardSliderCard;
