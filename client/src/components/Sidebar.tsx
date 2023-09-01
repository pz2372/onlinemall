import { NavLink } from "react-router-dom";
import { useState } from "react";

interface SidebarProps {
  showSidebar: boolean;
  setShowSidebar: (show: boolean) => void;
}

const Sidebar = ({ showSidebar, setShowSidebar }: SidebarProps) => {
  // Mens Dropdown data
  const dropdownMan = [
    {
      id: 1,
      title: "men_t-shirts",
      image: "./images/dropdownMen/d-men-1.png",
    },
    {
      id: 2,
      title: "men_shortsleevebutton",
      image: "./images/dropdownMen/d-men-2.png",
    },
    {
      id: 3,
      title: "men_sweatshirt",
      image: "./images/dropdownMen/d-men-3.png",
    },
    {
      id: 4,
      title: "men_lognsleevebutton",
      image: "./images/dropdownMen/d-men-4.png",
    },
    {
      id: 5,
      title: "men_jackets",
      image: "./images/dropdownMen/d-men-5.png",
    },
    {
      id: 6,
      title: "men_shorts",
      image: "./images/dropdownMen/d-men-6.png",
    },
    {
      id: 7,
      title: "men_jeans",
      image: "./images/dropdownMen/d-men-7.png",
    },
    {
      id: 8,
      title: "men_pants",
      image: "./images/dropdownMen/d-men-8.png",
    },
  ];

  //   Womens Dropdown Data
  const dropdownWomen = [
    {
      id: 1,
      title: "men_t-women_t-shirts",
      image: "./images/dropdownWomen/icon1.png",
    },
    {
      id: 2,
      title: "women_croptops",
      image: "./images/dropdownWomen/icon2.png",
    },
    {
      id: 3,
      title: "women_sweatshirt",
      image: "./images/dropdownWomen/icon3.png",
    },
    {
      id: 4,
      title: "women_lognsleeve",
      image: "./images/dropdownWomen/icon4.png",
    },
    {
      id: 5,
      title: "women_jackets",
      image: "./images/dropdownWomen/icon5.png",
    },
    {
      id: 6,
      title: "women_shorts",
      image: "./images/dropdownWomen/icon6.png",
    },
    {
      id: 7,
      title: "women_jeans",
      image: "./images/dropdownWomen/icon7.png",
    },
    {
      id: 8,
      title: "women_pants",
      image: "./images/dropdownWomen/icon8.png",
    },
    {
      id: 9,
      title: "women_dresses",
      image: "./images/dropdownWomen/icon9.png",
    },
    {
      id: 10,
      title: "women_skirts",
      image: "./images/dropdownWomen/icon10.png",
    },
    {
      id: 11,
      title: "women_bras",
      image: "./images/dropdownWomen/icon11.png",
    },
    {
      id: 12,
      title: "women_sportbras",
      image: "./images/dropdownWomen/icon12.png",
    },
  ];

  // states
  const [showMenItem, setShowMenItem] = useState(false);
  const [showWomen, setShowWomen] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(false);
  };

  return (
    <div>
      <div
        className={`h-[100svh] w-[65%] bg-themeOrange fixed top-0 z-50 overflow-y-auto md:hidden block duration-500 ${
          showSidebar === true ? "right-0" : "-right-full"
        }`}
      >
        <div className="w-full h-full flex pt-20 flex-col gap-10 px-8 pb-4 relative">
          <div>
            <NavLink to="/" className="text-white">
              Home
            </NavLink>
          </div>

          <div className=" w-full">
            <div
              className="flex items-center justify-between"
              onClick={() => setShowMenItem(!showMenItem)}
            >
              <p className="text-white">Men</p>
              <i
                className={`fa-solid fa-chevron-down text-white ${
                  showMenItem === true ? "rotate-180" : "rotate-0"
                } duration-300`}
              ></i>
            </div>
            {/* Dropdown */}
            {showMenItem === true ? (
              <div className="mt-4">
                <ul>
                  {dropdownMan?.map((item) => {
                    const { id, image, title } = item;

                    return (
                      <div key={id} className="flex items-center gap-1">
                        <p className="flex items-center gap-2 py-2 bg-transparent rounded-lg cursor-pointer">
                          <img src={image} alt={title} />
                          <p className="text-white text-sm">{title}</p>
                        </p>
                      </div>
                    );
                  })}
                </ul>
              </div>
            ) : null}
          </div>

          <div className=" w-full">
            <div
              className="flex items-center justify-between"
              onClick={() => setShowWomen(!showWomen)}
            >
              <p className="text-white">Women</p>
              <i
                className={`fa-solid fa-chevron-down text-white ${
                  showWomen === true ? "rotate-180" : "rotate-0"
                } duration-300`}
              ></i>
            </div>

            {showWomen === true ? (
              <div className="mt-4">
                <ul>
                  {dropdownWomen?.map((item) => {
                    const { id, image, title } = item;

                    return (
                      <div key={id} className="flex items-center gap-1">
                        <p className="flex items-center gap-2 py-2 bg-transparent rounded-lg cursor-pointer">
                          <img src={image} alt={title} />
                          <p className="text-white text-sm">{title}</p>
                        </p>
                      </div>
                    );
                  })}
                </ul>
              </div>
            ) : null}
          </div>

          {/* Close Sidbar */}
          <div className="absolute right-4 top-4" onClick={toggleSidebar}>
            <i className="fa-solid fa-x text-xl text-white"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
