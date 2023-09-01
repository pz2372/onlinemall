import { NavLink } from "react-router-dom";
import Button from "../Button";
import Dropdown from "./Dropdown";
import Sidebar from "../Sidebar";
import { useState } from "react";
import logo from "../../assets/logo.png"

interface NavbarProps {
  homepage: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ homepage }) => {
  // sidebar show and toggle
  const [showSidebar, setShowSidebar] = useState(false);

  const sidebarOpen = () => {
    setShowSidebar(true);
  };

  return (
    // Navbar Start
    <div
      className={`${
        homepage === true ? "bg-transparent" : "bg-navBG"
      } absolute top-0 left-0 w-full md:h-24 h-20 flex items-center justify-center navbar z-40`}
    >
      {/* Container Start */}
      <div className="container mx-auto lg:w-10/12 w-11/12 h-full">
        <div className="w-full flex items-center justify-between h-full">
          {/* Left */}
          <div>
            <NavLink to="/">
              <img src={logo} style={{height: "80px"}}/>
            </NavLink>
          </div>

          {/* middle */}
          <div className="h-full relative md:block hidden">
            <ul className="h-full flex items-center justify-center gap-12 text-themeBlack">
              <li className="h-full flex items-center justify-center">
                <NavLink to="/">Home</NavLink>
              </li>

              <li className="h-full flex items-center justify-center men">
                <NavLink to="">Men</NavLink>

                {/* Mens Dropdown */}
                <Dropdown gender={"men"} />
              </li>

              <li className="h-full flex items-center justify-center women">
                <NavLink to="">Women</NavLink>

                {/* Womens dropdown */}
                <Dropdown gender={"women"} />
              </li>
            </ul>
          </div>

          {/* right */}
          <div className="flex justify-end items-center gap-6">
            {/* Calling Button Component */}
            <Button text="Get Started" bgColorCode="#DE3435" />
            {/* hamburger menu */}
            <div className="md:hidden block" onClick={sidebarOpen}>
              <i className="fa-solid fa-bars-staggered text-2xl cursor-pointer"></i>
            </div>
          </div>
        </div>
      </div>
      {/* Container end */}

      {/* Black overlay */}
      {showSidebar == true ? (
        <div
          className="h-screen w-full bg-black bg-opacity-60 fixed inset-0"
          onClick={() => setShowSidebar(false)}
        ></div>
      ) : null}

      {/* Sidebar */}
      <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
    </div>
    // Navbar Start
  );
};

export default Navbar;
