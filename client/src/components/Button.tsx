import { Method } from "@testing-library/react";
import React, { MouseEventHandler } from "react";

interface ButtonProps {
  text: string;
  bgColorCode: string;
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const Button: React.FC<ButtonProps> = ({ text, bgColorCode, type, onClick }) => {
  return (
    <button
      style={{ backgroundColor: bgColorCode }}
      onClick={onClick}
      type={type}
      className={`md:px-7 md:py-3 py-3 px-5 md:text-base text-sm rounded-lg text-white font-medium`}
    >
      {text}
    </button>
  );
};

export default Button;
