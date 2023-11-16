import { useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import MenuDropdown from "./dropdowns/MenuDropdown";
import Sidebar from "../Sidebar";
import { useState } from "react";
import logo from "../../assets/logo.png";
import styles from "./Navbar.module.scss";
import SearchIcon from "../svgs/SearchIcon";
import UserAccountDropdown from "./dropdowns/UserAccountDropdown";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCategories } from "../../redux/slice/CategorySlice";
import HamburgerIcon from "../svgs/HamburgerIcon";
import BagIcon from "../svgs/BagIcon";
import HeartIcon from "../svgs/HeartIcon";
import LoginIcon from "../svgs/LoginIcon";
import { fetchAllSizes } from "../../redux/slice/SizeSlice";
import { fetchAllColors } from "../../redux/slice/ColorSlice";
import Badge from "../badge/Badge";
import { fetchAllBrands } from "../../redux/slice/BrandSlice";
import Button from "../button/Button";

const Navbar: React.FC = () => {
  const { menCategories, womenCategories } = useSelector(
    (state: RootState) => state.category
  );
  const { userInfo } = useSelector((state: RootState) => state.user);
  const { productsInCart, favorites } = useSelector(
    (state: RootState) => state.product
  );

  const dispatch: AppDispatch = useDispatch();

  const location = useLocation();
  const navigate = useNavigate();
  // sidebar show and toggle
  const [showSidebar, setShowSidebar] = useState(false);

  const [selectedMenu, setSelectedMenu] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      if (document.querySelector("nav")) {
        if (window.scrollY > 100) {
          document.querySelector("nav")!.style.position = "fixed";
        } else {
          document.querySelector("nav")!.style.position = "relative";
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
    dispatch(fetchAllBrands());
    dispatch(fetchAllColors());
    dispatch(fetchAllSizes());
  }, []);

  useEffect(() => {
    switch (location.pathname) {
      case "/":
        setSelectedMenu("");
        break;
      case "/men":
        setSelectedMenu("men");
        break;
      case "/women":
        setSelectedMenu("women");
        break;
      case "/trending":
        setSelectedMenu("trending");
        break;
      case "/brands":
        setSelectedMenu("brands");
        break;
      default:
        setSelectedMenu("");
    }
  }, [location.pathname]);

  return (
    // Navbar Start
    <nav
      className={`bg-white relative top-0 left-0 w-full ${styles.navbar} z-40 h-[96px]`}
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
              className={`h-full relative xl:block hidden ml-14 ${styles.mainMenu}`}
            >
              <ul className="h-full flex items-center justify-center gap-8 text-themeBlack">
                {/* <li
                  className="h-full flex items-center justify-center"
                  onClick={() => navigate("/")}
                >
                  <span className={`${styles.menuItem}`}>Home</span>
                </li> */}

                {/* <li
                  className={`h-full flex items-center justify-center ${
                    selectedMenu === "women" ? styles.active : ""
                  }`}
                  onClick={() => navigate("/women?cat=tops")}
                >
                  <span className={`${styles.menuItem}`}>Women</span>
                </li> */}

                {/* <Button
                  onClick={() => navigate("/women?cat=tops")}
                  variant="friday-btn"
                >
                  Black Friday
                </Button> */}

                {/* <li
                  className={`h-full flex items-center justify-center ${
                    selectedMenu === "men" ? styles.active : ""
                  }`}
                  onClick={() => navigate("/men?cat=t-shirts")}
                >
                  <span className={`${styles.menuItem}`}>Men</span>
                </li> */}

                {/* <li
                  className={`h-full flex items-center justify-center ${
                    selectedMenu === "trending" ? styles.active : ""
                  }`}
                  onClick={() => navigate("/trending")}
                >
                  <span className={`${styles.menuItem}`}>Christmas Sales</span>
                </li> */}

                {/* <li
                  className={`h-full flex items-center justify-center ${
                    selectedMenu === "brands" ? styles.active : ""
                  }`}
                  onClick={() => navigate("/brands")}
                >
                  <span className={`${styles.menuItem}`}>Brands</span>
                </li> */}
              </ul>
            </div>
          </div>

          {/* right */}
          <div
            className={`flex justify-end items-center ml-3 gap-6 ${styles.navbarRight}`}
          >
            {/* <div
              className={`${styles.searchContainer} relative shadow-xl py-2 pl-4 pr-10 rounded-3xl md:block hidden`}
            >
              <input
                type="text"
                className="bg-white w-[330px]"
                placeholder="Search product, category or brand"
              />
              <div className="absolute top-1 right-2">
                <SearchIcon width="30px" height="30px" fill="#000000" />
              </div>
            </div> */}
            <div
              className="relative cursor-pointer"
              title="Favorites"
              onClick={() => navigate("/favorites")}
            >
              {favorites.length > 0 ? (
                <Badge quantity={favorites.length} />
              ) : null}
              <HeartIcon width="30px" height="30px" fill="#000000" />
            </div>
            <div
              className="relative cursor-pointer"
              title="Card"
              onClick={() => navigate("/card")}
            >
              {productsInCart.length > 0 ? (
                <Badge quantity={productsInCart.length} />
              ) : null}
              <BagIcon width="30px" height="30px" fill="#000000" />
            </div>
            <div>
              {userInfo ? (
                <UserAccountDropdown />
              ) : (
                <div
                  className="cursor-pointer"
                  title="Login / Register"
                  onClick={() => navigate("/login")}
                >
                  <LoginIcon width="30px" height="30px" fill="#000000" />
                </div>
              )}
            </div>
            {/* hamburger menu */}
            <div
              className="xl:hidden block cursor-pointer"
              onClick={() => setShowSidebar(true)}
            >
              <HamburgerIcon width="50px" height="50px" fill="#000000" />
            </div>
          </div>
        </div>
      </div>
      {selectedMenu === "men" || selectedMenu === "women" ? (
        <MenuDropdown
          categories={selectedMenu === "men" ? menCategories : womenCategories}
        />
      ) : null}
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
