// Define the interface for the props
interface FilterSidebarProps {
  btnsData: { id: number; title: string }[]; // Assuming btnsData is an array of objects with 'id' and 'title' properties
  activeBtn: number; // Assuming activeBtn is a number
  setActiveBtn: (id: number) => void; // Assuming setActiveBtn is a function that takes a number as an argument and returns void
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  btnsData,
  activeBtn,
  setActiveBtn,
}) => {
  return (
    <div className="w-full md:w-[25%] lg:w-[20%]">
      {/* heading */}
      <div className="pb-3 border-b border-b-categoryBorder">
        <p className="text-base md:text-xl font-semibold text-themeBlackBold">
          Category
        </p>
      </div>

      {/* Buttons */}
      <div className="mt-4">
        {/* Mapping the button and returning each button for each array item, also toggling active status by the local state and item id */}

        {btnsData?.map((btn) => (
          <button
            onClick={() => setActiveBtn(btn.id)}
            key={btn.id}
            className={`px-[14px] py-2 border-b border-b-categoryBorder text-placeholderColor2 w-full text-start cursor-pointer hover:bg-dropdownHoverBG border-x-0 border-t-0 outline-none ${
              activeBtn === btn.id
                ? "bg-dropdownHoverBG text-themeOrange"
                : "bg-transparent"
            } duration-200`}
          >
            {btn.title}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterSidebar;
