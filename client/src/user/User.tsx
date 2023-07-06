import React, { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Upload from "../components/uploadImage/Upload";
import { modifyImg, addImages } from "../reducers/UploadImgSlice";
import { modifyURL, addLinks } from "../reducers/UploadLinkSlice";
import styled from "styled-components";

const AdminContainer = styled.div`
  margin: 100px;
`;

const SaveButton = styled.button`
  margin: 0 50% 0 50%;
  background-color: white;
  border: 1px solid black;
  padding: 10px;
`;

const Admin = () => {
  const carouselImages = useSelector(
    (state: { uploadImg: string[] }) => state.uploadImg
  );
  const carouselLinks = useSelector(
    (state: { uploadLink: string[] }) => state.uploadLink
  );
  const dispatch = useDispatch();
  const [row, setRow] = useState<React.ReactElement<any>[]>([]);
  var temp: any;

  interface Changes {
    [key: string]: any;
  }

  const [imgChanges, setImgChanges] = useState<Changes>({});
  const [linkChanges, setLinkChanges] = useState<Changes>({});
  const [successMessage, setSuccessMessage] = useState("");

  //Retrieves initial data for carousel
  useEffect(() => {
    fetch("/api/getmentshirts")
      .then((response) => response.json())
      .then((data) => handleArrays(data));
  }, []);

  const handleArrays = async (data: any) => {
    temp = data[0];
    let images: any = [];
    let links: any = [];

    const arr = Array.from(Object.values(data[0]));
    for (var i = 2; i < 11; i++) {
      links.push(arr[i]);
      images.push(arr[i + 9]);
    }
    dispatch(addImages(images));
    dispatch(addLinks(links));
  };

  const convertBlobToBase64 = (blob: any) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });

  //Add changes to arrays
  const addChanges = (key: string, value: string | Blob) => {
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

  //Updates the array states
  useEffect(() => {
    var tempRow = [];
    if (carouselImages.length > 0 && carouselLinks.length > 0) {
      for (var i = 0; i < 9; i++) {
        tempRow[i] = (
          <Upload
            key={i}
            index={i}
            img={carouselImages[i]}
            value={carouselLinks[i]}
            onChange={addChanges}
          />
        );
      }
    }
    setRow(tempRow);
  }, [carouselImages, carouselLinks]);

  //Handles save changes
  const handleSave = (e: any) => {
    const formData = new FormData();
    for (const key in imgChanges) {
      formData.append(`men_tshirts/Nike/${key}`, imgChanges[key], `${key}`);
    }
    const jsonData = JSON.stringify({
      linkChanges: linkChanges,
    });

    formData.append("json", new Blob([jsonData], { type: "application/json" }));

    fetch("/insertData", {
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

  return (
    <AdminContainer>
      {successMessage && <div>{successMessage}</div>}
      {row}
      <SaveButton type="submit" onClick={handleSave}>
        Save
      </SaveButton>
    </AdminContainer>
  );
};

export default Admin;
