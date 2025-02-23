import { useMutation } from "@tanstack/react-query";
import { createProductRequest } from "../api/products";

export const useCreateProduct = (onSuccessCallback) => {
  return useMutation({
    mutationFn: createProductRequest,
    onSuccess: () => {
      onSuccessCallback(); // Call the success callback
    },
    onError: (error) => {
      console.error("Create product error:", error);
      throw error; // Let the component handle the error
    },
  });
};
