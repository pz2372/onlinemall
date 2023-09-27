/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { AppDispatch, RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByBrand } from "../redux/slice/ProductSlice";
import {
  TProduct,
  TProductBrand,
  TProductCategory,
  TProductColor,
  TProductSize,
} from "../types/products.type";
import BrandHeroSecton from "../components/brand/BrandHeroSecton";
import BrandSidebarFilter from "../components/brand/BrandSidebarFilter";
import styles from "../components/brand/brand.module.scss";
import ProductCard from "../components/productCard/ProductCard";
import Loader from "../components/loader/Loader";
import { fetchBrandById } from "../redux/slice/BrandSlice";
import { toast } from "react-toastify";

const BrandPage = () => {
  const { isLoading: isBrandFetching } = useSelector(
    (state: RootState) => state.brand
  );
  const { isLoading: isProductsFetching } = useSelector(
    (state: RootState) => state.product
  );
  const dispatch: AppDispatch = useDispatch();
  const params = useParams();
  const brandId: string | undefined = params?.id;

  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState<number>(0);
  const [products, setProducts] = useState<TProduct[]>();
  const [brand, setBrand] = useState<TProductBrand>();
  const [colors, setColors] = useState<TProductColor[]>([]);
  const [sizes, setSizes] = useState<TProductSize[]>([]);
  const [minRangeVal, setMinRangeVal] = useState<number>(0);
  const [maxRangeVal, setMaxRangeVal] = useState<number>(100);
  const [menCategories, setMenCategories] = useState<TProductCategory[]>([]);
  const [womenCategories, setWomenCategories] = useState<TProductCategory[]>(
    []
  );
  const [responseMessage, setResponseMessage] = useState<string>("");

  useEffect(() => {
    if (brandId) {
      dispatch(fetchBrandById(brandId))
        .then((res: any) => {
          if (res.payload.data?.success) {
            setBrand(res.payload.data.data);
            const menCat: any = [];
            const womenCat: any = [];
            res.payload.data.data?.categories.forEach(
              (category: TProductCategory) => {
                category.checked = false;
                if (
                  category.path.startsWith("MEN") &&
                  category.path !== "MEN"
                ) {
                  menCat.push(category);
                  setMenCategories(menCat);
                } else if (
                  category.path.startsWith("WOMEN") &&
                  category.path !== "WOMEN"
                ) {
                  womenCat.push(category);
                  setWomenCategories(womenCat);
                }
              }
            );
          }
        })
        .catch((err) => {
          toast.error(err.message, {
            autoClose: 2000,
          });
        });
    }
  }, []);

  useEffect(() => {
    if (brand && menCategories && womenCategories) {
      const categoryIds: string[] = [];
      menCategories.forEach((category: TProductCategory) => {
        if (category.checked) {
          categoryIds.push(category._id);
        }
      });
      womenCategories.forEach((category: TProductCategory) => {
        if (category.checked) {
          categoryIds.push(category._id);
        }
      });
      const colorIds = colors
        .filter((c: TProductColor) => c.checked)
        .map((c: TProductColor) => c._id);
      const sizeIds = sizes
        .filter((s: TProductSize) => s.checked)
        .map((s: TProductSize) => s._id);
      dispatch(
        fetchProductsByBrand({
          brandId,
          categoryIds,
          colorIds,
          sizeIds,
          minRangeVal,
          maxRangeVal,
        })
      )
        .then((res: any) => {
          if (res.payload.data?.success) {
            setProducts(res.payload.data.data);
          } else {
            setResponseMessage(res.payload.message || res.payload);
            setProducts([]);
          }
        })
        .catch((err) => {
          toast.error(err.message, {
            autoClose: 2000,
          });
        });
    }
  }, [
    brand,
    menCategories,
    womenCategories,
    sizes,
    colors,
    minRangeVal,
    maxRangeVal,
  ]);

  if (isBrandFetching) {
    return <Loader />;
  }

  return (
    <div className="w-full">
      <BrandHeroSecton brand={brand} />
      <div className="container mx-auto my-20 lg:w-10/12 w-11/12">
        <div className={styles.brandPageGrid}>
          <BrandSidebarFilter
            menCategories={menCategories}
            setMenCategories={setMenCategories}
            womenCategories={womenCategories}
            setWomenCategories={setWomenCategories}
            selectedCategoryIndex={selectedCategoryIndex}
            setSelectedCategoryIndex={setSelectedCategoryIndex}
            colors={colors}
            setColors={setColors}
            sizes={sizes}
            setSizes={setSizes}
            minRangeVal={minRangeVal}
            setMinRangeVal={setMinRangeVal}
            maxRangeVal={maxRangeVal}
            setMaxRangeVal={setMaxRangeVal}
          />
          {!isProductsFetching ? (
            <>
              {products?.length ? (
                <div className={styles.brandProductsGrid}>
                  {products.map((product: TProduct) => {
                    return <ProductCard key={product._id} product={product} />;
                  })}
                </div>
              ) : (
                <div className="mx-auto">{responseMessage}</div>
              )}
            </>
          ) : (
            <Loader />
          )}
        </div>
      </div>
    </div>
  );
};

export default BrandPage;
