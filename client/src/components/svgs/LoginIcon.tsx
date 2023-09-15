import React from "react";
import { TIcon } from "../../types/icons.type";

const LoginIcon = ({ width, height, fill }: TIcon) => {
  return (
    <svg
      height={height}
      width={width}
      version="1.1"
      id="_x32_"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      fill={fill}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0" />

      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <g id="SVGRepo_iconCarrier">
        <g>
          <path
            className="st0"
            d="M155.81,0v173.889h33.417V33.417h235.592l-74.87,50.656c-8.469,5.727-13.535,15.289-13.535,25.503v286.24 H189.227V282.079H155.81v147.154h180.604v70.93c0,4.382,2.423,8.404,6.29,10.451c3.867,2.056,8.558,1.811,12.189-0.644 l119.318-80.736V0H155.81z"
          />
          <path
            className="st0"
            d="M228.657,290.4c0,1.844,1.068,3.524,2.75,4.3c1.664,0.775,3.638,0.514,5.042-0.685l78.044-66.035 l-78.044-66.034c-1.404-1.2-3.378-1.46-5.042-0.686c-1.681,0.775-2.75,2.456-2.75,4.3v33.392H37.79v58.064h190.868V290.4z"
          />
        </g>
      </g>
    </svg>
  );
};

export default LoginIcon;