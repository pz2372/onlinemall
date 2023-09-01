import { useState } from "react";

const ItemEye = () => {
  // hover effect
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="bg-white hover:bg-black duration-200 w-max p-[10px] flex items-center justify-center rounded-full cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
      >
        <mask
          id="mask0_100_414"
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="20"
          height="20"
        >
          <rect
            width="20"
            height="20"
            fill={`${isHovered ? "#fff" : "#D9D9D9"}`}
          />
        </mask>
        <g mask="url(#mask0_100_414)">
          <path
            d="M10.0019 12.9807C10.9462 12.9807 11.7481 12.6502 12.4079 11.9893C13.0676 11.3283 13.3974 10.5257 13.3974 9.58142C13.3974 8.63718 13.067 7.8352 12.406 7.17548C11.745 6.51576 10.9424 6.1859 9.99813 6.1859C9.05389 6.1859 8.25191 6.51638 7.59219 7.17735C6.93247 7.83834 6.6026 8.64096 6.6026 9.58521C6.6026 10.5294 6.93309 11.3314 7.59406 11.9911C8.25505 12.6509 9.05767 12.9807 10.0019 12.9807ZM10 11.8333C9.37502 11.8333 8.84377 11.6146 8.40627 11.1771C7.96877 10.7396 7.75002 10.2083 7.75002 9.58331C7.75002 8.95831 7.96877 8.42706 8.40627 7.98956C8.84377 7.55206 9.37502 7.33331 10 7.33331C10.625 7.33331 11.1563 7.55206 11.5938 7.98956C12.0313 8.42706 12.25 8.95831 12.25 9.58331C12.25 10.2083 12.0313 10.7396 11.5938 11.1771C11.1563 11.6146 10.625 11.8333 10 11.8333ZM10.0012 15.4166C8.08482 15.4166 6.33872 14.888 4.76285 13.8309C3.18701 12.7737 2.02676 11.3579 1.2821 9.58331C2.02676 7.80874 3.18663 6.39288 4.76173 5.33573C6.33681 4.27858 8.08253 3.75 9.99888 3.75C11.9152 3.75 13.6613 4.27858 15.2372 5.33573C16.813 6.39288 17.9733 7.80874 18.7179 9.58331C17.9733 11.3579 16.8134 12.7737 15.2383 13.8309C13.6632 14.888 11.9175 15.4166 10.0012 15.4166ZM10 14.1666C11.5695 14.1666 13.0104 13.7535 14.3229 12.9271C15.6354 12.1007 16.6389 10.9861 17.3334 9.58331C16.6389 8.18053 15.6354 7.06595 14.3229 6.23956C13.0104 5.41317 11.5695 4.99998 10 4.99998C8.43058 4.99998 6.9896 5.41317 5.6771 6.23956C4.3646 7.06595 3.36113 8.18053 2.66669 9.58331C3.36113 10.9861 4.3646 12.1007 5.6771 12.9271C6.9896 13.7535 8.43058 14.1666 10 14.1666Z"
            fill={` ${isHovered ? "#fff" : "#3D424D"}`}
          />
        </g>
      </svg>
    </div>
  );
};

export default ItemEye;