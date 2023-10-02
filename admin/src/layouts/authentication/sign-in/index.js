import { useState, useEffect } from "react";

// @mui material components
import Card from "@mui/material/Card";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";

import { toast } from "react-toastify";
import { validateEmailAddress } from "utils/validateEmail";
import { validatePassword } from "utils/validatePassword";
import { useDispatch, useSelector } from "react-redux";
import { adminLogin } from "redux/slice/AuthSlice";
import { Navigate, useNavigate } from "react-router-dom";

function Basic() {
  const { adminInfo } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const isFormValid = () => {
    let isValid = true;
    let cloneErrors = { ...errors };
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

  const handleSubmit = async () => {
    if (!isFormValid()) {
      return;
    }

    await dispatch(adminLogin(formData)).then((res) => {
      if (res.payload.data?.success) {
        toast.success(res.payload.data.message, {
          autoClose: 2000,
        });
        navigate("/dashboard");
      } else {
        toast.error(res.payload.message || res.payload);
      }
    });
  };

  useEffect(() => {
    Object.values(errors).forEach((err) => {
      if (err) {
        toast.error(err);
      }
    });
  }, [errors]);

  return !adminInfo ? (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white">
            Sign in
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput
                id="email"
                type="email"
                label="Email"
                fullWidth
                value={formData.email}
                onChange={handleChange}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                id="password"
                type="password"
                label="Password"
                fullWidth
                value={formData.password}
                onChange={handleChange}
              />
            </MDBox>
            {/* <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Remember me
              </MDTypography>
            </MDBox> */}
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth onClick={handleSubmit}>
                sign in
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  ) : (
    <Navigate to={"/dashboard"} />
  );
}

export default Basic;
