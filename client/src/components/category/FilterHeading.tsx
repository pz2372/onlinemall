import React from "react";
import Breadcrumb from "../breadcrumb/Breadcrumb";

const FilterHeading = ({ category, options }: any) => {
  const optionValues = options.map((o: any) => o.option);
  const breadcrumbs = category.category
    ? [`${category.gender} ${category.category}`]
    : [category.gender];

  return (
    <div className="w-full flex items-center justify-between">
      <Breadcrumb path={breadcrumbs} />

      <div className="flex items-center gap-3">
        <p className="text-categoryText md:text-base text-sm">Sort By:</p>
        <div className="py-2 md:px-4 px-2 border border-dashboardBorder rounded-lg cursor-pointer">
          <select className="bg-transparent w-full text-categoryText md:text-base text-sm outline-none">
            {optionValues.map((o: any) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterHeading;
