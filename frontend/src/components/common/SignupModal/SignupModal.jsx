import { useState } from "react";
import { useSignup } from "../../../hooks/useSignup.jsx";
import styles from "./SignupModal.module.css";

const SignupModal = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState(null);

  const signupMutation = useSignup(() => {
    setError(null); // clear any previous errors
  });

  const handleSignup = (e) => {
    e.preventDefault();

    if (password !== repeatPassword) {
      setError("Passwords do not match");
      return;
    }

    setError(null); // clear any previous errors
    signupMutation.mutate({ username, password });
  };

  return (
    <div className={styles.userSignupModal}>
      <h1>Sign up</h1>
      <form onSubmit={handleSignup}>
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
        <input
          type="password"
          placeholder="Repeat Password"
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
        />
        <button
          type="submit"
          disabled={signupMutation.isPending}
          className={signupMutation.isPending ? styles.loading : ""}
        >
          {signupMutation.isPending ? "Signing up..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default SignupModal;
