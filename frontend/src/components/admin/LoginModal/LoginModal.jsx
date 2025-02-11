import "./LoginModal.css";
import PropTypes from "prop-types";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const LoginModal = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  //NEW WAY
  const loginRequest = async ({ username, password }) => {
    const res = await axios.post("http://localhost:5500/admin/login", {
      username,
      password,
    });
    return res;
  };

  const loginMutation = useMutation({
    mutationFn: loginRequest,
    onSuccess: (data) => {
      localStorage.setItem("jwt", data.data.token); // store the JWT
      setError(null);
      onLoginSuccess(); // Hide modal and show dashboard
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
  onLoginSuccess: PropTypes.func.isRequired, // Ensures it's a function and required
};

export default LoginModal;
