import { TUser } from "../types/users.type";
import { TProduct } from "../types/products.type";
import { useDispatch } from "react-redux";

import { AppDispatch } from "../redux/store";
import { createCheckoutSession } from "../redux/slice/PaymentSlice";

const usePayment = () => {
  const dispatch = useDispatch<AppDispatch>();

  const createPayment = async ({
    customer,
    products,
    formData,
  }: {
    customer: TUser | null;
    products: TProduct[] | null;
    formData: any;
  }) => {
    // create checkout session

    if (!customer || !products) {
      return;
    }

    const { payload: result } = await dispatch(
      createCheckoutSession({
        customerId: customer?._id,
        customerEmail: customer?.email,
        products: products,
        successUrl: `${window.location.origin}/payment/success`,
        cancelUrl: `${window.location.origin}/payment/fail`,
        formData: formData,
      })
    );

    return result;
  };

  return {
    createPayment,
  };
};

export default usePayment;
