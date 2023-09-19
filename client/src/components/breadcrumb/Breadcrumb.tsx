import React from "react";
import ChevronRightIcon from "../svgs/ChevronRightIcon";
import { useNavigate } from "react-router-dom";
import { TBreadcrumb } from "../../types/breadcrumbs.type";

const Breadcrumb = ({ path }: TBreadcrumb) => {
  const navigate = useNavigate();
  return (
    <ul className="flex items-center gap-2">
      <li
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <span className="capitalize font-bold">Home</span>
        <ChevronRightIcon width="15px" height="15px" fill="#FF6D2E" />
      </li>
      {path.map((p: string, index: number) => {
        return (
          <li key={index} className="flex items-center gap-2">
            <span
              className={`capitalize ${
                path.length - 1 !== index ? "font-bold" : ""
              }`}
            >
              {p}
            </span>
            {path.length - 1 !== index ? (
              <ChevronRightIcon width="15px" height="15px" fill="#FF6D2E" />
            ) : null}
          </li>
        );
      })}
    </ul>
  );
};

export default Breadcrumb;
