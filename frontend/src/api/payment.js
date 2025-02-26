import axios from "axios";

export const createPaymentIntent = async ({ amount, currency }) => {
  const { data } = await axios.post(
    "http://localhost:5500/create-payment-intent",
    {
      amount,
      currency,
    }
  );
  return data.clientSecret;
};
