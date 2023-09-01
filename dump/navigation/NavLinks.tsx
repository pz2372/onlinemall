import React, { useState } from "react";

import NavDropdowns from "./NavDropdown";


const NavLinks = () => {
  const [heading, setHeading] = useState("");
  const [subHeading, setSubHeading] = useState("");
  return (
    <>
      {NavDropdowns.map((NavDropdowns) => (
        <div key={NavDropdowns.name}>
          <div className="px-3 text-left md:cursor-pointer group">
            <h1
              className="py-7 flex justify-between items-center md:pr-0 pr-5 group"
              onClick={() => {
                heading !== NavDropdowns.name
                  ? setHeading(NavDropdowns.name)
                  : setHeading("");
                setSubHeading("");
              }}
            >
              {NavDropdowns.name}
              {/*<span className="text-xl md:hidden inline">
                <IonIcon
                  name={`${
                    heading === NavDropdowns.name ? "chevron-up" : "chevron-down"
                  }`}
                ></IonIcon>
              </span>
              <span className="text-xl md:mt-1 md:ml-2  md:block hidden group-hover:rotate-180 group-hover:-mt-2">
                <IonIcon name="chevron-down"></IonIcon>
                </span>*/}
            </h1>

            {NavDropdowns.submenu && (
              <div>
                <div className="absolute top-20 hidden group-hover:md:block hover:md:block z-10">
                  <div className="py-3">
                    <div
                      className="w-4 h-4 left-3 absolute 
                    mt-1 bg-white rotate-45"
                    ></div>
                  </div>
                  <div className="bg-white p-5 grid grid-cols-3 gap-10">
                    {NavDropdowns.sublinks.map((mysublinks) => (
                      <div key={mysublinks.name}>
                        
                        <li key={mysublinks.name}>
                          <Link
                            to={mysublinks.link}
                            className="hover:text-primary"
                          >
                            {mysublinks.name}
                          </Link>
                        </li>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Mobile menus */}
          <div
            className={`
            ${heading === NavDropdowns.name ? "md:hidden" : "hidden"}
          `}
          >
            {/* sublinks */}
            {NavDropdowns.sublinks.map((slinks) => (
              <div key={slinks.name}>
                <div>
                  <h1
                    onClick={() =>
                      subHeading !== slinks.name
                        ? setSubHeading(slinks.name)
                        : setSubHeading("")
                    }
                    className="py-4 pl-7 font-semibold md:pr-0 pr-5 flex justify-between items-center md:pr-0 pr-5"
                  >
                    {slinks.name}

                    {/*<span className="text-xl md:mt-1 md:ml-2 inline">
                      <IonIcon
                        name={`${
                          subHeading === slinks.Head
                            ? "chevron-up"
                            : "chevron-down"
                        }`}
                      ></IonIcon>
                      </span>*/}
                  </h1>
                  <div
                    className={`${
                      subHeading === slinks.name ? "md:hidden" : "hidden"
                    }`}
                  >
                    <li
                      key={NavDropdowns.name + " " + slinks.name}
                      className="py-3 pl-14"
                    >
                      <Link to={slinks.link}>{slinks.name}</Link>
                    </li>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default NavLinks;
