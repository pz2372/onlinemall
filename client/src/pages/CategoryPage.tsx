/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import BrandCategoryCards from "../components/brand/BrandCategoryCards";
import FilterHeading from "../components/category/FilterHeading";
import Pagination from "../components/Pagination";
import { brands } from "../assets/Categories";
import { tshirtData, options } from "../assets/clothingData";
import { useLocation, useSearchParams } from "react-router-dom";
import { AppDispatch, RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByCategoryWithBrands } from "../redux/slice/ProductSlice";
import BrandWithProductsSlider from "../components/brandWithProductsSlider/BrandWithProductsSlider";
import styles from "../components/brandWithProductsSlider/BrandWithProductsSlider.module.scss";
import CategoryFilter from "../components/productFilters/CategoryFilter";
import ColorFilter from "../components/productFilters/ColorFilter";
import SizeFilter from "../components/productFilters/SizeFilter";

const CategoryPage = () => {
  const { products, isLoading } = useSelector(
    (state: RootState) => state.product
  );
  const categoryState = useSelector((state: RootState) => state.category);
  const location = useLocation();
  const dispatch: AppDispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const subCategoryFromUrl = searchParams.get("cat");
  const mainCategoryFromUrl = location.pathname.substring(1);
  const mainCategoryPath = `${mainCategoryFromUrl}/${subCategoryFromUrl}`;
  const categoryObj = {
    gender: mainCategoryFromUrl,
    category: subCategoryFromUrl,
  };

  const [colors, setColors] = useState<any>([]);
  const [sizes, setSizes] = useState<any>([]);

  useEffect(() => {
    if (categoryState.categories?.length) {
      const c: any = categoryState.categories.find(
        (c: any) => c.path === mainCategoryPath.toUpperCase()
      );
      if (c) {
        const colorIds = colors
          .filter((c: any) => c.checked)
          .map((c: any) => c._id);
        const sizeIds = sizes
          .filter((s: any) => s.checked)
          .map((s: any) => s._id);
        dispatch(
          fetchProductsByCategoryWithBrands({
            categoryIds: [c._id],
            colorIds,
            sizeIds,
          })
        );
      }
    }
  }, [location, categoryState.categories, colors, sizes]);

  return (
    <>
      {isLoading ? (
        <div className="fixed left-0 top-[140px] w-full h-full bg-white/[.7] z-50 flex items-center justify-center">
          <div className="absolute right-1/2 bottom-1/2  transform translate-x-1/2 translate-y-1/2 ">
            <div className="border-t-transparent border-solid animate-spin  rounded-full border-[#FF6D2E] border-8 h-32 w-32"></div>
          </div>
          Loading...
        </div>
      ) : null}
      <div className="container mx-auto lg:w-10/12 w-11/12 mt-24 pt-10 md:pt-20 relative">
        {/* Heading */}
        <FilterHeading category={categoryObj} options={options} />
        <div className={styles.productsWithFiltersContainer}>
          <div className={`${styles.filterSidebar}`}>
            {/* <CategoryFilter /> */}
            <ColorFilter colors={colors} setColors={setColors} />
            <SizeFilter sizes={sizes} setSizes={setSizes} />
          </div>
          {Object.values(products).length ? (
            <div className={`${styles.brandWithProductsSliderContainer}`}>
              {Object.values(products).map((product: any, index) => {
                return (
                  <BrandWithProductsSlider key={index} product={product} />
                );
              })}
            </div>
          ) : (
            <div className="mx-auto">No products found</div>
          )}
        </div>
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
