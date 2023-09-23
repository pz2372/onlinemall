import Blogs from "../components/home/Blogs";
import BrandsLogo from "../components/home/BrandsLogo";
import Categories from "../components/home/Categories";
import CollectionBanners from "../components/home/CollectionBanners";
import DiscountBanners from "../components/home/DiscountBanners";
import FollowUs from "../components/home/FollowUs";
import HomeBanner from "../components/home/homeBanner/HomeBanner";
import Swimsuits from "../components/home/Swimsuits";
import TrendingProducts from "../components/home/TrendingProducts";
import Tshirts from "../components/home/Tshirts";

const Home = () => {
  return (
    <>
      {/* Banner */}
      <HomeBanner />

      {/* Categories */}
      <Categories />

      {/* Discount Banner */}
      <DiscountBanners />

      {/* Trending Products */}
      <TrendingProducts />

      {/* Collection Banner */}
      <CollectionBanners />

      {/* Swim Suits */}
      <Swimsuits />

      {/* Hot T-shits */}
      <Tshirts />

      {/* Recent Blogs */}
      <Blogs />

      {/* Logos */}
      <BrandsLogo />

      {/* Follow Us */}
      <FollowUs />
    </>
  );
};

export default Home;
