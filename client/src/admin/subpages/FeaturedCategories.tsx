import React, { useRef, useState, useEffect } from "react";
import ImageLinkUpload from "../../components/propductUpload/ImageLinkUpload";

const FeaturedCategories = () => {
    const handleSave = () => {};

    return(<div className="p-20">
      <ImageLinkUpload img={""} link={""} name={""}/>
      <ImageLinkUpload img={""} link={""} name={""}/>
      <ImageLinkUpload img={""} link={""} name={""}/>
      <ImageLinkUpload img={""} link={""} name={""}/>
      <button
        className="px-6 py-3 md:text-base text-sm border border-categoryBorder rounded-lg"
        type="submit"
        onClick={handleSave}
      >
        Save
      </button>
    </div>)
}

export default FeaturedCategories;