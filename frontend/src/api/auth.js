import axios from "axios";

export const loginRequest = async ({ username, password }) => {
  try {
    const res = await axios.post(
      "http://localhost:5500/admin/login",
      { username, password },
      { headers: { "Content-Type": "application/json" } }
    );
    return res.data; // Return only the data
  } catch (err) {
    console.error("Login error:", err);
    throw err; // Re-throw to be handled by the caller
  }
};
