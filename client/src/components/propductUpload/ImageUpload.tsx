import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import UploadImageModal from "./uploadImage/UploadImageModal";
import "react-image-crop/dist/ReactCrop.css";
import plusSign from "../../assets/Plus.png";
import { modifyImg } from "../../reducers/UploadImgSlice";
import { modifyURL } from "../../reducers/UploadLinkSlice";

const ImageUpload = (props: any) => {
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

  return (
    <div>
      {showModal ? (
        <UploadImageModal toggle={handleCloseModal} save={handleSave} />
      ) : null}
      <div className="w-full md:w-[150px] bg-uploadImageBG flex items-center justify-center md:h-auto h-[140px]">
        <img
          src={props.img == null ? plusSign : props.img}
          onClick={handleClick}
          style={{ cursor: "pointer" }}
        />
      </div>
    </div>
  );
};
export default ImageUpload;
