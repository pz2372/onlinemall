import React, { useState, useEffect } from "react";
import CheckMarkIcon from "../svgs/CheckMarkIcon";
import MinusIcon from "../svgs/MinusIcon";
import PlusIcon from "../svgs/PlusIcon";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const CategoryFilter = () => {
  const categoryState = useSelector((state: RootState) => state.category);

  const [menCategories, setMenCategories] = useState<any>([]);
  const [womenCategories, setWomenCategories] = useState<any>([]);
  const [toggleCategory, setToggleCategory] = useState(false);

  const handleMenCategoryChange = (e: any, id: string) => {
    setMenCategories(
      menCategories.map((item: any) =>
        item._id === id ? { ...item, checked: e.target.checked } : item
      )
    );
  };

  const handleWomenCategoryChange = (e: any, id: string) => {
    setWomenCategories(
      womenCategories.map((item: any) =>
        item._id === id ? { ...item, checked: e.target.checked } : item
      )
    );
  };

  useEffect(() => {
    if (categoryState.categories?.length) {
      setMenCategories(categoryState.menCategories);
      setWomenCategories(categoryState.womenCategories);
    }
  }, [categoryState.categories]);

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
          <div className="font-bold text-sm">Men's</div>
          <div>
            {menCategories.map((categ: any) => {
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
                      className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-black transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-[#FF6D2E] checked:bg-[#FF6D2E] checked:before:bg-[#FF6D2E] hover:before:opacity-10"
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
          <div className="font-bold text-sm">Women's</div>
          <div>
            {womenCategories.map((categ: any) => {
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
                      className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-[#FF6D2E] checked:bg-[#FF6D2E] checked:before:bg-[#FF6D2E] hover:before:opacity-10"
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
