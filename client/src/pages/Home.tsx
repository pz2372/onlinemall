import Blogs from "../components/home/Blogs";
import BrandsLogo from "../components/home/BrandsLogo";
import Categories from "../components/home/categories/Categories";
import BlackFriday from "../components/home/black-friday/BlackFriday";
import CollectionBanners from "../components/home/CollectionBanners";
import DiscountBanners from "../components/home/DiscountBanners";
import FollowUs from "../components/home/FollowUs";
import HomeBanner from "../components/home/homeBanner/HomeBanner";
import Swimsuits from "../components/home/Swimsuits";
import TrendingProducts from "../components/home/TrendingProducts";
import Tshirts from "../components/home/Tshirts";
import ChristmasSale from "../components/home/christmas-sale/ChristmasSale";
import Brands from "../components/home/brands/Brands";

const Home = () => {
  return (
    <>
      {/* Banner */}
      {/* <HomeBanner /> */}
      <BlackFriday />

      {/* Categories */}
      <Categories />

      {/* Discount Banner */}
      {/* <DiscountBanners /> */}
      <ChristmasSale />

      {/* Trending Products */}
      <TrendingProducts />

      {/* Collection Banner */}
      {/* <CollectionBanners /> */}

      {/* Swim Suits */}
      {/* <Swimsuits /> */}

      {/* Hot T-shits */}
      {/* <Tshirts /> */}

      {/* Recent Blogs */}
      {/* <Blogs /> */}

      {/* Brands */}
      <Brands />

      {/* Logos */}
      {/* <BrandsLogo /> */}

      {/* Follow Us */}
      {/* <FollowUs /> */}
    </>
  );
};

export default Home;
