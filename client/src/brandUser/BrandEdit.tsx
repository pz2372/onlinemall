import React, { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import BrandProductUpload from "./BrandProductUpload";
import BrandDropdown from "../components/propductUpload/BrandDropdown";

const BrandEdit = () => {
  const [brand, setBrand] = useState("");
  const [newBrand, setNewBrand] = useState(true);
  const [category, setCategory] = useState("");
  const images = useSelector(
    (state: { uploadImg: string[] }) => state.uploadImg
  );
  const links = useSelector(
    (state: { uploadLink: string[] }) => state.uploadLink
  );
  const [row, setRow] = useState<React.ReactElement<any>[]>([]);

  interface Changes {
    [key: string]: any;
  }
  const [imgChanges, setImgChanges] = useState<Changes>({});
  const [linkChanges, setLinkChanges] = useState<Changes>({});
  const [successMessage, setSuccessMessage] = useState("");

  //Updates brand input
  const handleBrand = (newBrand: boolean, brand: string) => {
    if (newBrand) {
      setNewBrand(true);
    } else {
      setNewBrand(false);
    }
    setBrand(brand);
  };

  {
    /*} //Submit New Changes to Database
  const handleUpload = (e: any) => {
    const formData = new FormData();

    for (const key in imgChanges) {
      formData.append(`${category}/${brand}/${key}`, imgChanges[key], `${key}`);
    }

    const jsonData = JSON.stringify({
      category: category,
      brand: brand,
      linkChanges: linkChanges,
    });

    formData.append("json", new Blob([jsonData], { type: "application/json" }));

    fetch("/createBrand", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          window.scrollTo({ top: 0, behavior: "smooth" });
          setSuccessMessage("User Updated");
        }
      })
      .catch((error) => setSuccessMessage(error));
  };*/
  }

  //Submit New Changes to Database
  const handleUpload = (e: any) => {
    if (newBrand){
      createBrand();
    }

  };

  const createBrand = () => {
    const jsonData = JSON.stringify({
      name: brand,
      description: "",
      price: "$",
    });

    fetch("/createBrand", {
      method: "POST",
      body: jsonData,
    })
      .then((response) => {
        if (response.ok) {
          window.scrollTo({ top: 0, behavior: "smooth" });
          setSuccessMessage("Brand Created");
        }
      })
      .catch((error) => setSuccessMessage(error));
  };

  return (
    <div className="p-20">
      <div>{successMessage}</div>
      {/* Select brand Dropdown */}
      <BrandDropdown onChange={handleBrand} />
      <BrandProductUpload />
      {/* Buttons */}
      <div className="text-center md:mt-20 mt-14">
        <button
          className="px-6 py-3 md:text-base text-sm border border-categoryBorder rounded-lg"
          type="submit"
          onClick={handleUpload}
        >
          Upload
        </button>
      </div>
    </div>
  );
};

export default BrandEdit;
