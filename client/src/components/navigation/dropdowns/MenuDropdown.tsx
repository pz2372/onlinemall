import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import NavDropdowns from "../NavDropdowns";
import styles from "../Navbar.module.scss";
import { TProductCategory } from "../../../types/products.type";
import { TMenuDropdownProps } from "../../../types/props.type";

const MenuDropdown = ({ categories }: TMenuDropdownProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const mainCategory = location.pathname.substring(1);
  const selectedCategory = searchParams.get("cat");
  return (
    <div
      className={`${styles.menuDropdown} bg-white w-full shadow-dropdown z-50 xl:block hidden`}
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
      <ul
        className="container mx-auto lg:w-10/12 w-11/12 flex items-center bg-black"
        style={{
          clipPath: "polygon(0 0, 95% 0, 100% 100%, 5% 100%)",
          paddingLeft: "170px",
        }}
      >
        {categories.map((category: TProductCategory) => {
          const splittedPath = category?.path?.toLowerCase().split("/");
          const link = splittedPath[1]
            ? `${splittedPath[0]}?cat=${splittedPath[1]}`
            : splittedPath[0];
          return (
            <li
              key={category?._id}
              className={`flex items-center gap-2 px-3 bg-transparent py-3 duration-100 cursor-pointer ${
                selectedCategory === category?.name.toLowerCase() &&
                category?.path.toLowerCase().startsWith(mainCategory)
                  ? styles.active
                  : ""
              }`}
              onClick={() => navigate(link)}
            >
              {/* <img src={image} alt={name} /> */}
              <p className="text-white">{category?.name}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MenuDropdown;
