import { TUser } from "./users.type";

export type TProductColor = {
  _id: string;
  name: string;
  hex: string;
  checked?: boolean;
  createdAt: string;
  deletedAt: string;
  modifiedAt: string;
};

export type TProductSize = {
  _id: string;
  name: string;
  checked?: boolean;
  createdAt: string;
  deletedAt: string;
  modifiedAt: string;
};

export type TProductSort = {
  price?: string;
};

export type TProductCategory = {
  _id: string;
  name: string;
  path: string;
  key: string;
  description: string;
  checked?: boolean;
  createdAt: string;
  deletedAt: string;
  modifiedAt: string;
};

export type TProductBrand = {
  _id: string;
  name: string;
  logo: string;
  description: string;
  website: string;
  categories: TProductCategory[];
  createdAt: string;
  deletedAt: string;
  modifiedAt: string;
};

export type TProduct = {
  _id: string;
  name: string;
  SKU: string;
  price: number;
  description: string;
  brand: TProductBrand;
  category: TProductCategory;
  images: string[];
  colors: TProductColor[];
  sizes: TProductSize[];
  reviews: TProductReview[];
  ratings: TProductRating[];
  createdAt: string;
  deletedAt: string;
  modifiedAt: string;
};

export type TProductReview = {
  _id: string;
  user: TUser;
  text: string;
  createdAt: string;
};

export type TProductRating = {
  _id: string;
  user: TUser;
  rate: number;
};
