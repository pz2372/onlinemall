import { MouseEventHandler } from "react";

export type TButtonProps = {
  variant: string;
  children?: React.ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};
