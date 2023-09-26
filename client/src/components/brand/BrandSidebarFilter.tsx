import React from "react";
import { TBrandSidebarFilterProps } from "../../types/props.type";
import { TProduct, TProductCategory } from "../../types/products.type";
import styles from "../../components/brand/brand.module.scss";

const BrandSidebarFilter = ({
  categories,
  brandProducts,
  selectedCategoryIndex,
  setSelectedCategoryIndex,
}: TBrandSidebarFilterProps) => {
  return (
    <div className={`${styles.brandSidebarFilter}`}>
      {categories?.length &&
        categories.map((category: TProductCategory, index: number) => {
          return brandProducts.filter(
            (product: TProduct) =>
              product.category._id === categories[index]._id
          ).length > 0 ? (
            <div
              key={category._id}
              className={`${
                styles.category
              } p-3 cursor-pointer hover:bg-dropdownHoverBG duration-100 ${
                selectedCategoryIndex === index ? styles.active : null
              }`}
              onClick={() => setSelectedCategoryIndex(index)}
            >
              <span className="mr-2">{category.name}</span>
              <sub className="capitalize">{`(${category.path
                .split("/")[0]
                .toLowerCase()})`}</sub>
              <span className="ml-5 inline-flex items-center rounded-full bg-primary px-2 py-1 text-xs font-medium text-white ring-1 ring-inset ring-gray-500/10">
                {
                  brandProducts.filter(
                    (product: TProduct) =>
                      product.category._id === categories[index]._id
                  ).length
                }
              </span>
            </div>
          ) : null;
        })}
    </div>
  );
};

export default BrandSidebarFilter;
