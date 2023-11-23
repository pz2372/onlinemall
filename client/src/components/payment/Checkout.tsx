import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { toast } from "react-toastify";

import TextInput from "../TextInput";
import usePayment from "../../hooks/usePayment";
import { RootState } from "../../redux/store";
import { validateEmailAddress as validateEmail } from "../../utils/validateEmail";
import { validatePhoneNumber as validatePhone } from "../../utils/validatePhoneNumber";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY!);

const CheckoutForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    street1: "",
    street2: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    phone: "",
  });

  const { userInfo } = useSelector((state: RootState) => state.user as any);
  const { sessionId, loading, error } = useSelector(
    (state: RootState) => state.payment
  );

  const location = useLocation();

  const products = useMemo(() => location.state?.products, [location.state]);

  const { createPayment } = usePayment();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value || "",
    }));
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate email
    if (formData.email && !validateEmail(formData.email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Invalid email address",
      }));
      return;
    }

    // Validate phone number
    if (formData.phone && !validatePhone(formData.phone)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        phone: "Invalid phone number",
      }));
      return;
    }

    // Clear any previous errors
    setErrors({
      email: "",
      phone: "",
    });

    if (!userInfo) {
      toast.error("You must be logged in to checkout");
      return;
    }

    // check if cart is empty
    if (!products || products.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    // Create payment
    await createPayment({
      customer: userInfo || null,
      products: products || null,
      formData: formData || null,
    });
  };

  useEffect(() => {
    if (sessionId && !loading && !error) {
      localStorage.setItem("stripeSessionId", sessionId);

      stripePromise.then((stripe) => {
        stripe?.redirectToCheckout({
          sessionId: sessionId,
        });
      });
    }
    if (!products || products.length === 0) {
      window.location.href = "/card";
    }
  }, [sessionId, loading, error, products]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <Elements stripe={stripePromise}>
      <form
        name="checkout-form"
        className="max-w-md mx-auto mt-8 mb-8"
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-2 gap-4">
          {/* Left column */}
          <div>
            <TextInput
              name="name"
              label="Name"
              lblClassName="block mb-2 text-sm font-medium text-gray-600"
              className="mb-4"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <TextInput
              name="email"
              label="Email"
              lblClassName="block mb-2 text-sm font-medium text-gray-600"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              required
            />
          </div>

          {/* Right column */}
          <div>
            <TextInput
              name="company"
              label="Company"
              lblClassName="block mb-2 text-sm font-medium text-gray-600"
              className="mb-4"
              value={formData.company}
              onChange={handleChange}
              required
            />
            <TextInput
              name="phone"
              label="Phone"
              lblClassName="block mb-2 text-sm font-medium text-gray-600"
              value={formData.phone}
              onChange={handleChange}
              error={errors.phone}
              required
            />
          </div>
        </div>

        {/* street address fields */}
        <TextInput
          name="street1"
          label="Street Address1"
          lblClassName="block mt-4 mb-2 text-sm font-medium text-gray-600"
          value={formData.street1}
          onChange={handleChange}
          required
        />
        <TextInput
          name="street2"
          label="Street Address2"
          lblClassName="block mt-4 mb-2 text-sm font-medium text-gray-600"
          value={formData.street2}
          onChange={handleChange}
        />

        {/* city, state, zip fields */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <TextInput
              name="city"
              label="City"
              lblClassName="block mt-4 mb-2 text-sm font-medium text-gray-600"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <TextInput
              name="state"
              label="State"
              lblClassName="block mt-4 mb-2 text-sm font-medium text-gray-600"
              value={formData.state}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <TextInput
              name="zip"
              label="Zip"
              lblClassName="block mt-4 mb-2 text-sm font-medium text-gray-600"
              value={formData.zip}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* country field */}
        <TextInput
          name="country"
          label="Country"
          lblClassName="block mt-4 mb-2 text-sm font-medium text-gray-600"
          value={formData.country}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="mt-4 px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
        >
          Confirm & Pay
        </button>
      </form>
    </Elements>
  );
};

export default CheckoutForm;
