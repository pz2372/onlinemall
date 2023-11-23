import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { productPurchaseStatus } from "../../redux/slice/ProductSlice";

const PaymentSuccess = () => {
  const dispatch = useDispatch();
  const { sessionId: id } = useSelector((state: RootState) => state.payment);

  useEffect(() => {
    const sessionId = (localStorage.getItem("stripeSessionId") as string) || id;

    if (!sessionId) return;

    dispatch<any>(
      productPurchaseStatus({
        sessionId: sessionId,
      })
    );
  }, [dispatch, id]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-green-600">
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
          d="M5 13l4 4L19 7"
        />
      </svg>
      <h2 className="text-2xl font-semibold">Payment Successful!</h2>
      <p className="mt-2 mb-6">Thank you for your purchase!</p>
      <Link
        to="/"
        className="px-4 py-2 font-semibold text-white bg-green-600 rounded hover:bg-green-500"
      >
        Return to Home
      </Link>
    </div>
  );
};

export default PaymentSuccess;
