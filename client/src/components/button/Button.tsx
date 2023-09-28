import React from "react";
import styles from "./Button.module.scss";
import { TButtonProps } from "../../types/props.type";

const Button: React.FC<TButtonProps> = ({
  classNames,
  variant,
  children,
  onClick,
  disabled,
  ...attributes
}) => {
  return (
    <button
      className={`flex items-center justify-center gap-2 ${styles[variant]} ${classNames}`}
      onClick={onClick}
      disabled={disabled}
      {...attributes}
    >
      {children}
    </button>
  );
};

export default Button;
