import React, { useState } from "react";
import CheckMarkIcon from "../svgs/CheckMarkIcon";
import MinusIcon from "../svgs/MinusIcon";
import PlusIcon from "../svgs/PlusIcon";
import { TProductCategory } from "../../types/products.type";
import { TCategoryFilterProps } from "../../types/props.type";

const CategoryFilter = ({
  menCategories,
  setMenCategories,
  womenCategories,
  setWomenCategories,
}: TCategoryFilterProps) => {
  const [toggleCategory, setToggleCategory] = useState(false);

  const handleMenCategoryChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    if (menCategories) {
      setMenCategories(
        menCategories.map((item: TProductCategory) =>
          item._id === id ? { ...item, checked: e.target.checked } : item
        )
      );
    }
  };

  const handleWomenCategoryChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    if (womenCategories) {
      setWomenCategories(
        womenCategories.map((item: TProductCategory) =>
          item._id === id ? { ...item, checked: e.target.checked } : item
        )
      );
    }
  };

  return (
    <div className={`bg-[#f5f4f2]`}>
      <div
        className="flex items-center justify-between p-3 cursor-pointer"
        onClick={() => setToggleCategory(!toggleCategory)}
      >
        <span>Category</span>
        {toggleCategory ? (
          <MinusIcon width="20px" height="20px" fill="#000000" />
        ) : (
          <PlusIcon width="20px" height="20px" fill="#000000" />
        )}
      </div>
      {toggleCategory ? (
        <div className={`px-3`}>
          <div className="font-bold text-sm mt-4">Men</div>
          <div>
            {menCategories?.map((categ: TProductCategory) => {
              return (
                <div className="flex items-center" key={categ._id}>
                  <label
                    className="relative flex cursor-pointer items-center rounded-full p-3"
                    htmlFor={categ._id}
                    data-ripple-dark="true"
                  >
                    <input
                      id={categ._id}
                      type="checkbox"
                      className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-black transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-primary checked:bg-primary checked:before:bg-primary hover:before:opacity-10"
                      checked={categ.checked}
                      onChange={(e) => handleMenCategoryChange(e, categ._id)}
                    />
                    <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                      <CheckMarkIcon />
                    </div>
                  </label>
                  <label
                    className="mt-px cursor-pointer select-none font-light text-gray-700"
                    htmlFor={categ._id}
                  >
                    {categ.name}
                  </label>
                </div>
              );
            })}
          </div>
          <div className="font-bold text-sm mt-4">Women</div>
          <div>
            {womenCategories?.map((categ: TProductCategory) => {
              return (
                <div className="flex items-center" key={categ._id}>
                  <label
                    className="relative flex cursor-pointer items-center rounded-full p-3"
                    htmlFor={categ._id}
                    data-ripple-dark="true"
                  >
                    <input
                      id={categ._id}
                      type="checkbox"
                      className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-black transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-primary checked:bg-primary checked:before:bg-primary hover:before:opacity-10"
                      checked={categ.checked}
                      onChange={(e) => handleWomenCategoryChange(e, categ._id)}
                    />
                    <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                      <CheckMarkIcon />
                    </div>
                  </label>
                  <label
                    className="mt-px cursor-pointer select-none font-light text-gray-700"
                    htmlFor={categ._id}
                  >
                    {categ.name}
                  </label>
                </div>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default CategoryFilter;
