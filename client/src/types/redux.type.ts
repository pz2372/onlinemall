import { TProductBrand } from "./products.type";
import { TUser } from "./users.type";

export type TQuickview = {
  show: boolean;
  productId: string | undefined;
};

export type TAddReview = {
  productId: string | undefined;
  user: string | undefined;
  ratingValue: number;
  reviewText: string;
};

export type TUserState = {
  isLoading: boolean;
  isError: boolean;
  userInfo: TUser | null;
};

export type TBrandState = {
  isLoading: boolean;
  isError: boolean;
  brands: TProductBrand[];
};

export type TQuery = {
  page: number;
  limit: number;
  categoryId?: string;
};
