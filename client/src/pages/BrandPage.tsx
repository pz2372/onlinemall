import CatHeading from "../components/category/CatHeading";
import Filters from "../components/category/Filters";

const BrandPage = () => {
  return (
    <div className="w-full">
      {/* Banner */}
      <CatHeading />
      {/* content start */}
      <div className="container mx-auto lg:w-10/12 w-11/12">
        <Filters />
      </div>
    </div>
  );
};

export default BrandPage;
