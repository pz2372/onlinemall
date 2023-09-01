import { NavLink } from "react-router-dom";
interface AdminDropdownProps {
  ref2: React.RefObject<HTMLDivElement>;
}

const AdminDropdown: React.FC<AdminDropdownProps> = ({ ref2 }) => {
  // Navlinks
  const dropdownMan = [
    {
      id: 1,
      title: "Profile",
      path: "/",
      image: "./images/admindropdown/profile.png",
    },
    {
      id: 2,
      title: "Settings",
      path: "/",
      image: "./images/admindropdown/settings.png",
    },
    {
      id: 3,
      title: "Logout",
      path: "/",
      image: "./images/admindropdown/logout.png",
    },
  ];

  return (
    <div
      ref={ref2}
      className="mensdropdown bg-white w-max py-2 px-4 rounded-xl shadow-dropdown absolute top-[125%] right-0 lg:-right-6 z-50"
    >
      {/* Dropdown icon */}
      <div className="absolute right-6 -top-[9px]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="11"
          viewBox="0 0 16 11"
          fill="none"
        >
          <path
            d="M7.15459 0.986589C7.55496 0.482265 8.32065 0.482265 8.72102 0.986589L15.3106 9.28733C15.8309 9.94269 15.3642 10.9091 14.5274 10.9091H1.3482C0.511445 10.9091 0.0447321 9.94269 0.564993 9.28733L7.15459 0.986589Z"
            fill="#fff"
          />
        </svg>
      </div>

      {/* Mapping the dropdown items and returning each one */}
      <ul>
        {dropdownMan?.map((item) => {
          const { id, image, path, title } = item;

          return (
            <li
              key={id}
              className="flex items-center gap-2 px-3 py-2 bg-transparent hover:bg-dropdownHoverBG rounded-lg duration-200 cursor-pointer"
            >
              <img src={image} alt={title} />

              <NavLink to={path}>
                <p className="text-dropdownText">{title}</p>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default AdminDropdown;
