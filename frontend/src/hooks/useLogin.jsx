import { useMutation } from "@tanstack/react-query";
import { loginRequest } from "../api/auth";

export const useLogin = (onSuccessCallback) => {
  return useMutation({
    mutationFn: loginRequest,
    onSuccess: (data) => {
      localStorage.setItem("jwt", data.token); // Store the JWT
      onSuccessCallback(); // Call the success callback
    },
    onError: (error) => {
      console.error("Login error:", error);
      throw error; // Let the component handle the error
    },
  });
};
