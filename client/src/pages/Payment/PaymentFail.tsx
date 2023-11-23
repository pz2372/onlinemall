import React from "react";
import { Link } from "react-router-dom";

const PaymentFailed: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-red-600">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-20 h-20 mb-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
      <h2 className="text-2xl font-semibold">Payment Failed!</h2>
      <p className="mt-2 mb-6">
        We're sorry, there was a problem processing your payment.
      </p>
      <Link
        to="/"
        className="px-4 py-2 font-semibold text-white bg-red-600 rounded hover:bg-red-500"
      >
        Return to Home
      </Link>
    </div>
  );
};

export default PaymentFailed;
