import { useState } from "react";

const ColorSelector = () => {
  const [selectedColor, setSelectedColor] = useState(1);

  return (
    <div className="flex items-center gap-2">
      {/* First Color */}
      <div
        onClick={() => setSelectedColor(1)}
        className={`p-[3px] border ${
          selectedColor === 1 ? "border-productColor1" : "border-transparent"
        }  w-max rounded-full cursor-pointer`}
      >
        <div className="bg-productColor1 w-3 h-3 rounded-full"></div>
      </div>

      {/* second Color */}
      <div
        onClick={() => setSelectedColor(2)}
        className={`p-[3px] border ${
          selectedColor === 2 ? "border-productColor2" : "border-transparent"
        }  w-max rounded-full cursor-pointer`}
      >
        <div className="bg-productColor2 w-3 h-3 rounded-full"></div>
      </div>

      {/* third Color */}
      <div
        onClick={() => setSelectedColor(3)}
        className={`p-[3px] border ${
          selectedColor === 3 ? "border-productColor3" : "border-transparent"
        }  w-max rounded-full cursor-pointer`}
      >
        <div className="bg-productColor3 w-3 h-3 rounded-full"></div>
      </div>
    </div>
  );
};

export default ColorSelector;
