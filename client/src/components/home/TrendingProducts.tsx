import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import { AppDispatch, RootState } from "../../redux/store";
import Heading from "./Heading";
import { TProduct, TProductRating } from "../../types/products.type";
import ProductCard from "../productCard/ProductCard";
import { fetchTrendingProducts } from "../../redux/slice/ProductSlice";

const TrendingProducts = () => {
  const dispatch: AppDispatch = useDispatch();
  const { trendingProducts } = useSelector((state: RootState) => state.product);

  useEffect(() => {
    dispatch(fetchTrendingProducts({ page: 1, limit: 10 }));
  }, []);

  return trendingProducts.length ? (
    <div className="container mx-auto lg:w-10/12 w-11/12">
      <div className="py-20 lg:pb-32">
        {/* Heading */}

        {/* Contents */}
        <div className="mt-10">
          {/* Silder */}
          <Swiper
            slidesPerView={1}
            spaceBetween={10}
            navigation={true}
            modules={[Navigation]}
            className="px-2.5"
            breakpoints={{
              420: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: 4,
              },
              1400: {
                slidesPerView: 5,
              },
            }}
          >
            {trendingProducts.map((product: TProduct) => {
              let prod = { ...product };
              const sum = prod.ratings.reduce(
                (accumulator: number, object: TProductRating) => {
                  return accumulator + object.rate;
                },
                0
              );
              let total = sum > 0 ? sum / prod.ratings.length : 0;
              prod.totalRatings = Number(total.toFixed(1));
              return (
                <SwiperSlide key={prod._id}>
                  <ProductCard product={prod} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </div>
  ) : null;
};

export default TrendingProducts;
