import React, { useState } from "react";
import { Link, Router, RouterProps } from "react-router-dom";
import Plus from "../../assets/Plus.png";
import NavButton from "./NavButton";
import NavLinks from "./NavLinks";
import { IonIcon } from "@ionic/react";
import { useSelector, useDispatch } from "react-redux";
import { mobile, desktop, switchButton } from "../../reducers/MobileSlice";

const Navbar = () => {
  const isMobile = useSelector(
    (state: { isMobile: boolean }) => state.isMobile
  );
  const dispatch = useDispatch();

  return (
    <nav className="bg-white">
      <div className="flex items-center font-medium justify-around">
        <div className="z-50 p-5 md:w-auto w-full flex justify-between">
          <img src={Plus} alt="logo" className="md:cursor-pointer h-9" />
          <div
            className="text-3xl md:hidden"
            onClick={() => dispatch(switchButton)}
          >
            <IonIcon
              icon={`${isMobile ? "close-outline" : "menu-outline"}`}
            ></IonIcon>
          </div>
        </div>
        <ul className="md:flex hidden uppercase items-center gap-8 font-[Poppins]">
          <li>
            <Link to="/" className="py-7 px-3 inline-block">
              Home
            </Link>
          </li>
          <NavLinks />
        </ul>

        <div className="md:block hidden">
          <NavButton />
        </div>

        {/* Mobile nav */}
        <ul
          className={`
        md:hidden bg-white fixed w-full top-0 overflow-y-auto bottom-0 py-24 pl-4
        duration-500 z-10 ${isMobile ? "left-0" : "left-[-100%]"}
        `}
        >
          <li>
            <Link to="/" className="py-7 px-3 inline-block">
              Home
            </Link>
          </li>
          <NavLinks />
          <div className="py-5">
            <NavButton />
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
