import React, { useRef, useState, useEffect } from "react";

const BrandDropdown = ({ onChange }: any) => {
  const [allBrands, setAllBrands] = useState<React.ReactElement<any>[]>([]);
  const [brand, setBrand] = useState("New Brand");

  useEffect(() => {
    fetch("./getAllBrands")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        var tempBrands = [];
        for(var i = 0; i < data.length; i++) {
          tempBrands[i] = <option value={data[i]}>{data[i]}</option>;
        }
        setAllBrands(tempBrands)
      })
      .catch((error) => {
        console.error("There was a problem getting brands", error);
      });
  });

  const handleBrand = (event: any) => {
    setBrand(event.target.value);
    onChange(false, brand);
  };

  const handleBrandInput = (event: any) => {
    onChange(true, event.target.value);
  };

  return (
    <div>
      <div className="w-6/12 flex items-center gap-4 justify-between">
        <div>
          <p className="text-categoryText md:text-base text-sm">Brand:</p>
        </div>

        {/* Dropdown */}
        <div className="w-full py-2 md:px-4 px-2 border border-dashboardBorder rounded-lg">
          <select
            className="bg-transparent outline-none border-none text-categoryText w-full cursor-pointer md:text-base text-sm"
            onChange={handleBrand}
          >
            <option value="New Brand">New Brand</option>
            {allBrands}
          </select>
        </div>
      </div>
      <br />
      {brand === "New Brand" ? (
        <div className="w-6/12 flex items-center gap-3">
          <p className="text-categoryText md:text-base text-sm">
            New Brand Name:
          </p>
          <input
            type="text"
            id="brandText"
            className="w-full bg-transparent outline-none border border-dashboardBorder rounded-lg px-4 py-2 md:text-base text-sm"
            onChange={handleBrandInput}
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default BrandDropdown;
