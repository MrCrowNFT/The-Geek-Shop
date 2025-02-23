import axios from "axios";

export const createProductRequest = async (newProduct) => {
  try {
    const res = await axios.post(
      "http://localhost:5500/admin/products/newproduct",
      newProduct,
      { headers: { "Content-Type": "application/json" } }
    );
    return res.data; // Return only the data
  } catch (error) {
    console.error("Create product error:", error);
    throw new Error(
      error.response?.data?.message || "Failed to create product"
    );
  }
};
