import "./NewProduct.css";
import { useState } from "react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";

const NewProduct = () => {
  const [error, setError] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: "",
    priceTag: 0,
    total_cost: 0,
    discount: 0,
    sku: null,
    urls: [
      {
        url: "",
      },
    ],
    isAvailable: false,
    images: [
      {
        img: "",
      },
    ],
    description: "",
    category: [
      {
        category: "",
      },
    ],
  });

  const createProductRequest = async (newProduct) => {
    try {
      const res = await axios.post(
        "http://localhost:5500/admin/products/newproduct",
        newProduct,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Login response:", res.data);
      return res;
    } catch (error) {
      console.log("Full error:", error);
      throw error;
    }
  };

  const createProductMutation = useMutation({
    mutationFn: createProductRequest,
    onSuccess: () => {
      setError(null);
    },
    onError: (error) => {
      console.error("Create product error:", error);
      setError(error.response?.data?.message);
    },
  });

  const createProductHandler = (e) => {
    e.preventDefault();
    setNewProduct; //MISIGN SETTING THE PRODUCT AS THE INPUT VALUES
    createProductMutation.mutate(newProduct)
  };

  return (
    <div>
      <form onSubmit={createProductHandler}>
        {/*MISSING THE INPUTS FOR THE NEW PRODUCT OBJECT */}
        <input />
        <input />
        <input />
        <input />
        <input />
        <input />
        <input />
        <button type="submit">Add Product</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};
export default NewProduct;
