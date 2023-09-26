/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import BrandCategoryCards from "../components/brand/BrandCategoryCards";
import Pagination from "../components/Pagination";
import { brands } from "../assets/Categories";
import { tshirtData } from "../assets/clothingData";
import { useLocation, useSearchParams } from "react-router-dom";
import { AppDispatch, RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByCategoryWithBrands } from "../redux/slice/ProductSlice";
import BrandWithProductsSlider from "../components/brandWithProductsSlider/BrandWithProductsSlider";
import styles from "../components/brandWithProductsSlider/BrandWithProductsSlider.module.scss";
import ColorFilter from "../components/productFilters/ColorFilter";
import SizeFilter from "../components/productFilters/SizeFilter";
import Breadcrumb from "../components/breadcrumb/Breadcrumb";
import MultiRangeSlider from "../components/multiRangeSlider/MultiRangeSlider";
import SortByDropdown from "../components/dropdowns/sortByDropdown/SortByDropdown";
import { TSortDropdownOption } from "../types/dropdowns.type";
import {
  TProduct,
  TProductCategory,
  TProductColor,
  TProductSize,
  TProductSort,
} from "../types/products.type";
import Loader from "../components/loader/Loader";

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
  const breadcrumbs = subCategoryFromUrl
    ? [`${mainCategoryFromUrl} ${subCategoryFromUrl}`]
    : [mainCategoryFromUrl];

  const [colors, setColors] = useState<TProductColor[]>([]);
  const [sizes, setSizes] = useState<TProductSize[]>([]);
  const [minRangeVal, setMinRangeVal] = useState<number>(0);
  const [maxRangeVal, setMaxRangeVal] = useState<number>(100);
  const [sortValue, setSortValue] = useState<string>("");

  const sortOptions: TSortDropdownOption[] = [
    {
      id: 1,
      label: "Price high to low",
      value: "priceHighToLow",
    },
    {
      id: 2,
      label: "Price low to high",
      value: "priceLowToHigh",
    },
  ];

  useEffect(() => {
    if (categoryState.categories?.length) {
      const isCategoryExist = categoryState.categories.find(
        (c: TProductCategory) => c.path === mainCategoryPath.toUpperCase()
      );
      if (isCategoryExist) {
        const category: TProductCategory = isCategoryExist;
        const colorIds = colors
          .filter((c: TProductColor) => c.checked)
          .map((c: TProductColor) => c._id);
        const sizeIds = sizes
          .filter((s: TProductSize) => s.checked)
          .map((s: TProductSize) => s._id);
        const sort: TProductSort = {};
        if (sortValue === "priceHighToLow") {
          sort.price = "desc";
        } else if (sortValue === "priceLowToHigh") {
          sort.price = "asc";
        }
        dispatch(
          fetchProductsByCategoryWithBrands({
            categoryIds: [category._id],
            colorIds,
            sizeIds,
            minRangeVal,
            maxRangeVal,
            sort,
          })
        );
      }
    }
  }, [
    location,
    categoryState.categories,
    colors,
    sizes,
    minRangeVal,
    maxRangeVal,
    sortValue,
  ]);

  return (
    <>
      {isLoading ? <Loader /> : null}
      <div className="container mx-auto lg:w-10/12 w-11/12 mt-24 relative">
        {/* Heading */}
        <Breadcrumb path={breadcrumbs} />
        <SortByDropdown
          options={sortOptions}
          value={sortValue}
          setValue={setSortValue}
        />
        <div className={styles.productsWithFiltersContainer}>
          <div className={`${styles.filterSidebar}`}>
            {/* <CategoryFilter /> */}
            <ColorFilter colors={colors} setColors={setColors} />
            <SizeFilter sizes={sizes} setSizes={setSizes} />
            <MultiRangeSlider
              min={0}
              max={100}
              setMinRangeVal={setMinRangeVal}
              setMaxRangeVal={setMaxRangeVal}
            />
          </div>
          {Object.values(products).length ? (
            <div className={`${styles.brandWithProductsSliderContainer}`}>
              {Object.values(products).map((product: any, index: number) => {
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
