const AdminDropdown = ({ onChange }: any) => {
  const handleChange = (event: any) => {
    onChange(event.target.value);
  };
  return (
    <div className="w-6/12 flex items-center gap-4 justify-between">
      <div>
        <p className="text-categoryText md:text-base text-sm">Edit:</p>
      </div>
      <div className="w-full py-2 md:px-4 px-2 border border-dashboardBorder rounded-lg">
        <select
          className="bg-transparent outline-none border-none text-categoryText w-full cursor-pointer md:text-base text-sm"
          onChange={handleChange}
        >
          <option value="brandEdit">Brand Edit</option>
          <option value="featuredCategories">Featured Categories</option>
          <option value="featuredProducts">Featured Products</option>
          <option value="trendingProducts">Trending Products</option>
          <option value="categoryCarouselOne">Category Carousel 1</option>
          <option value="categoryCarouselTwo">Category Carousel 2</option>
          <option value="featuredLogos">Featured Logos</option>
          <option value="instagram">Instagram</option>
        </select>
      </div>
    </div>
  );
};

export default AdminDropdown;
