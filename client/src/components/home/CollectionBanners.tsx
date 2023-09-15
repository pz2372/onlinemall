import Button from "../button/Button";

const CollectionBanners = () => {
  return (
    <div className="container mx-auto lg:w-10/12 w-11/12">
      <div className="w-full flex items-center justify-between gap-10 lg:pb-32 pb-16 lg:flex-row flex-col">
        {/* Left Side */}
        <div className="w-full flex justify-between md:flex-row flex-col-reverse rounded-xl overflow-hidden">
          {/* Left Side */}
          <div className="w-full md:w-[45%] bg-collectionBanner1 p-6 md:p-10 flex flex-col justify-center items-start">
            <p className="text-themeBlackBold font-medium">SAVE UP TO</p>
            <p className="text-2xl text-themeBlackBold pt-1">
              <span className="bg-themeOrange p-1 rounded-lg text-white font-bold">
                15%
              </span>{" "}
              OFF
            </p>

            <h2 className="text-[22px] font-semibold text-black pt-4 pb-14">
              Wrinkle long <br className="md:block hidden" /> thong shirt
            </h2>

            <Button variant="primary">More Collection</Button>
          </div>

          {/* right Side */}
          <div className="w-full md:w-[55%]">
            <img src="./images/collection-1.png" alt="" className="w-full" />
          </div>
        </div>

        {/* right Side */}
        <div className="w-full flex justify-between rounded-xl md:flex-row flex-col-reverse  overflow-hidden">
          {/* Left Side */}
          <div className="w-full md:w-[45%] bg-collectionBanner2 p-6 md:p-10 flex flex-col justify-center items-start">
            <p className="text-themeBlackBold font-medium">SAVE UP TO</p>
            <p className="text-2xl text-themeBlackBold pt-1">
              <span className="bg-themeOrange p-1 rounded-lg text-white font-bold">
                15%
              </span>{" "}
              OFF
            </p>

            <h2 className="text-[22px] font-semibold text-black pt-4 pb-14">
              Leather jacket
            </h2>

            <Button variant="primary">More Collection</Button>
          </div>

          {/* right Side */}
          <div className="w-full md:w-[55%]">
            <img src="./images/collection-2.png" alt="" className="w-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionBanners;
