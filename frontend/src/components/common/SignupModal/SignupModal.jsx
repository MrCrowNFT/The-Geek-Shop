import "./SignupModal.css";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const SignupModal = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState(null);

  const signupRequest = async ({ username, password }) => {
    try {
      const res = await axios.post(
        "http://localhost:5500/home/createAccount",
        {
          username,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Login response:", res.data);
      return res;
    } catch (err) {
      console.log("Full error:", err); // log full error object
      throw err;
    }
  };

  const signupMutation = useMutation({
    mutationFn: signupRequest,
    onSuccess: () => {
      setError(null);
    },
    onError: (error) => {
      console.error("Signup error:", error);
      setError(error.response?.data?.message || "Signup failed");
    },
  });

  const handleSignup = (e) => {
    e.preventDefault();

    if (password !== repeatPassword) {
      setError("Passwords do not match");
      return;
    }
    setError(null);
    signupMutation.mutate({ username, password });
  };
  return (
    <div className="user-signup-modal">
      <h1>Sign up</h1>
      <form onSubmit={handleSignup}>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Repeat Password"
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
        />
        <button type="submit" disabled={signupMutation.isPending}>
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignupModal;
