import DashboardFilter from "./Dashboard/DashboardFilter";
import DashboardHeading from "./Dashboard/DashboardHeading";
import DashboardNavbar from "./Dashboard/DashboardNavbar";
import DashboardProducts from "./Dashboard/DashboardProducts";

const Dashboard = () => {
  return (
    <>
      {/* Navbar */}
      <DashboardNavbar />
      {/* Container */}
      <div className="container mx-auto lg:w-10/12 w-11/12">
        {/* Page heading */}
        <DashboardHeading />
        {/* Filter */}
        <DashboardFilter />
        {/* Product */}
        <DashboardProducts />
      </div>
    </>
  );
};

export default Dashboard;
