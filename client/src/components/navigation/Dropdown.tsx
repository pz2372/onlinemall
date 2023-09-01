import { NavLink } from "react-router-dom";
import NavDropdowns from "./NavDropdowns";

const Dropdown = ({ gender }: any) => {
  let category;
  
  if (gender == "men") {
    category = NavDropdowns[0]
  } else {
    category = NavDropdowns[1]
  }

  return (
    <div className="dropdown bg-white w-max py-2 px-4 rounded-xl shadow-dropdown absolute top-full  hidden z-50">
      {/* Dropdown icon */}
      <div className="absolute left-6 -top-[9px]">
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
        {category.sublinks.map((item) => {
          const { name, link, image } = item;

          return (
            <li
              key={link}
              className="flex items-center gap-2 px-3 py-2 bg-transparent hover:bg-dropdownHoverBG rounded-lg duration-200 cursor-pointer"
            >
              <img src={image} alt={name} />

              <NavLink to={link}>
                <p className="text-dropdownText">{name}</p>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Dropdown;
