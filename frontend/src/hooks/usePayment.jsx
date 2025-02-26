import createPaymentIntent from "../api/payment.js";
import { useMutation } from "@tanstack/react-query";

export const usePaymentIntent = () => {
  return useMutation(createPaymentIntent);
};
