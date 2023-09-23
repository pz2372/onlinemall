/* eslint-disable @typescript-eslint/no-unused-vars */
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";
import { useEffect, useRef, useState } from "react";
import DashboardSliderCard from "./DashboardSliderCard";

interface Item {
  id?: number;
  title?: string;
  price?: string;
  oldPrice?: string;
  img?: string;
}

type SliderProps = {
  data?: Array<Item>;
  ItemView?: number;
  isHomePage?: boolean;
};

const Slider: React.FunctionComponent<SliderProps> = ({
  data,
  ItemView,
  isHomePage,
}) => {
  const [, setRerender] = useState<string | undefined>();

  SwiperCore.use([Navigation]);
  useEffect(() => {
    setRerender("anything");
  }, []);

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className="w-full">
      <Swiper
        className="mySwiper relative"
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerView={ItemView}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        breakpoints={{
          250: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 50,
          },
        }}
      >
        {data?.map((item: Item) => {
          const { id, title, price, img } = item;
          return (
            <SwiperSlide key={id}>
              <DashboardSliderCard
                img={img}
                name={title}
                price={price}
                key={id}
                isHomePage={isHomePage}
              />
            </SwiperSlide>
          );
        })}

        <div className="flex items-center gap-4">
          <button
            className={`absolute left-0 top-[45%] cursor-pointer z-50 ${
              isHomePage === true &&
              "bg-white rounded-lg w-10 h-10 flex items-center justify-center"
            }`}
            ref={prevRef}
          >
            <i className="fa-solid fa-chevron-left text-lg text-[#1C1B1F] hover:text-themeOrange"></i>
          </button>

          <button
            className={`absolute right-0 top-[45%] cursor-pointer z-50 ${
              isHomePage === true &&
              "bg-white rounded-lg w-10 h-10 flex items-center justify-center"
            }`}
            ref={nextRef}
          >
            <i className="fa-solid fa-chevron-right text-lg text-[#1C1B1F] hover:text-themeOrange"></i>
          </button>
        </div>
      </Swiper>
    </div>
  );
};

export default Slider;
