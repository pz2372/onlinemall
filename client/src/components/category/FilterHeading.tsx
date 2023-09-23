import React from "react";

const FilterHeading = ({ options }: any) => {
  const optionValues = options.map((o: any) => o.option);

  return (
    <div className="w-full flex items-center justify-end">
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
