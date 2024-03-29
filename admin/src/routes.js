import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import Notifications from "layouts/notifications";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import Products from "layouts/product";

import Icon from "@mui/material/Icon";
import Brands from "layouts/brand";
import EditHomePage from "layouts/homepage";
import Orders from "layouts/order";
import Users from "layouts/user";
import Settings from "layouts/setting";
import Admins from "layouts/admin";
import Categories from "layouts/category";
import Colors from "layouts/color";
import Sizes from "layouts/size";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Brands",
    key: "brands",
    icon: <Icon fontSize="small">branding_watermark</Icon>,
    route: "/brands",
    component: <Brands />,
  },
  {
    type: "collapse",
    name: "Brand Owners",
    key: "brand-owners",
    icon: <Icon fontSize="small">supervisor_account</Icon>,
    route: "/brand-owners",
    component: <Admins />,
  },
  {
    type: "collapse",
    name: "Products",
    key: "products",
    icon: <Icon fontSize="small">production_quantity_limits</Icon>,
    route: "/products",
    component: <Products />,
  },
  {
    type: "collapse",
    name: "Categories",
    key: "categories",
    icon: <Icon fontSize="small">category</Icon>,
    route: "/categories",
    component: <Categories />,
  },
  {
    type: "collapse",
    name: "Colors",
    key: "colors",
    icon: <Icon fontSize="small">color_lens</Icon>,
    route: "/colors",
    component: <Colors />,
  },
  {
    type: "collapse",
    name: "Sizes",
    key: "sizes",
    icon: <Icon fontSize="small">format_size</Icon>,
    route: "/sizes",
    component: <Sizes />,
  },
  {
    type: "collapse",
    name: "Edit Home Page",
    key: "edit-homepage",
    icon: <Icon fontSize="small">home</Icon>,
    route: "/edit-homepage",
    component: <EditHomePage />,
  },
  {
    type: "collapse",
    name: "Orders",
    key: "orders",
    icon: <Icon fontSize="small">shopping_cart</Icon>,
    route: "/orders",
    component: <Orders />,
  },
  {
    type: "collapse",
    name: "Users",
    key: "users",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/users",
    component: <Users />,
  },
  {
    type: "collapse",
    name: "Settings",
    key: "settings",
    icon: <Icon fontSize="small">settings</Icon>,
    route: "/settings",
    component: <Settings />,
  },
  {
    type: "collapse",
    name: "Sign In",
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/sign-in",
    component: <SignIn />,
  },
  {
    type: "collapse",
    name: "Sign out",
    key: "sign-out",
    icon: <Icon fontSize="small">logout</Icon>,
  },
  // {
  //   type: "collapse",
  //   name: "Tables",
  //   key: "tables",
  //   icon: <Icon fontSize="small">table_view</Icon>,
  //   route: "/tables",
  //   component: <Tables />,
  // },
  // {
  //   type: "collapse",
  //   name: "Billing",
  //   key: "billing",
  //   icon: <Icon fontSize="small">receipt_long</Icon>,
  //   route: "/billing",
  //   component: <Billing />,
  // },
  // {
  //   type: "collapse",
  //   name: "Notifications",
  //   key: "notifications",
  //   icon: <Icon fontSize="small">notifications</Icon>,
  //   route: "/notifications",
  //   component: <Notifications />,
  // },
  // {
  //   type: "collapse",
  //   name: "Profile",
  //   key: "profile",
  //   icon: <Icon fontSize="small">person</Icon>,
  //   route: "/profile",
  //   component: <Profile />,
  // },
];

export default routes;
