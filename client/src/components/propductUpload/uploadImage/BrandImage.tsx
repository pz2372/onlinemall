import React, { useRef, useState } from "react";
import styled from "styled-components";
import plusSign from "../../assets/Plus.png";
import UploadImageModal from "./UploadImageModal";

const BrandImageDiv = styled.div``;

const Image = styled.img`
  width: 180px;
  height: 180px;
  border: 1px black solid;
`;

const UploadButton = styled.input`
  display: none;
`;

const convertBlobToBase64 = (blob: any) =>
new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.onerror = reject;
  reader.onload = () => {
    resolve(reader.result);
  };
  reader.readAsDataURL(blob);
});

const BrandImage = (props: any) => {
    const [showModal, setShowModal] = useState(false);
  const [file, setFile] = useState<any | null>(null);

  const handleChange = (e: any) => {
    setFile(URL.createObjectURL(e.target.files[0]));
  };

  const handleClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSave = async(image: any) => {
    const index = props.index;
    const url = await convertBlobToBase64(image);
    setFile(url)
    setShowModal(false);
    props.onChange("img" + `${index + 1}`, image);
  };

  return(
  <BrandImageDiv>
  {showModal ? (
        <UploadImageModal toggle={handleCloseModal} save={handleSave} />
      ) : null}
      <Image
        src={props.img == null ? plusSign : props.img}
        onClick={handleClick}
        style={{ cursor: "pointer" }}
      />
  </BrandImageDiv>
  );
  }
export default BrandImage;
