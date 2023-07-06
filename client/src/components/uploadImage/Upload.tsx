import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createAction } from "@reduxjs/toolkit";
import styled from "styled-components";
import UploadImageModal from "./UploadImageModal";
import "react-image-crop/dist/ReactCrop.css";
import plusSign from "../../assets/Plus.png";
import { modifyImg } from "../../reducers/UploadImgSlice";
import { modifyURL } from "../../reducers/UploadLinkSlice";

const SetDiv = styled.div`
  display: flex;
  flex-direction: row;
  margin: 40px 0 40px 0;
`;

const Image = styled.img`
  width: 180px;
  height: 180px;
  border: 1px black solid;
`;

const Link = styled.label`
  margin: auto;
`;

const Upload = (props: any) => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  const handleClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSave = async (image: any) => {
    const index = props.index;
    const url = await convertBlobToBase64(image);
    dispatch(modifyImg({ index, url }));
    setShowModal(false);
    props.onChange("img" + `${index + 1}`, image);
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

  const handleLinkChange = (index: number, value: any) => {
    dispatch(modifyURL({ index, value }));
    props.onChange("link" + `${index + 1}`, value);
  };

  return (
    <SetDiv>
      {showModal ? (
        <UploadImageModal toggle={handleCloseModal} save={handleSave} />
      ) : null}
      <Image
        src={props.img == null ? plusSign : props.img}
        onClick={handleClick}
        style={{ cursor: "pointer" }}
      />

      <Link>
        Link:{" "}
        <input
          type="text"
          defaultValue={props.value}
          onChange={(e) => handleLinkChange(props.index, e.target.value)}
          required
        />
      </Link>
    </SetDiv>
  );
};
export default Upload;
