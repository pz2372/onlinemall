import React from "react";
import styles from "./Button.module.scss";
import { TButtonProps } from "../../types/props.type";

const Button: React.FC<TButtonProps> = ({
  variant,
  children,
  onClick,
  ...attributes
}) => {
  return (
    <button
      className={`flex items-center gap-2 ${styles[variant]}`}
      onClick={onClick}
      {...attributes}
    >
      {children}
    </button>
  );
};

export default Button;
