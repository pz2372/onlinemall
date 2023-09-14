import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "../Button";
import Dropdown from "./Dropdown";
import Sidebar from "../Sidebar";
import { useState } from "react";
import logo from "../../assets/logo.png";
import styles from "./Navbar.module.scss";
import { useOutsideClick } from "../../hooks/useOutsideClick ";
import SearchIcon from "../svgs/SearchIcon";
import AvatarIcon from "../svgs/AvatarIcon";
import ShoppingCartIcon from "../svgs/ShoppingCartIcon";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  // sidebar show and toggle
  const [showSidebar, setShowSidebar] = useState(false);
  const [showMenDropdown, setShowMenDropdown] = useState(false);
  const [showWomenDropdown, setShowWomenDropdown] = useState(false);

  const menRef = useOutsideClick(() => {
    setShowMenDropdown(false);
  });

  const womenRef = useOutsideClick(() => {
    setShowWomenDropdown(false);
  });

  const sidebarOpen = () => {
    setShowSidebar(true);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (document.querySelector("nav")) {
        if (window.scrollY > 100) {
          document.querySelector("nav")!.style.position = "fixed";
        } else {
          document.querySelector("nav")!.style.position = "absolute";
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    // Navbar Start
    <nav
      className={`bg-white absolute top-0 left-0 w-full flex items-center justify-center ${styles.navbar} z-40 h-[96px]`}
    >
      {/* Container Start */}
      <div className="container mx-auto lg:w-10/12 w-11/12 h-full">
        <div className="w-full flex items-center justify-between h-full">
          {/* Left */}
          <div className="flex items-center h-full">
            <NavLink to="/">
              <img alt="app-logo" src={logo} style={{ height: "80px" }} />
            </NavLink>
            <div
              className={`h-full relative md:block hidden ml-20 ${styles.mainMenu}`}
            >
              <ul className="h-full flex items-center justify-center gap-12 text-themeBlack">
                <li
                  className="h-full flex items-center justify-center"
                  onClick={() => navigate("/")}
                >
                  <span className={`${styles.menuItem}`}>Home</span>
                </li>

                <li
                  ref={menRef}
                  className={`h-full flex items-center justify-center ${
                    showMenDropdown ? styles.active : ""
                  }`}
                  onClick={() => setShowMenDropdown(!showMenDropdown)}
                >
                  <span className={`${styles.menuItem}`}>Men</span>

                  {showMenDropdown ? <Dropdown gender={"men"} /> : null}
                </li>

                <li
                  ref={womenRef}
                  className={`h-full flex items-center justify-center ${
                    showWomenDropdown ? styles.active : ""
                  }`}
                  onClick={() => setShowWomenDropdown(!showWomenDropdown)}
                >
                  <span className={`${styles.menuItem}`}>Women</span>

                  {showWomenDropdown ? <Dropdown gender={"women"} /> : null}
                </li>

                <li
                  className="h-full flex items-center justify-center"
                  // onClick={() => navigate("/")}
                >
                  <span className={`${styles.menuItem}`}>Trending</span>
                </li>

                <li
                  className="h-full flex items-center justify-center"
                  // onClick={() => navigate("/")}
                >
                  <span className={`${styles.menuItem}`}>Brands</span>
                </li>
              </ul>
            </div>
          </div>

          {/* right */}
          <div
            className={`flex justify-end items-center gap-6 ${styles.getStarted}`}
          >
            <SearchIcon />
            <AvatarIcon />
            <ShoppingCartIcon />
            {/* Calling Button Component */}
            <Button
              text="Get Started"
              bgColorCode="#3f3f3f27"
              onClick={() => navigate("/register")}
            />
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
    </nav>
    // Navbar Start
  );
};

export default Navbar;
