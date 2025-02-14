import "./LoginModal.css";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const LoginModal = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const loginRequest = async ({ username, password }) => {
    try {
      const res = await axios.post(
        "http://localhost:5500/home/login",
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

  const loginMutation = useMutation({
    mutationFn: loginRequest,
    onSuccess: (data) => {
      localStorage.setItem("jwt", data.data.token); // store the JWT
      setError(null);
    },
    onError: (error) => {
      console.error("Login error:", error);
      setError(error.response?.data?.message || "Login failed");
    },
  });

  const handleLogin = (e) => {
    e.preventDefault();
    loginMutation.mutate({ username, password });
  };

  return (
    <div className="user-login-modal">
      <h1>Log In</h1>
      <form onSubmit={handleLogin}>
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
        <button type="submit" disabled={loginMutation.isPending}>
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginModal;
