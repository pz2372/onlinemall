import Button from "../Button";

const DashboardFilter = () => {
  return (
    <div className="w-full flex items-center md:flex-row flex-col gap-2 pt-6">
      {/* left side */}
      <div className="w-full lg:w-full p-3 border border-dashboardBorder rounded-lg flex md:items-center justify-between gap-1 flex-col md:flex-row gap-y-3">
        {/* Input field */}
        <div className="md:w-8/12 flex items-center justify-between gap-1">
          <img src="./images/search.png" alt="search_icon" />
          <input
            type="text"
            placeholder="Search for product"
            className="bg-transparent w-full h-full border-none outline-none placeholder:text-sm text-sm"
          />
        </div>

        {/* brand Dropdown */}
        <div className="md:w-4/12 md:px-4 md:border-x border-x-dashboardBorder">
          <select className="text-placeholderColor2 w-full text-sm outline-none border-none bg-transparent">
            <option value="brand">Brand</option>
            <option value="nike">Nike</option>
            <option value="apple">Apple</option>
          </select>
        </div>

        {/* Category Dropdown */}
        <div className="md:w-4/12 md:pl-4">
          <select className="text-placeholderColor2 w-full text-sm outline-none border-none bg-transparent">
            <option value="category">Category</option>
            <option value="nike">Nike</option>
            <option value="apple">Apple</option>
          </select>
        </div>
      </div>

      {/* right side */}
      <div className="lg:w-full">
        <Button bgColorCode="#000" text="Search" />
      </div>
    </div>
  );
};

export default DashboardFilter;
