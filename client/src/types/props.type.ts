import { MouseEventHandler } from "react";
import { TSortDropdownOption } from "./dropdowns.type";
import {
  TProduct,
  TProductBrand,
  TProductCategory,
  TProductColor,
  TProductSize,
} from "./products.type";

export type TMultiRangeSliderProps = {
  min: number;
  max: number;
  minRangeVal: number;
  maxRangeVal: number;
  setMinRangeVal: (num: number) => void;
  setMaxRangeVal: (num: number) => void;
};

export type TIconProps = {
  width: string;
  height: string;
  fill: string;
  hover?: string;
};

export type TButtonProps = {
  variant: string;
  children?: React.ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export type TBreadcrumbProps = {
  path: string[];
};

export type TSortByDropdownProps = {
  options: TSortDropdownOption[];
  value: string;
  setValue: (val: string) => void;
};

export type BrandWithProductsSliderProps = {
  product: TProduct[];
};

export type ProductCardProps = {
  product: TProduct;
};

export type TMenuDropdownProps = {
  categories: TProductCategory[];
};

export type TColorFilterProps = {
  colors: TProductColor[];
  setColors: (colors: TProductColor[]) => void;
};

export type TSizeFilterProps = {
  sizes: TProductSize[];
  setSizes: (sizes: TProductSize[]) => void;
};

export type TBadgeProps = {
  quantity: number;
};

export type TBrandHeroSectonProps = {
  brand: TProductBrand | undefined;
};

export type TBrandSidebarFilterProps = {
  menCategories: TProductCategory[] | undefined;
  setMenCategories: (categories: TProductCategory[]) => void;
  womenCategories: TProductCategory[] | undefined;
  setWomenCategories: (categories: TProductCategory[]) => void;
  selectedCategoryIndex: number;
  setSelectedCategoryIndex: (n: number) => void;
  colors: TProductColor[];
  setColors: (colors: TProductColor[]) => void;
  sizes: TProductSize[];
  setSizes: (sizes: TProductSize[]) => void;
  minRangeVal: number;
  maxRangeVal: number;
  setMinRangeVal: (num: number) => void;
  setMaxRangeVal: (num: number) => void;
};

export type TCategoryFilterProps = {
  menCategories: TProductCategory[] | undefined;
  setMenCategories: (categories: TProductCategory[]) => void;
  womenCategories: TProductCategory[] | undefined;
  setWomenCategories: (categories: TProductCategory[]) => void;
};
