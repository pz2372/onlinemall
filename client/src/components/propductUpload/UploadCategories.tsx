import React, { useRef, useState, useEffect } from "react";
import DropdownCard from "./DropdownCard";
import NavDropdowns from "../navigation/NavDropdowns"
import { Method } from "@testing-library/react";

const UploadCategories = (props: any) => {
  const [selectedId, setSelectedId] = useState<any>(null);

  //Allows only one category to be chosen at one time
  const handleClick = (id: any) => {
    setSelectedId(id);
    props.onChange(id)
  };

  return (
    <div className="w-full flex items-start justify-between md:flex-row flex-col gap-4 pb-14 border-b border-b-dashboardBorder">
      {/* Mens Dropdown */}
      <DropdownCard key="mens-dropdown" heading="Man" data={NavDropdowns[0].sublinks} onClick={handleClick} selectedId={selectedId}/>

      {/* Womens Dropdown */}
      <DropdownCard key="womens-dropdown" heading="Women" data={NavDropdowns[1].sublinks} onClick={handleClick} selectedId={selectedId}/>
    </div>
  );
}; 

export default UploadCategories;
