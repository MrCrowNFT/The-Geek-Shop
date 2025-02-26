import { useMutation } from "@tanstack/react-query";
import { signupRequest } from "../api/auth";

export const useSignup = (onSuccessCallback) => {
  return useMutation({
    mutationFn: signupRequest,
    onSuccess: () => {
      onSuccessCallback(); // Call the success callback
    },
    onError: (error) => {
      console.error("Signup error:", error);
      throw error; // Let the component handle the error
    },
  });
};
