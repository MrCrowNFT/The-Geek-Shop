import "./LoginModal.css";
import PropTypes from "prop-types";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const LoginModal = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const loginRequest = async ({ username, password }) => {
    try {
      const res = await axios.post(
        "http://localhost:5500/admin/login",
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
      throw err; // Re-throw to be handled by the mutation
    }
  };

  const loginMutation = useMutation({
    mutationFn: loginRequest,
    onSuccess: (data) => {
      localStorage.setItem("jwt", data.data.token); // store the JWT
      setError(null);
      onLoginSuccess(); // hide modal and show dashboard
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
    <div className="modal">
      <div className="modal-content">
        <h2>Admin Login</h2>
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
    </div>
  );
};

LoginModal.propTypes = {
  onLoginSuccess: PropTypes.func.isRequired, 
};

export default LoginModal;
