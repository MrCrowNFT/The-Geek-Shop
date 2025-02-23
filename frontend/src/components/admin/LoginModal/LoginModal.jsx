import { useState } from "react";
import PropTypes from "prop-types";
import { useLogin } from "../../hooks/useLogin.tsx";
import styles from "./LoginModal.module.css";

const LoginModal = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const loginMutation = useLogin(onLoginSuccess);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await loginMutation.mutateAsync({ username, password });
      setError(null); // Clear any previous errors
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2>Admin Login</h2>
        <form onSubmit={handleLogin}>
          {error && <p className={styles.error}>{error}</p>}
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
            {loginMutation.isPending ? "Logging in..." : "Login"}
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
