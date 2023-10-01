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
