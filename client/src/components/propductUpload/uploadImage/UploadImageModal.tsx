import React, { useState, useRef } from "react";
import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  Crop,
  PixelCrop,
} from "react-image-crop";
import { canvasPreview } from "./CanvasPreview";
import { useDebounceEffect } from "./useDebounceEffect";

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
    <div className="fixed z-10 w-full h-full bg-opacity-25 bg-black top-0 right-0">
      <div className="bg-white absolute h-600 w-700 top-20 left-20 rounded-5 border-2 border-black">
        <span
          className="text-black float-right p-20 absolute hover:cursor-pointer"
          onClick={props.toggle}
        >
          &times;
        </span>
        <div className="flex justify-center items-center flex-col h-600">
          <input
            type="file"
            accept="image/*"
            ref={uploadButton}
            onChange={onSelectFile}
            className="my-10 mb-30"
          />
          <div className="flex flex-row h-400">
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
                <img
                  className="max-h-250 max-w-250"
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
          </div>
          <button
            onClick={handleSubmit}
            className={`m-3 mt-10 border border-black rounded-5 p-5 ${
              imgSrc ? "block" : "hidden"
            }`}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadImageModal;
