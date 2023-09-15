import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import plus from "../assets/Plus.png";
import Button from "../components/button/Button";
import { validateEmailAddress } from "../utils/validateEmail";
import { validatePassword } from "../utils/validatePassword";
import { AppDispatch } from "../redux/store";
import { login } from "../redux/slice/AuthSlice";
import { toast } from "react-toastify";

const Login = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (!isFormValid()) {
      return;
    }

    await dispatch(login(formData)).then((res) => {
      if (res.payload.data?.success) {
        toast.success(res.payload.data.message, {
          autoClose: 2000,
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        navigate("/");
      } else {
        toast.error(res.payload.message || res.payload, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      }
    });
  };

  const isFormValid = () => {
    let isValid = true;
    let cloneErrors: any = { ...errors };
    if (!formData.email) {
      isValid = false;
      cloneErrors.email = "Email address is required.";
    } else if (!validateEmailAddress(formData.email)) {
      isValid = false;
      cloneErrors.email = "Email address is not valid.";
    } else {
      cloneErrors.email = "";
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
        <div className="items-center gap-3">
          <p className="text-categoryText md:text-base text-sm">
            Email address:
          </p>
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
        <br />
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
        <div className="items-center gap-3">
          <p className="text-categoryText md:text-base text-sm text-right text-blue-800">
            Forgot Password
          </p>
        </div>
        <div className="flex flex-col items-center">
          <Button variant="primary" onClick={handleSubmit}>
            Log in
          </Button>
          <Link to="/register" className="p-2 text-blue-800">
            Register Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
