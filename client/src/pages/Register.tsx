import React, { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import plus from "../assets/Plus.png";
import Button from "../components/button/Button";
import { Link, useNavigate } from "react-router-dom";
import { validatePhoneNumber } from "../utils/validatePhoneNumber";
import { validateEmailAddress } from "../utils/validateEmail";
import { validatePassword } from "../utils/validatePassword";
import { AppDispatch, RootState } from "../redux/store";
import { signup } from "../redux/slice/AuthSlice";
import { toast } from "react-toastify";

const Register = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "male",
    phone: "",
    email: "",
    username: "",
    password: "",
    role: "USER",
  });
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    phone: "",
    email: "",
    username: "",
    password: "",
  });

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (!isFormValid()) {
      return;
    }
    await dispatch(signup(formData)).then((res) => {
      if (res.payload.data?.success) {
        toast.success(res.payload.data.message, {
          autoClose: 2000,
        });
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    });
  };

  const isFormValid = () => {
    let isValid = true;
    let cloneErrors: any = { ...errors };
    if (!formData.firstName) {
      isValid = false;
      cloneErrors.firstName = "First name is required.";
    } else if (formData.firstName.length < 3) {
      isValid = false;
      cloneErrors.firstName = "First name must be at least 3 characters.";
    } else {
      cloneErrors.firstName = "";
    }
    if (!formData.lastName) {
      isValid = false;
      cloneErrors.lastName = "Last name is required.";
    } else if (formData.lastName.length < 3) {
      isValid = false;
      cloneErrors.lastName = "Last name must be at least 3 characters.";
    } else {
      cloneErrors.lastName = "";
    }
    if (!formData.gender) {
      isValid = false;
      cloneErrors.gender = "Gender is required.";
    } else {
      cloneErrors.gender = "";
    }
    if (!formData.phone) {
      isValid = false;
      cloneErrors.phone = "Phone is required.";
    } else if (!validatePhoneNumber(formData.phone)) {
      isValid = false;
      cloneErrors.phone = "Phone number is not valid.";
    } else {
      cloneErrors.phone = "";
    }
    if (!formData.email) {
      isValid = false;
      cloneErrors.email = "Email address is required.";
    } else if (!validateEmailAddress(formData.email)) {
      isValid = false;
      cloneErrors.email = "Email address is not valid.";
    } else {
      cloneErrors.email = "";
    }
    if (!formData.username) {
      isValid = false;
      cloneErrors.username = "Username is required.";
    } else if (formData.username.length < 3) {
      isValid = false;
      cloneErrors.username = "Username must be at least 3 characters.";
    } else {
      cloneErrors.username = "";
    }
    if (!formData.password) {
      isValid = false;
      cloneErrors.password = "Password is required.";
    } else if (!validatePassword(formData.password)) {
      isValid = false;
      cloneErrors.password =
        "Password must be minimum 8 characters, at least one letter and one number";
    } else {
      cloneErrors.password = "";
    }
    setErrors(cloneErrors);
    return isValid;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  useEffect(() => {
    Object.values(errors).forEach((err) => {
      if (err) {
        toast.error(err);
      }
    });
  }, [errors]);

  return (
    <div className="flex py-2 pt-40">
      <div className="flex-1">
        <img alt="" src={plus} className="" />
      </div>
      <div className="flex-1 justify-between gap-6 p-20">
        <div className="items-center gap-3 ">
          <p className="text-categoryText md:text-base text-sm">First Name:</p>
          <input
            id="firstName"
            type="text"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            className="bg-transparent outline-none border border-dashboardBorder rounded-lg px-4 py-2 md:text-base text-sm inline"
            required
          />
          <p className="text-categoryText md:text-base text-sm">Last Name:</p>
          <input
            id="lastName"
            type="text"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            className="bg-transparent outline-none border border-dashboardBorder rounded-lg px-4 py-2 md:text-base text-sm inline"
            required
          />
        </div>
        <div className="items-center gap-3">
          <p className="text-categoryText md:text-base text-sm">Gender:</p>
          <select
            id="gender"
            value={formData.gender}
            onChange={handleChange}
            className="bg-transparent outline-none border border-dashboardBorder rounded-lg px-4 py-2 md:text-base text-sm inline"
          >
            <option value={"male"}>Male</option>
            <option value={"female"}>Female</option>
            <option value={"other"}>Other</option>
          </select>
        </div>
        <div className="items-center gap-3">
          <p className="text-categoryText md:text-base text-sm">
            Phone Number:
          </p>
          <input
            id="phone"
            type="tel"
            placeholder="Ex. (123) 456-7890"
            pattern="([0-9]{3})[0-9]{3}-[0-9]{4}"
            value={formData.phone}
            onChange={handleChange}
            maxLength={14}
            className="bg-transparent outline-none border border-dashboardBorder rounded-lg px-4 py-2 md:text-base text-sm"
          />
        </div>
        <div className="items-center gap-3">
          <p className="text-categoryText md:text-base text-sm">Email:</p>
          <input
            id="email"
            type="text"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="bg-transparent outline-none border border-dashboardBorder rounded-lg px-4 py-2 md:text-base text-sm"
            required
          />
        </div>
        <div className="items-center gap-3">
          <p className="text-categoryText md:text-base text-sm">Username:</p>
          <input
            id="username"
            type="text"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="bg-transparent outline-none border border-dashboardBorder rounded-lg px-4 py-2 md:text-base text-sm"
            required
          />
        </div>
        <div className="items-center gap-3">
          <p className="text-categoryText md:text-base text-sm">Password:</p>
          <input
            id="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="bg-transparent outline-none border border-dashboardBorder rounded-lg px-4 py-2 md:text-base text-sm"
            required
          />
        </div>
        <br />
        <div className="flex flex-col items-center">
          <Button variant="primary" onClick={handleSubmit}>
            Create Account
          </Button>
          <Link to={"/login"} className="p-2 text-blue-800">
            Already Have An Account?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
