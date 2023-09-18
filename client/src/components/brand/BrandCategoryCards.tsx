import { NavLink } from "react-router-dom";
import Slider from "../Slider";

// Assuming the type of each element in the 'data' array is like this:
type ItemType = {
  id: number;
  title: string;
  price: string;
  img: string;
};

// Then, you can specify the type of the 'data' prop in the component:
type BrandCategoryCardsProps = {
  brand?: string;
  data?: ItemType[];
  brandImg?: string;
};

const BrandCategoryCards: React.FC<BrandCategoryCardsProps> = ({
  brand,
  data,
  brandImg,
}) => {
  return (
    <div className="mt-10 md:mt-20 flex items-start gap-8 lg:gap-[60px] pb-10 border-b border-b-dashboardBorder">
      {/* Left side logo */}
      <div className="md:w-2/12 w-3/12">
        <NavLink to={`/${brand}`}>
          <img src={brandImg} alt="" className="w-full md:w-auto" />
        </NavLink>
      </div>

      {/* right side slider */}
      <div className="w-9/12 md:w-10/12">
        <Slider ItemView={4} data={data} />
      </div>
    </div>
  );
};

export default BrandCategoryCards;
