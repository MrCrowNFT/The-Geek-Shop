import "./LoginModal.css";
import PropTypes from "prop-types";
import { useState } from "react";

const LoginModal = ({onLoginSuccess}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError(""); // clear previous errors
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (data.success && data.token) {
        localStorage.setItem("jwt", data.token); // store the JWT
        onLoginSuccess(); // Hide modal and show dashboard 
      } else {
        setError(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Server error, please try again");
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Admin Login</h2>
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
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};

LoginModal.propTypes = {
  onLoginSuccess: PropTypes.func.isRequired, // Ensures it's a function and required
};

export default LoginModal;
