// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Autoplay, Pagination } from "swiper";
import Button from "../../button/Button";
import styles from "./HomeBanner.module.scss";

const HomeBanner = () => {
  return (
    <div className={`2xl:h-screen ${styles.homebanner}`}>
      <div className="flex items-end justify-end h-full">
        <Swiper
          spaceBetween={30}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          loop={true}
          modules={[Autoplay, Pagination]}
          className="mySwiper"
        >
          <SwiperSlide>
            <div className="container mx-auto lg:w-10/12 w-11/12 flex">
              <div className="pt-24 w-full flex md:items-start items-center justify-between md:flex-row flex-col gap-y-8">
                {/* Left Side */}
                <div className="lg:pt-20 pt-12 md:text-start text-center">
                  <p className="text-black">New Arrivals</p>
                  <h1 className="text-4xl lg:text-[56px] leading-[114%] text-black font-semibold mt-3 lg:mb-14 mb-4">
                    Spring/Summer <br className="lg:block hidden" /> Essential
                    Collection
                  </h1>

                  <Button variant="primary">Shop Collection</Button>
                </div>

                {/* right Side */}
                <div className="relative">
                  <img
                    src="./images/banner-slider.png"
                    alt=""
                    className="w-full h-full"
                  />

                  <div className="absolute left-[5%] lg:left-[20%] top-0">
                    <img src="./images/bg-overlay.png" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="container mx-auto lg:w-10/12 w-11/12 h-full flex">
              <div className="pt-24 w-full flex md:items-start items-center justify-between md:flex-row flex-col gap-y-8">
                {/* Left Side */}
                <div className="lg:pt-20 pt-12 md:text-start text-center">
                  <p className="text-black">New Arrivals</p>
                  <h1 className="text-4xl lg:text-[56px] leading-[114%] text-black font-semibold mt-3 lg:mb-14 mb-4">
                    Spring/Summer <br className="lg:block hidden" /> Essential
                    Collection
                  </h1>

                  <Button variant="primary">Shop Collection</Button>
                </div>

                {/* right Side */}
                <div className="relative">
                  <img
                    src="./images/banner-slider.png"
                    alt=""
                    className="w-full h-full"
                  />

                  <div className="absolute left-[5%] lg:left-[20%] top-0">
                    <img src="./images/bg-overlay.png" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="container mx-auto lg:w-10/12 w-11/12 h-full flex">
              <div className="pt-24 w-full flex md:items-start items-center justify-between md:flex-row flex-col gap-y-8">
                {/* Left Side */}
                <div className="lg:pt-20 pt-12 md:text-start text-center">
                  <p className="text-black">New Arrivals</p>
                  <h1 className="text-4xl lg:text-[56px] leading-[114%] text-black font-semibold mt-3 lg:mb-14 mb-4">
                    Spring/Summer <br className="lg:block hidden" /> Essential
                    Collection
                  </h1>

                  <Button variant="primary">Shop Collection</Button>
                </div>

                {/* right Side */}
                <div className="relative">
                  <img
                    src="./images/banner-slider.png"
                    alt=""
                    className="w-full h-full"
                  />

                  <div className="absolute left-[5%] lg:left-[20%] top-0">
                    <img src="./images/bg-overlay.png" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default HomeBanner;
