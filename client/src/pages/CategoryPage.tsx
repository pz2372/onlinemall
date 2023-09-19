import { useEffect } from "react";
import BrandCategoryCards from "../components/brand/BrandCategoryCards";
import FilterHeading from "../components/category/FilterHeading";
import Pagination from "../components/Pagination";
import { brands } from "../assets/Categories";
import { tshirtData, options } from "../assets/clothingData";
import { useLocation, useSearchParams } from "react-router-dom";
import { AppDispatch, RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByCategory } from "../redux/slice/ProductSlice";
import BrandWithProductsSlider from "../components/brandWithProductsSlider/BrandWithProductsSlider";
import styles from "../components/brandWithProductsSlider/BrandWithProductsSlider.module.scss";

const CategoryPage = () => {
  const { products } = useSelector((state: RootState) => state.product);

  const { categories } = useSelector((state: RootState) => state.category);
  const location = useLocation();
  const dispatch: AppDispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const category = {
    gender: location.pathname.substring(1),
    category: searchParams.get("cat"),
  };

  useEffect(() => {
    let cat = location.pathname.substring(1);
    if (searchParams.get("cat")) {
      cat += `/${searchParams.get("cat")}`;
    }

    const c: any = categories.find((c: any) => c.path === cat.toUpperCase());
    if (c) {
      dispatch(fetchProductsByCategory(c._id));
    }
  }, [location, categories]);
  return (
    <>
      <div className="container mx-auto lg:w-10/12 w-11/12 mt-24 pt-10 md:pt-20">
        {/* Heading */}
        <FilterHeading category={category} options={options} />
        {Object.values(products).length ? (
          <div className={`${styles.brandWithProductsSliderContainer}`}>
            {Object.values(products).map((product: any, index) => {
              return <BrandWithProductsSlider key={index} product={product} />;
            })}
          </div>
        ) : (
          <div className="my-20">No products found</div>
        )}
        {/* {brands.map((brand: any, index: number) => {
          return (
            <BrandCategoryCards
              key={index}
              brand={brand}
              brandImg="./images/brands/nike.png"
              data={tshirtData}
            />
          );
        })} */}

        {/* Pagination */}
        {/* <Pagination /> */}
      </div>
    </>
  );
};

export default CategoryPage;
