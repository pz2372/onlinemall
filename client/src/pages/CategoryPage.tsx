import BrandCategoryCards from "../components/brand/BrandCategoryCards";
import FilterHeading from "../components/category/FilterHeading";
import Pagination from "../components/Pagination";
import { brands } from "../assets/Categories";
import { tshirtData, options } from "../assets/clothingData";

const CategoryPage = ({ category }: any) => {
  return (
    <>
      <div className="container mx-auto lg:w-10/12 w-11/12 mt-24 pt-10 md:pt-20">
        {/* Heading */}
        <FilterHeading category={category} options={options} />

        {brands.map((brand) => {
          return (
            <BrandCategoryCards
              brand={brand}
              brandImg="./images/brands/nike.png"
              data={tshirtData}
            />
          );
        })}

        {/* Pagination */}
        <Pagination />
      </div>
    </>
  );
};

export default CategoryPage;
