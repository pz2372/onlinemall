import React, { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import BrandProductUpload from "../../brandUser/BrandProductUpload";
import BrandDropdown from "../../components/propductUpload/BrandDropdown";

const BrandEdit = () => {
  const [brand, setBrand] = useState("");
  const [newBrand, setNewBrand] = useState(true);
  const [category, setCategory] = useState("");

  interface Changes {
    [key: string]: any;
  }
  const [imgChanges, setImgChanges] = useState<Changes>({});
  const [linkChanges, setLinkChanges] = useState<Changes>({});
  const [nameChanges, setNameChanges] = useState<Changes>({});
  const [priceChanges, setPriceChanges] = useState<Changes>({});
  const products = useSelector((state: { editProduct: [] }) => state.editProduct);
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

  //Add changes to state to prepare for upload
  const addChanges = (key: string, value: any) => {
   {/* switch (key[0]) {
      case "l":
        setLinkChanges((state) => ({
          ...state,
          [key]: value,
        }));
        break;
      case "n":
        setNameChanges((state) => ({
          ...state,
          [key]: value,
        }));
        break;
      case "p":
        setPriceChanges((state) => ({
          ...state,
          [key]: value,
        }));
        break;
      case "i":
        setImgChanges((state) => ({
          ...state,
          [key]: value,
        }));
        break;
    } */}
  };

  //Submit New Changes to Database
  const handleUpload = (e: any) => {
    if (newBrand) {
      createBrand();
    }

    const productData: any[] = [];

    for (var i = 0; i < products.length; i++) {
      console.log(products[i])
      productData.push(products[i])
    }

    fetch("/uploadProduct", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", 
      },
      body: JSON.stringify(productData)
    }) .then((response) => {
      if (response.ok) {
        window.scrollTo({ top: 0, behavior: "smooth" });
        setSuccessMessage("Products Uploaded");
      }
    })
    .catch((error) => setSuccessMessage(error));
  };

  const createBrand = () => {
    const brandData = {
      name: brand,
      description: "",
      price: "$",
    };

    fetch("/createBrand", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", 
      },
      body: JSON.stringify(brandData),
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
      <BrandProductUpload onChange={addChanges} brand={brand}/>
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
