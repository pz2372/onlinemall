import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "../button/Button";
import MenuDropdown from "./dropdowns/MenuDropdown";
import Sidebar from "../Sidebar";
import { useState } from "react";
import logo from "../../assets/logo.png";
import styles from "./Navbar.module.scss";
import { useOutsideClick } from "../../hooks/useOutsideClick ";
import SearchIcon from "../svgs/SearchIcon";
import ShoppingCartIcon from "../svgs/ShoppingCartIcon";
import UserAccountDropdown from "./dropdowns/UserAccountDropdown";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCategories } from "../../redux/slice/CategorySlice";
import HamburgerIcon from "../svgs/HamburgerIcon";

const Navbar: React.FC = () => {
  const { categories } = useSelector((state: RootState) => state.category);
  const dispatch: AppDispatch = useDispatch();

  const navigate = useNavigate();
  // sidebar show and toggle
  const [showSidebar, setShowSidebar] = useState(false);
  const [showMenDropdown, setShowMenDropdown] = useState(false);
  const [showWomenDropdown, setShowWomenDropdown] = useState(false);

  const [menCategories, setMenCategories] = useState([]);
  const [womenCategories, setWomenCategories] = useState([]);

  const menRef = useOutsideClick(() => {
    setShowMenDropdown(false);
  });

  const womenRef = useOutsideClick(() => {
    setShowWomenDropdown(false);
  });

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

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, []);

  useEffect(() => {
    if (categories.length) {
      const menCat: any = [];
      const womenCat: any = [];
      categories.forEach((category: any) => {
        if (category.path.startsWith("MEN") && category.path !== "MEN") {
          menCat.push(category);
          setMenCategories(menCat);
        } else if (
          category.path.startsWith("WOMEN") &&
          category.path !== "WOMEN"
        ) {
          womenCat.push(category);
          setWomenCategories(womenCat);
        }
      });
    }
  }, [categories]);

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
              className={`h-full relative md:block hidden ml-14 ${styles.mainMenu}`}
            >
              <ul className="h-full flex items-center justify-center gap-8 text-themeBlack">
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

                  {showMenDropdown ? (
                    <MenuDropdown categories={menCategories} />
                  ) : null}
                </li>

                <li
                  ref={womenRef}
                  className={`h-full flex items-center justify-center ${
                    showWomenDropdown ? styles.active : ""
                  }`}
                  onClick={() => setShowWomenDropdown(!showWomenDropdown)}
                >
                  <span className={`${styles.menuItem}`}>Women</span>

                  {showWomenDropdown ? (
                    <MenuDropdown categories={womenCategories} />
                  ) : null}
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
            className={`flex justify-end items-center ml-3 gap-6 ${styles.navbarRight}`}
          >
            <div className={styles.search}>
              <SearchIcon width="30px" height="30px" fill="#000000" />
            </div>
            <UserAccountDropdown />
            <div className={styles.shoppingCart}>
              <ShoppingCartIcon width="30px" height="30px" fill="#000000" />
            </div>
            {/* Calling Button Component */}
            {/* <Button
              text="Get Started"
              bgColorCode="#3f3f3f27"
              onClick={() => navigate("/register")}
            /> */}
            {/* hamburger menu */}
            <div
              className="md:hidden block cursor-pointer"
              onClick={() => setShowSidebar(true)}
            >
              <HamburgerIcon width="50px" height="50px" fill="#000000" />
            </div>
          </div>
        </div>
      </div>
      {/* Container end */}

      {/* Black overlay */}
      {showSidebar ? (
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
