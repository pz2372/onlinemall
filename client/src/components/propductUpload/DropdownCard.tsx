type ItemType = {
  name: string;
  link: string;
  image: string;
};

type DropdownCardProps = {
  data?: ItemType[];
  heading: string;
  onClick: Function;
  selectedId: string;
};

const DropdownCard: React.FC<DropdownCardProps> = ({
  data,
  heading,
  onClick,
  selectedId,
}) => {
  
  //Passes clicked category to parent Component
  const handleClick = (label: any) => {
    onClick(label);
  };

  return (
    <div className="w-full md:w-auto">
      {/* heading */}
      <div className="mt-10 mb-3 pb-3 border-b border-b-dashboardBorder">
        <h1 className="text-placeholderColor2 font-semibold text-xl">
          {heading}
        </h1>
      </div>

      <ul>
        {data?.map((item) => {
          const { name, link, image } = item;

          return (
            <div key={name} className="flex items-center gap-1">
              <input
                type="checkbox"
                id={link}
                checked={selectedId === link}
                onChange={() => handleClick(link)}
                className="accent-themeOrange scale-110"
              />

              <label
                className="flex items-center gap-2 px-3 py-2 bg-transparent rounded-lg cursor-pointer"
                htmlFor={name}
              >
                <img src={image} alt={name} />
                <p className="text-dropdownText">{name}</p>
              </label>
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default DropdownCard;
