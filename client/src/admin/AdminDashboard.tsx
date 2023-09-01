import React, { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Upload from "../components/propductUpload/ProductUpload";
import { modifyImg, addImages } from "../reducers/UploadImgSlice";
import { modifyURL, addLinks } from "../reducers/UploadLinkSlice";
import AdminDropdown from "./AdminDropdown";
import FeaturedCategories from "./subpages/FeaturedCategories";
import FeaturedProducts from "./subpages/FeaturedProducts";
import TrendingProducts from "./subpages/TrendingProducts";
import CategoryCarouselOne from "./subpages/CategoryCarouselOne";
import CategoryCarouselTwo from "./subpages/CategoryCarouselTwo";
import FeaturedLogos from "./subpages/FeaturedLogos";
import Instagram from "./subpages/Instagram";
import BrandEdit from "./subpages/BrandEdit";

const AdminDashboard = () => {
  const [dropdown, setDropdown] = useState("");
  const [subpage, setSubpage] = useState(<></>);

  useEffect(() => {
    switch (dropdown) {
      case "featuredCategories":
        setSubpage(<FeaturedCategories />);
        break;
      case "featuredProducts":
        setSubpage(<FeaturedProducts />);
        break;
      case "trendingProducts":
        setSubpage(<TrendingProducts />);
        break;
      case "categoryCarouselOne":
        setSubpage(<CategoryCarouselOne />);
        break;
      case "categoryCarouselTwo":
        setSubpage(<CategoryCarouselTwo />);
        break;
      case "featuredLogos":
        setSubpage(<FeaturedLogos />);
        break;
      case "instagram":
        setSubpage(<Instagram />);
        break;
      case "brandEdit":
        setSubpage(<BrandEdit />);
        break;
      default:
        setSubpage(<BrandEdit />);
    }
  }, [dropdown]);

  const handleDropdownChange = (value: string) => {
    setDropdown(value)
  }

  return (
    <div className="p-40">
      <AdminDropdown onChange={handleDropdownChange}/>
      {subpage}
    </div>
  );
};

export default AdminDashboard;
