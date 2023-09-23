import React, { useState, useEffect } from "react";
import PlusIcon from "../svgs/PlusIcon";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import MinusIcon from "../svgs/MinusIcon";
import CheckMarkIcon from "../svgs/CheckMarkIcon";
import { TSizeFilterProps } from "../../types/props.type";
import { TProductSize } from "../../types/products.type";

const SizeFilter = ({ sizes, setSizes }: TSizeFilterProps) => {
  const sizeState = useSelector((state: RootState) => state.size);

  const [toggleSize, setToggleSize] = useState(false);

  const handleSizeChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    setSizes(
      sizes.map((item: TProductSize) =>
        item._id === id ? { ...item, checked: e.target.checked } : item
      )
    );
  };

  useEffect(() => {
    if (sizeState.sizes?.length) {
      setSizes(sizeState.sizes);
    }
  }, [sizeState.sizes]);

  return (
    <div className={`bg-[#f5f4f2]`}>
      <div
        className="flex items-center justify-between p-3 cursor-pointer"
        onClick={() => setToggleSize(!toggleSize)}
      >
        <span>Size</span>
        {toggleSize ? (
          <MinusIcon width="20px" height="20px" fill="#000000" />
        ) : (
          <PlusIcon width="20px" height="20px" fill="#000000" />
        )}
      </div>
      {toggleSize ? (
        <div className={`px-3`}>
          {sizes.map((size: TProductSize) => {
            return (
              <div className="flex items-center" key={size._id}>
                <label
                  className="relative flex cursor-pointer items-center rounded-full p-3"
                  htmlFor={size._id}
                  data-ripple-dark="true"
                >
                  <input
                    id={size._id}
                    type="checkbox"
                    className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-black transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-primary checked:bg-primary checked:before:bg-primary hover:before:opacity-10"
                    checked={size.checked}
                    onChange={(e) => handleSizeChange(e, size._id)}
                  />
                  <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                    <CheckMarkIcon />
                  </div>
                </label>
                <label
                  className="mt-px cursor-pointer select-none font-light text-gray-700"
                  htmlFor={size._id}
                >
                  {size.name}
                </label>
              </div>
            );
          })}
        </div>
      ) : (
        <>
          {sizes.filter((s: TProductSize) => s.checked).length ? (
            <div className={`p-3`}>
              {sizes
                .filter((s: TProductSize) => s.checked)
                .map((size: TProductSize, index: number) => {
                  return (
                    <span className="text-sm" key={size._id}>
                      {sizes.filter((s: TProductSize) => s.checked).length -
                        1 !==
                      index
                        ? size.name + ", "
                        : size.name}
                    </span>
                  );
                })}
            </div>
          ) : null}
        </>
      )}
    </div>
  );
};

export default SizeFilter;
