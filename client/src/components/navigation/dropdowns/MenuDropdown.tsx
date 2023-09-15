import { useNavigate } from "react-router-dom";
import NavDropdowns from "../NavDropdowns";
import styles from "../Navbar.module.scss";

const MenuDropdown = ({ categories }: any) => {
  const navigate = useNavigate();

  return (
    <div
      className={`${styles.dropdown} bg-white py-5 px-3 w-full rounded-xl shadow-dropdown fixed top-[97px] z-50`}
    >
      {/* Dropdown icon */}
      {/* <div className={`absolute top-[-9px] ${styles.arrow}`}>
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
      </div> */}

      {/* Mapping the dropdown items and returning each one */}
      <ul>
        {categories.map((category: any) => {
          const link = category?.path?.toLowerCase();
          return (
            <li
              key={category?._id}
              className="flex items-center gap-2 px-3 py-4 bg-transparent hover:bg-dropdownHoverBG duration-100 cursor-pointer"
              onClick={() => navigate(link)}
            >
              {/* <img src={image} alt={name} /> */}
              <p className="text-dropdownText">{category?.name}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MenuDropdown;
