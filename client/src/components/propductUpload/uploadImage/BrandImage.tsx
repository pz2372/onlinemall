import React, { useRef, useState } from "react";
import plusSign from "../../assets/Plus.png";
import UploadImageModal from "./UploadImageModal";

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
  <div>
  {showModal ? (
        <UploadImageModal toggle={handleCloseModal} save={handleSave} />
      ) : null}
      <img className="w-180 h-180 border border-black"
        src={props.img == null ? plusSign : props.img}
        onClick={handleClick}
        style={{ cursor: "pointer" }}
      />
  </div>
  );
  }
export default BrandImage;
