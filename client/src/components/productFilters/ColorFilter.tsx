import React, { useState, useEffect } from "react";
import PlusIcon from "../svgs/PlusIcon";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import MinusIcon from "../svgs/MinusIcon";
import CheckMarkIcon from "../svgs/CheckMarkIcon";
import { TProductColor } from "../../types/products.type";
import { TColorFilterProps } from "../../types/props.type";

const ColorFilter = ({ colors, setColors }: TColorFilterProps) => {
  const colorState = useSelector((state: RootState) => state.color);

  const [toggleColor, setToggleColor] = useState(false);

  const handleColorChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    setColors(
      colors.map((item: TProductColor) =>
        item._id === id ? { ...item, checked: e.target.checked } : item
      )
    );
  };

  useEffect(() => {
    if (colorState.colors?.length) {
      setColors(colorState.colors);
    }
  }, [colorState.colors]);

  return (
    <div className={`bg-[#f5f4f2]`}>
      <div
        className="flex items-center justify-between p-3 cursor-pointer"
        onClick={() => setToggleColor(!toggleColor)}
      >
        <span>Color</span>
        {toggleColor ? (
          <MinusIcon width="20px" height="20px" fill="#000000" />
        ) : (
          <PlusIcon width="20px" height="20px" fill="#000000" />
        )}
      </div>
      {toggleColor ? (
        <div className={`px-3`}>
          {colors.map((color: TProductColor) => {
            return (
              <div className="flex items-center" key={color._id}>
                <label
                  className="relative flex cursor-pointer items-center rounded-full p-3"
                  htmlFor={color._id}
                  data-ripple-dark="true"
                >
                  <input
                    id={color._id}
                    type="checkbox"
                    className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-black transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-primary checked:bg-primary checked:before:bg-primary hover:before:opacity-10"
                    checked={color.checked}
                    onChange={(e) => handleColorChange(e, color._id)}
                  />
                  <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                    <CheckMarkIcon />
                  </div>
                </label>
                <label
                  className="mt-px cursor-pointer select-none font-light text-gray-700"
                  htmlFor={color._id}
                >
                  {color.name}
                </label>
              </div>
            );
          })}
        </div>
      ) : (
        <>
          {colors.filter((c: TProductColor) => c.checked).length ? (
            <div className={`p-3`}>
              {colors
                .filter((c: TProductColor) => c.checked)
                .map((color: TProductColor, index: number) => {
                  return (
                    <span className="text-sm" key={color._id}>
                      {colors.filter((c: TProductColor) => c.checked).length -
                        1 !==
                      index
                        ? color.name + ", "
                        : color.name}
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

export default ColorFilter;
