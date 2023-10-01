import React, { useState } from "react";
import styles from "../Navbar.module.scss";
import AvatarIcon from "../../svgs/AvatarIcon";
import LoginIcon from "../../svgs/LoginIcon";
import MyAccountIcon from "../../svgs/MyAccountIcon";
import OrderIcon from "../../svgs/OrderIcon";
import PaymentMethodIcon from "../../svgs/PaymentMethodIcon";
import { useOutsideClick } from "../../../hooks/useOutsideClick";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../redux/slice/UserSlice";
import FeedIcon from "../../svgs/FeedIcon";
import LogoutIcon from "../../svgs/LogoutIcon";
import { TUserState } from "../../../types/redux.type";
import { TUser } from "../../../types/users.type";

const UserAccountDropdown = () => {
  const userState: TUserState = useSelector((state: RootState) => state.user);
  const userInfo: TUser | null = userState.userInfo;
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const [showDropdown, setShowDropdown] = useState(false);

  const ref = useOutsideClick(() => {
    setShowDropdown(false);
  });
  return (
    <div className={styles.userAccountDropdown}>
      <div
        ref={ref}
        className={`cursor-pointer`}
        onClick={() => setShowDropdown(!showDropdown)}
      >
        {userInfo?.avatar ? (
          <img
            className="w-8 h-8 rounded-full"
            src={process.env.REACT_APP_S3_BUCKET_URL + userInfo.avatar}
            alt="avatar"
          />
        ) : (
          <AvatarIcon width="30px" height="30px" fill="#000000" />
        )}
        {showDropdown ? (
          <div
            className={`${styles.dropdownContainer} bg-white w-max py-3 rounded-xl shadow-dropdown absolute right-0 top-[63px] z-50`}
          >
            <ul>
              {!userInfo ? (
                <li
                  onClick={() => navigate("/login")}
                  className="flex items-center gap-2 px-3 py-4 bg-transparent hover:bg-dropdownHoverBG duration-100 cursor-pointer"
                >
                  <LoginIcon width="20px" height="20px" fill="#3D424D" />
                  <span className="text-dropdownText">Login / Register</span>
                </li>
              ) : (
                <>
                  <li className="flex items-center gap-2 px-3 py-4 bg-transparent hover:bg-dropdownHoverBG duration-100 cursor-pointer">
                    <MyAccountIcon width="20px" height="20px" fill="#3D424D" />
                    <span className="text-dropdownText">My Account</span>
                  </li>
                  <li className="flex items-center gap-2 px-3 py-4 bg-transparent hover:bg-dropdownHoverBG duration-100 cursor-pointer">
                    <FeedIcon width="20px" height="20px" fill="#3D424D" />
                    <span className="text-dropdownText">My Feed</span>
                  </li>
                  <li className="flex items-center gap-2 px-3 py-4 bg-transparent hover:bg-dropdownHoverBG duration-100 cursor-pointer">
                    <OrderIcon width="20px" height="20px" fill="#3D424D" />
                    <span className="text-dropdownText">My Orders</span>
                  </li>
                  <li className="flex items-center gap-2 px-3 py-4 bg-transparent hover:bg-dropdownHoverBG duration-100 cursor-pointer">
                    <PaymentMethodIcon
                      width="20px"
                      height="20px"
                      fill="#3D424D"
                    />
                    <span className="text-dropdownText">Payment Method</span>
                  </li>

                  <li
                    onClick={() => dispatch(logout())}
                    className="flex items-center gap-2 px-3 py-4 bg-transparent hover:bg-dropdownHoverBG duration-100 cursor-pointer"
                  >
                    <LogoutIcon width="20px" height="20px" fill="#3D424D" />
                    <span className="text-dropdownText">Logout</span>
                  </li>
                </>
              )}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default UserAccountDropdown;
