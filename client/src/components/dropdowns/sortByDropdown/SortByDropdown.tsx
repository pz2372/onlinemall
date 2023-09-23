import React from "react";
import { TSortDropdownOption } from "../../../types/dropdowns.type";
import { TSortByDropdownProps } from "../../../types/props.type";

const SortByDropdown = ({ options, value, setValue }: TSortByDropdownProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value);
  };
  return (
    <div className="w-full flex items-center justify-end">
      <div className="flex items-center gap-3">
        <div className="py-2 md:px-4 px-2 border border-dashboardBorder rounded-lg cursor-pointer">
          <select
            className="bg-transparent w-full text-categoryText md:text-base text-sm outline-none"
            value={value}
            onChange={handleChange}
          >
            <option value="">No sorting</option>
            {options.map((option: TSortDropdownOption) => (
              <option key={option.id} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default SortByDropdown;
