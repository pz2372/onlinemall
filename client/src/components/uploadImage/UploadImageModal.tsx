import React, { useState, useRef } from "react";
import styled from "styled-components";
import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  Crop,
  PixelCrop,
} from "react-image-crop";
import { canvasPreview } from "./CanvasPreview";
import { useDebounceEffect } from "./useDebounceEffect";

const UploadModal = styled.div`
  position: fixed;
  z-index: 1;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.25);
  top: 0;
  right: 0;
`;

const ModalContent = styled.div`
  background-color: white;
  position: absolute;
  height: 600px;
  width: 700px;
  top: 20%;
  left: 20%;
  border-radius: 5px;
  border: 2px solid black;
`;

const UploadDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 600px;
`;

const CropDiv = styled.div`
  display: flex;
  flex-direction: row;
  height: 400px;
`;

const UploadButton = styled.input`
  margin: 10px 0 30px 0;
`;

const CloseButton = styled.span`
  color: Black;
  float: right;
  padding: 20px;
  position: absolute;

  &:hover {
    cursor: pointer;
  }
`;

const CropImg = styled.img`
  max-height: 250px;
  max-width: 250px;
`;

interface StyledButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  display?: string;
}
const SaveButton = styled.button<StyledButtonProps>`
  margin: 30px 0 10px 0;
  border: black solid 1px;
  border-radius: 5px;
  padding: 5px;
  display: ${(props) => props.display || "none"};
`;

// Demonstate how to make and center a % aspect crop
const centerAspectCrop = (
  mediaWidth: number,
  mediaHeight: number,
  aspect: number
) => {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "%",
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
};

const UploadImageModal = (props: any) => {
  const [imgSrc, setImgSrc] = useState("");
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [aspect, setAspect] = useState(1);
  const uploadButton = useRef<HTMLInputElement>(null);
  const [finalImageBlob, setFinalImageBlob] = useState<Blob>();

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined); // Makes crop preview update between images.
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        setImgSrc(reader.result?.toString() || "")
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget;
    setCrop(centerAspectCrop(width, height, 1));
  };

  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        const blob = await canvasPreview(
          imgRef.current,
          previewCanvasRef.current,
          completedCrop
        );
        setFinalImageBlob(blob);
      }
    },
    100,
    [completedCrop]
  );

  const handleSubmit = (e: any) => {
    e.preventDefault();
    props.save(finalImageBlob);
  };

  return (
    <UploadModal>
      <ModalContent>
        <CloseButton onClick={props.toggle}>&times;</CloseButton>
        <UploadDiv>
          <UploadButton
            type="file"
            accept="image/*"
            ref={uploadButton}
            onChange={onSelectFile}
          />
          <CropDiv>
            {!!imgSrc && (
              <ReactCrop
                crop={crop}
                onChange={(_, percentCrop) => setCrop(percentCrop)}
                onComplete={(c) => setCompletedCrop(c)}
                aspect={aspect}
                style={{
                  maxWidth: "400px",
                  maxHeight: "400px",
                  marginRight: "20px",
                }}
              >
                <CropImg
                  ref={imgRef}
                  alt="Crop me"
                  src={imgSrc}
                  onLoad={onImageLoad}
                />
              </ReactCrop>
            )}
            <div>
              {!!completedCrop && (
                <canvas
                  ref={previewCanvasRef}
                  style={{
                    border: "1px solid black",
                    objectFit: "contain",
                    width: "180px",
                    height: "180px",
                  }}
                />
              )}
            </div>
          </CropDiv>
          <SaveButton
            onClick={handleSubmit}
            display={imgSrc ? "block" : "none"}
          >Save
          </SaveButton>
        </UploadDiv>
      </ModalContent>
    </UploadModal>
  );
};

export default UploadImageModal;
