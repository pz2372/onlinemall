import { NavLink } from "react-router-dom";
import Button from "../Button";

const DashboardHeading = () => {
  return (
    <div className="w-full flex items-center justify-between mt-14 pb-6 border-b border-b-dashboardBorder">
      <h1 className="text-themeBlackBold text-lg md:text-2xl font-semibold">
        Admin Dashboard
      </h1>

      <NavLink to="/product-upload">
        <Button bgColorCode="#DE3435" text="Upload Products" />
      </NavLink>
    </div>
  );
};

export default DashboardHeading;
