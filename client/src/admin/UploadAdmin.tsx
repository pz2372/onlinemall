import React, { useState, useRef } from "react";
import styled from "styled-components";
import UploadImageModal from "../components/uploadImage/UploadImageModal";
import "react-image-crop/dist/ReactCrop.css";
import plusSign from "../assets/Plus.png";


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

  const handleClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSave = (image: any) => {
    setShowModal(false);
    props.onChange(props.index, image, "img");
  };

  const handleLinkChange = (index: number, value: any) => {
    props.onChange(index, value, "link");
  };

  return (
    <SetDiv>
      {showModal ? (
        <UploadImageModal toggle={handleCloseModal} save={handleSave} />
      ) : null}
      <Image
        src={plusSign}
        onClick={handleClick}
        style={{ cursor: "pointer" }}
      />

      <Link>
        Link:{" "}
        <input
          type="text"
          onChange={(e) => handleLinkChange(props.index, e.target.value)}
        />
      </Link>
    </SetDiv>
  );
};
export default Upload;