import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import Upload from "../client/src/components/propductUpload/ProductUpload";
import { modifyImg, addImages } from "../client/src/reducers/UploadImgSlice";
import { modifyURL, addLinks } from "../client/src/reducers/UploadLinkSlice";
import Categories from "./CategorySelector";

const AdminContainer = styled.div`
  margin: 5% 20% 20% 20%;
`;

const BrandName = styled.input``;

const UploadButton = styled.button`
  margin: 0 50% 0 50%;
  background-color: white;
  border: 1px solid black;
  padding: 10px;
`;

const Admin = () => {
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const images = useSelector(
    (state: { uploadImg: string[] }) => state.uploadImg
  );
  const links = useSelector(
    (state: { uploadLink: string[] }) => state.uploadLink
  );

  interface Changes {
    [key: string]: any;
  }

  const [imgChanges, setImgChanges] = useState<Changes>({});
  const [linkChanges, setLinkChanges] = useState<Changes>({});
  const [row, setRow] = useState<React.ReactElement<any>[]>([]);
  const [successMessage, setSuccessMessage] = useState("");

  const addChanges = (key: string, value: any) => {
    if (typeof value == "string") {
      setLinkChanges((state) => ({
        ...state,
        [key]: value,
      }));
    } else {
      setImgChanges((state) => ({
        ...state,
        [key]: value,
      }));
    }
  };

  const handleBrand = (event: any) => {
    setBrand(event.target.value);
  };

  const handleCategory = (checked: string) => {
    setCategory(checked);
  };

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
  };

  //Updates the carousel states
  useEffect(() => {
    var tempRow = [];

    for (var i = 0; i < 9; i++) {
      tempRow[i] = (
        <Upload
          key={i}
          index={i}
          img={images[i]}
          value={links[i]}
          onChange={addChanges}
        />
      );
    } 
    setRow(tempRow);
  }, [images, links]);

  return (
    <AdminContainer>
      {successMessage && <div>{successMessage}</div>}
      Brand: <BrandName onChange={handleBrand} />

      <Categories onChange={handleCategory} />
      {row}
      <UploadButton type="submit" onClick={handleUpload}>
        Upload
      </UploadButton>
    </AdminContainer>
  );
};
export default Admin;
