import { useParams } from "react-router-dom";
// import CatHeading from "../components/category/CatHeading";
// import Filters from "../components/category/Filters";
import { useEffect, useState } from "react";
import { AppDispatch, RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByBrand } from "../redux/slice/ProductSlice";
import {
  TProduct,
  TProductBrand,
  TProductCategory,
} from "../types/products.type";
import BrandHeroSecton from "../components/brand/BrandHeroSecton";
import BrandSidebarFilter from "../components/brand/BrandSidebarFilter";
import styles from "../components/brand/brand.module.scss";
import ProductCard from "../components/productCard/ProductCard";
import Loader from "../components/loader/Loader";

const BrandPage = () => {
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState<number>(0);
  const productState = useSelector((state: RootState) => state.product);
  const dispatch: AppDispatch = useDispatch();
  const params = useParams();
  const brandId: string | undefined = params?.id;
  const brandProducts: TProduct[] = productState.brandProducts;
  const brand: TProductBrand = brandProducts[0]?.brand;
  const brandCategories: TProductCategory[] =
    brandProducts[0]?.brand?.categories;

  useEffect(() => {
    if (brandId) {
      dispatch(fetchProductsByBrand(brandId));
    }
  }, []);

  return !productState.isLoading ? (
    <div className="w-full">
      {/* Banner */}
      <BrandHeroSecton brand={brand} />
      {/* content start */}
      <div className="container mx-auto my-20 lg:w-10/12 w-11/12">
        <div className={styles.brandPageGrid}>
          <BrandSidebarFilter
            categories={brandCategories}
            brandProducts={brandProducts}
            selectedCategoryIndex={selectedCategoryIndex}
            setSelectedCategoryIndex={setSelectedCategoryIndex}
          />
          {brandProducts.filter(
            (product: TProduct) =>
              product.category._id ===
              brandCategories[selectedCategoryIndex]._id
          ).length ? (
            <div className={styles.brandProductsGrid}>
              {brandProducts
                .filter(
                  (product: TProduct) =>
                    product.category._id ===
                    brandCategories[selectedCategoryIndex]._id
                )
                .map((product: TProduct) => {
                  return <ProductCard key={product._id} product={product} />;
                })}
            </div>
          ) : (
            <div className="mx-auto">No products found</div>
          )}
          {/* <Filters brandCategories={brandProducts} /> */}
        </div>
      </div>
    </div>
  ) : (
    <Loader />
  );
};

export default BrandPage;
