import { NavLink } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Dropdown from "../navigation/Dropdown";
import AdminDropdown from "../AdminDropdown";

const DashboardNavbar = () => {
  const [dropdown, setDropdown] = useState(false);

  // Close Dropdown When Click outside
  const ref = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const closePopup = (e: MouseEvent) => {
      if (
        ref.current &&
        !ref.current.contains(e.target as Node) &&
        ref2.current &&
        !ref2.current.contains(e.target as Node)
      ) {
        setDropdown(false);
      }
    };
    document.addEventListener("click", closePopup);
    return () => {
      document.removeEventListener("click", closePopup);
    };
  }, []);

  return (
    // Navbar Start
    <div className="bg-navBG w-full h-24 flex items-center justify-center navbar">
      {/* Container Start */}
      <div className="container mx-auto lg:w-10/12 w-11/12 h-full">
        <div className="w-full flex items-center justify-between h-full">
          {/* Left */}
          <div>
            <NavLink to="/">
              <h1 className="text-black text-3xl font-semibold">LOGO</h1>
            </NavLink>
          </div>

          {/* middle */}
          <div className="h-full relative md:block hidden">
            <ul className="h-full flex items-center justify-center gap-12 text-themeBlack">
              <li className="h-full flex items-center justify-center">
                <NavLink to="/">Home</NavLink>
              </li>

              <li className="h-full flex items-center justify-center man">
                <NavLink to="/men">Men</NavLink>

                {/* Mens Dropdown */}
                <Dropdown gender={"men"}/>
              </li>

              <li className="h-full flex items-center justify-center women">
                <NavLink to="/women">Women</NavLink>

                {/* Womens dropdown */}
                <Dropdown gender={"women"}/>
              </li>
            </ul>
          </div>

          {/* right */}
          <div className="flex items-center gap-4 lg:gap-8" ref={ref}>
            {/* SVG Icon */}
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="24"
                viewBox="0 0 25 24"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M11.6996 1.25C8.30403 1.25 5.67685 4.22603 6.09802 7.59536L6.17737 8.23021C6.29349 9.15916 5.95416 10.0871 5.26615 10.7219C3.84047 12.0375 3.44438 14.1315 4.29103 15.8769L4.39438 16.09C5.14053 17.6282 6.65559 18.6356 8.34689 18.7409L8.53517 19.0636C9.54796 20.7998 11.126 21.75 12.783 21.75C14.44 21.75 16.018 20.7998 17.0308 19.0636L17.2221 18.7358C18.6428 18.6235 19.9381 17.8513 20.7107 16.6373C21.8928 14.7799 21.5797 12.3432 19.9664 10.845L19.9225 10.8042C19.184 10.1183 18.8204 9.11912 18.9454 8.11901L19.01 7.60208C19.4316 4.22918 16.8017 1.25 13.4025 1.25H11.6996ZM8.76878 17.25C8.7778 17.2498 8.78682 17.2498 8.79582 17.25H16.7702C16.7792 17.2498 16.7882 17.2498 16.7972 17.25H16.8619C17.9088 17.25 18.8831 16.7152 19.4452 15.832C20.2387 14.5852 20.0285 12.9497 18.9457 11.9441L18.9018 11.9033C17.8098 10.8892 17.2721 9.41174 17.457 7.93296L17.5216 7.41603C17.8313 4.93841 15.8994 2.75 13.4025 2.75H11.6996C9.20628 2.75 7.27717 4.93526 7.58643 7.40931L7.66579 8.04416C7.84195 9.45345 7.32716 10.8611 6.2834 11.8243C5.34364 12.6915 5.08255 14.0718 5.64063 15.2223L5.74399 15.4353C6.28235 16.5452 7.40751 17.25 8.64108 17.25H8.76878ZM12.783 20.25C11.8619 20.25 10.8791 19.7877 10.1197 18.75H15.4463C14.6869 19.7877 13.7041 20.25 12.783 20.25Z"
                  fill="#2D264B"
                />
              </svg>
            </div>

            {/* Avatar */}
            <div
              className="flex items-center gap-1 cursor-pointer relative"
              onClick={() => setDropdown(!dropdown)}
            >
              <img
                src="./images/avatar.png"
                alt="avatar"
                className="w-12 h-12"
              />

              <p className="ml-2 text-themeBlack md:text-base text-sm">Admin</p>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="24"
                viewBox="0 0 25 24"
                fill="none"
              >
                <path
                  d="M12.6 14.65C12.4833 14.65 12.371 14.6333 12.263 14.6C12.1543 14.5667 12.0583 14.5 11.975 14.4L7.45 9.89999C7.31667 9.74999 7.25 9.57499 7.25 9.37499C7.25 9.17499 7.325 8.99999 7.475 8.84999C7.625 8.71666 7.8 8.64999 8 8.64999C8.2 8.64999 8.375 8.71666 8.525 8.84999L12.6 12.925L16.7 8.84999C16.8333 8.69999 17 8.62899 17.2 8.63699C17.4 8.64566 17.575 8.71666 17.725 8.84999C17.875 8.99999 17.95 9.17899 17.95 9.38699C17.95 9.59566 17.875 9.76666 17.725 9.89999L13.225 14.4C13.1417 14.5 13.046 14.5667 12.938 14.6C12.8293 14.6333 12.7167 14.65 12.6 14.65Z"
                  fill="#1C1B1F"
                />
              </svg>

              {/* Dropdown will show if the state is true */}
              {dropdown === true ? <AdminDropdown ref2={ref2} /> : null}
            </div>
          </div>
        </div>
      </div>
      {/* Container end */}
    </div>
    // Navbar Start
  );
};

export default DashboardNavbar;
