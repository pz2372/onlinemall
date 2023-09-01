import { useState } from "react";

const ProjectUploadCard = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file && file.type.includes("image/")) {
      setSelectedImage(file);
    } else {
      setSelectedImage(null);
      alert("Please select a valid image file.");
    }
  };

  return (
    <div className="w-full flex justify-between md:flex-row flex-col lg:gap-20 gap-10 mb-10">
      {/* Left Side */}
      <div className="w-full md:w-3/12 bg-uploadImageBG flex items-center justify-center md:h-auto h-[140px]">
        {!selectedImage ? (
          <div>
            <input
              type="file"
              accept="image/*"
              id="upload"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
            <label htmlFor="upload">
              <svg
                className="cursor-pointer"
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
              >
                <path
                  d="M24 37.5C23.5667 37.5 23.2087 37.3587 22.926 37.076C22.642 36.792 22.5 36.4333 22.5 36V25.5H12C11.5667 25.5 11.2087 25.358 10.926 25.074C10.642 24.7913 10.5 24.4333 10.5 24C10.5 23.5667 10.642 23.208 10.926 22.924C11.2087 22.6413 11.5667 22.5 12 22.5H22.5V12C22.5 11.5667 22.642 11.2087 22.926 10.926C23.2087 10.642 23.5667 10.5 24 10.5C24.4333 10.5 24.792 10.642 25.076 10.926C25.3587 11.2087 25.5 11.5667 25.5 12V22.5H36C36.4333 22.5 36.792 22.6413 37.076 22.924C37.3587 23.208 37.5 23.5667 37.5 24C37.5 24.4333 37.3587 24.7913 37.076 25.074C36.792 25.358 36.4333 25.5 36 25.5H25.5V36C25.5 36.4333 25.3587 36.792 25.076 37.076C24.792 37.3587 24.4333 37.5 24 37.5Z"
                  fill="#1C1B1F"
                />
              </svg>
            </label>
          </div>
        ) : (
          <div className="h-[140px]">
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="image"
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>

      {/* Right side */}
      <div className="w-full md:w-9/12 py-2">
        {/* Upper Layer */}
        <div className="flex items-center justify-between gap-6">
          {/* Name Box */}
          <div className="w-6/12 flex items-center gap-3">
            <p className="text-categoryText md:text-base text-sm">Name:</p>
            <input
              type="text"
              className="w-full bg-transparent outline-none border border-dashboardBorder rounded-lg px-4 py-2 md:text-base text-sm"
            />
          </div>

          {/* Price Box */}
          <div className="w-5/12 flex items-center gap-3">
            <p className="text-categoryText md:text-base text-sm">Price:</p>
            <div className="px-4 py-2 border border-dashboardBorder rounded-lg w-full">
              <select className="bg-transparent outline-none w-full md:text-base text-sm">
                <option value="50">$50.00</option>
              </select>
            </div>
          </div>
        </div>

        {/* Bottom layer */}
        <div className="w-full flex items-center gap-3 mt-4 md:mt-9">
          <p className="text-categoryText md:text-base text-sm">Link</p>

          {/* Icon box */}
          <div className="w-full flex items-center gap-2 py-2 px-4 border border-dashboardBorder rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
            >
              <mask
                id="mask0_23_1466"
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="24"
                height="25"
              >
                <rect y="0.5" width="24" height="24" fill="#D9D9D9" />
              </mask>
              <g mask="url(#mask0_23_1466)">
                <path
                  d="M10.8077 17.0384H7.03845C5.78282 17.0384 4.7125 16.596 3.8275 15.7111C2.9425 14.8262 2.5 13.756 2.5 12.5005C2.5 11.245 2.9425 10.1747 3.8275 9.28942C4.7125 8.40417 5.78282 7.96155 7.03845 7.96155H10.8077V9.4615H7.03845C6.1987 9.4615 5.48235 9.75797 4.8894 10.3509C4.29645 10.9439 3.99998 11.6602 3.99998 12.5C3.99998 13.3397 4.29645 14.0561 4.8894 14.649C5.48235 15.242 6.1987 15.5384 7.03845 15.5384H10.8077V17.0384ZM8.25 13.2499V11.75H15.75V13.2499H8.25ZM13.1923 17.0384V15.5384H16.9615C17.8013 15.5384 18.5176 15.242 19.1106 14.649C19.7035 14.0561 20 13.3397 20 12.5C20 11.6602 19.7035 10.9439 19.1106 10.3509C18.5176 9.75797 17.8013 9.4615 16.9615 9.4615H13.1923V7.96155H16.9615C18.2171 7.96155 19.2875 8.40399 20.1725 9.28887C21.0575 10.1738 21.5 11.2439 21.5 12.4994C21.5 13.7549 21.0575 14.8253 20.1725 15.7105C19.2875 16.5958 18.2171 17.0384 16.9615 17.0384H13.1923Z"
                  fill="#3D424D"
                />
              </g>
            </svg>

            <input
              type="text"
              className="bg-transparent outline-none border-none md:text-base text-sm placeholder:text-placeholderColor"
              placeholder="https://"
              
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectUploadCard;
