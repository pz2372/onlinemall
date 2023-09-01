import React, { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import plus from "../assets/Plus.png";
import Button from "../components/Button";

const Register = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthdayMonth, setBirthdayMonth] = useState("01");
  const [birthdayDay, setBirthdayDay] = useState("01");
  const [birthdayYear, setBirthdayYear] = useState("2015");
  const [gender, setGender] = useState("Male");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  let years = [];
  for (let i = 2015; i > 1940; i--) {
    years.push(<option value={i}>{i}</option>);
  }
  let days = [];
  for (let i = 1; i < 32; i++) {
    days.push(<option value={i}>{i}</option>);
  }

  const handleFirstNameChange = (event: any) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event: any) => {
    setLastName(event.target.value);
  };

  const handleBirthdayDayChange = (event: any) => {
    setBirthdayDay(event.target.value);
  };

  const handleBirthdayMonthChange = (event: any) => {
    setBirthdayMonth(event.target.value);
  };

  const handleBirthdayYearChange = (event: any) => {
    setBirthdayYear(event.target.value);
  };

  const handleGenderChange = (event: any) => {
    setGender(event.target.value);
  };

  const handlePhoneChange = (event: any) => {
    let input = event.target.value.replace(/\D/g, ''); // Remove all non-digit characters
    const formattedPhone = formatPhoneNumber(input);
    setPhone(formattedPhone);
  };

  const formatPhoneNumber = (input: any) => {
    if (input.length > 10) {
      // Limit the input to a maximum of 10 digits
      input = input.substring(0, 10);
    }
    if (input.length > 6) {
      return `(${input.substring(0, 3)}) ${input.substring(3, 6)}-${input.substring(6)}`;
    } else if (input.length > 3) {
      return `(${input.substring(0, 3)}) ${input.substring(3)}`;
    } else {
      return input;
    }
  };

  const handleEmailChange = (event: any) => {
    setEmail(event.target.value);
  };

  const handleUsernameChange = (event: any) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: any) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();

    if(!validateForm()) {
      return;
    }

    const jsonData = JSON.stringify({
      firstName: firstName,
      lastName: lastName,
      birthday: birthdayYear + "-" + birthdayMonth + "-" + birthdayDay,
      gender: gender,
      phone: phone,
      email: email,
      username: username,
      password: password,
    });

    fetch("/createUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonData,
    }).then((response) => {
      if (response.ok) {
        // User created successfully
        setErrorMessage('');
      } else {
        // Error occurred, parse the error message from the response
        response.json().then((data) => {
          setErrorMessage(data.error || 'An error occurred');
        });
      }
    })
    .catch((error) => {
      console.error('Network error:', error);
      setErrorMessage('Network error');
    });
  };

  const validateForm = () => {
    if (phone.length != 14) {
      setErrorMessage("Phone number is not valid")
      return false;
    }
    if (!emailRegex.test(email)) {
      setErrorMessage("Email is not valid")
      return false;
    }
    if (password.length < 8) {
      setErrorMessage("Password is too short")
      return false;
    } else if (!(/[A-Z]/.test(password))) {
      setErrorMessage("Password needs a capital letter")
      return false;
    } else if (!(/\d/.test(password))) {
      setErrorMessage("Password needs a number")
      return false;
    } else if (!(/[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(password))) {
      setErrorMessage("Password needs a special character")
      return false;
    } else if (!(/[a-z]/.test(password))) {
      setErrorMessage("Password needs a lowercase letter")
      return false;
    }

    return true
  }

  return (
    <div className="flex py-2 pt-40">
      <div className="flex-1">
        <img src={plus} className="" />
      </div>
      <div className="flex-1 justify-between gap-6 p-20">
        <div>
          <p>{errorMessage}</p>
        </div>
        <div className="items-center gap-3 ">
          {/* First Name */}
          <p className="text-categoryText md:text-base text-sm">First Name:</p>
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={handleFirstNameChange}
            className="bg-transparent outline-none border border-dashboardBorder rounded-lg px-4 py-2 md:text-base text-sm inline"
            required
          />
          {/* Last Name */}
          <p className="text-categoryText md:text-base text-sm">Last Name:</p>
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={handleLastNameChange}
            className="bg-transparent outline-none border border-dashboardBorder rounded-lg px-4 py-2 md:text-base text-sm inline"
            required
          />
        </div>
        <div className="items-center gap-3">
          <p className="text-categoryText md:text-base text-sm">Birthday:</p>
          {/* Month */}
          <select
            value={birthdayMonth}
            onChange={handleBirthdayMonthChange}
            className="bg-transparent outline-none border border-dashboardBorder rounded-lg px-4 py-2 md:text-base text-sm inline"
          >
            <option value="01">Jan</option>
            <option value="02">Feb</option>
            <option value="03">Mar</option>
            <option value="04">Apr</option>
            <option value="05">May</option>
            <option value="06">Jun</option>
            <option value="07">Jul</option>
            <option value="08">Aug</option>
            <option value="09">Sep</option>
            <option value="10">Oct</option>
            <option value="11">Nov</option>
            <option value="12">Dec</option>
          </select>
          {/* Days */}
          <select
            value={birthdayDay}
            onChange={handleBirthdayDayChange}
            className="bg-transparent outline-none border border-dashboardBorder rounded-lg px-4 py-2 md:text-base text-sm inline"
          >
            {days}
          </select>
          {/* Years */}
          <select
            value={gender}
            onChange={handleBirthdayYearChange}
            className="bg-transparent outline-none border border-dashboardBorder rounded-lg px-4 py-2 md:text-base text-sm inline"
          >
            {years}
          </select>
          {/* Gender */}
          <p className="text-categoryText md:text-base text-sm">Gender:</p>
          <select
            value={gender}
            onChange={handleGenderChange}
            className="bg-transparent outline-none border border-dashboardBorder rounded-lg px-4 py-2 md:text-base text-sm inline"
          >
            <option value={"male"}> Male</option>
            <option value={"female"}>Female</option>
            <option value={"female"}>Other</option>
          </select>
        </div>
        <div className="items-center gap-3">
          {/* Telephone */}
          <p className="text-categoryText md:text-base text-sm">
            Phone Number:
          </p>
          <input
            type="tel"
            placeholder="Phone Number"
            pattern="([0-9]{3})[0-9]{3}-[0-9]{4}"
            value={phone}
            onChange={handlePhoneChange}
            maxLength={14}
            className="bg-transparent outline-none border border-dashboardBorder rounded-lg px-4 py-2 md:text-base text-sm"
          />
        </div>
        <div className="items-center gap-3">
          {/* Email */}
          <p className="text-categoryText md:text-base text-sm">Email:</p>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
            className="bg-transparent outline-none border border-dashboardBorder rounded-lg px-4 py-2 md:text-base text-sm"
            required
          />
        </div>
        <div className="items-center gap-3">
          {/* Username */}
          <p className="text-categoryText md:text-base text-sm">Username:</p>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={handleUsernameChange}
            className="bg-transparent outline-none border border-dashboardBorder rounded-lg px-4 py-2 md:text-base text-sm"
            required
          />
        </div>
        <div className="items-center gap-3">
          {/* Password */}
          <p className="text-categoryText md:text-base text-sm">Password:</p>
          <input
            type="text"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            className="bg-transparent outline-none border border-dashboardBorder rounded-lg px-4 py-2 md:text-base text-sm"
            required
          />
        </div>
        <br />
        <div className="flex flex-col items-center">
          <Button
            type={"submit"}
            text={"Create Account"}
            bgColorCode={"green"}
            onClick={handleSubmit}
          />
          <a href="/login" className="p-2 text-blue-800">
            Already Have An Account
          </a>
        </div>
      </div>
    </div>
  );
};

export default Register;
