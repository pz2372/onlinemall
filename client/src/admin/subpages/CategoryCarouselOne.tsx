import React, { useRef, useState, useEffect } from "react";
import TextBox from "../../components/TextBox"

const CategoryCarouselOne = () => {
  const handleSave = () => {};

  return (
    <div className="p-20">
      <TextBox name={"Item 1"}/>
      <TextBox name={"Item 2"}/>
      <TextBox name={"Item 3"}/>
      <TextBox name={"Item 4"}/>
      <TextBox name={"Item 5"}/>
      <TextBox name={"Item 6"}/>
      <TextBox name={"Item 7"}/>
      <TextBox name={"Item 8"}/>
      <TextBox name={"Item 9"}/>
      <button
        className="px-6 py-3 md:text-base text-sm border border-categoryBorder rounded-lg"
        type="submit"
        onClick={handleSave}
      >
        Save
      </button>
    </div>
  );
};

export default CategoryCarouselOne;
