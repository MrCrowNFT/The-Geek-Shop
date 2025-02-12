import "./NewProduct.css";
import { useState } from "react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";

const NewProduct = () => {
  const [error, setError] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: "",
    priceTag: 0,
    total_cost: {
      cost: 0,
      shipping: 0,
    },
    discount: {
      amount: 0,
      status: false,
    },
    sku: null,
    urls: [{ url: "", priority: 1 }],
    isAvailable: false,
    images: [""],
    description: "",
    category: [""],
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const createProductHandler = (e) => {
    e.preventDefault();
    createProductMutation.mutate(newProduct);
  };

  return (
    <div>
      <form onSubmit={createProductHandler}>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={handleChange}
        />

        <input
          type="number"
          name="priceTag"
          placeholder="Price"
          value={newProduct.priceTag}
          onChange={handleChange}
        />

        <input
          type="number"
          name="total_cost.cost"
          placeholder="Cost"
          value={newProduct.total_cost.cost}
          onChange={(e) =>
            setNewProduct((prev) => ({
              ...prev,
              total_cost: { ...prev.total_cost, cost: e.target.value },
            }))
          }
        />

        <input
          type="number"
          name="total_cost.shipping"
          placeholder="Shipping Cost"
          value={newProduct.total_cost.shipping}
          onChange={(e) =>
            setNewProduct((prev) => ({
              ...prev,
              total_cost: { ...prev.total_cost, shipping: e.target.value },
            }))
          }
        />

        <input
          type="number"
          name="discount.amount"
          placeholder="Discount Amount"
          value={newProduct.discount.amount}
          onChange={(e) =>
            setNewProduct((prev) => ({
              ...prev,
              discount: { ...prev.discount, amount: e.target.value },
            }))
          }
        />

        <input
          type="checkbox"
          name="discount.status"
          checked={newProduct.discount.status}
          onChange={(e) =>
            setNewProduct((prev) => ({
              ...prev,
              discount: { ...prev.discount, status: e.target.checked },
            }))
          }
        />
        <label>Discount Active</label>

        <input
          type="number"
          name="sku"
          placeholder="SKU"
          value={newProduct.sku}
          onChange={handleChange}
        />

        <input
          type="text"
          name="urls[0].url"
          placeholder="URL"
          value={newProduct.urls[0].url}
          onChange={(e) => {
            const updatedUrls = [...newProduct.urls];
            updatedUrls[0].url = e.target.value;
            setNewProduct({ ...newProduct, urls: updatedUrls });
          }}
        />

        <input
          type="checkbox"
          name="isAvailable"
          checked={newProduct.isAvailable}
          onChange={handleChange}
        />
        <label>Available</label>

        <input
          type="text"
          name="images[0]"
          placeholder="Image URL"
          value={newProduct.images[0]}
          onChange={(e) => {
            const updatedImages = [...newProduct.images];
            updatedImages[0] = e.target.value;
            setNewProduct({ ...newProduct, images: updatedImages });
          }}
        />

        <textarea
          name="description"
          placeholder="Description"
          value={newProduct.description}
          onChange={handleChange}
        />

        <input
          type="text"
          name="category[0]"
          placeholder="Category ID"
          value={newProduct.category[0]}
          onChange={(e) => {
            const updatedCategories = [...newProduct.category];
            updatedCategories[0] = e.target.value;
            setNewProduct({ ...newProduct, category: updatedCategories });
          }}
        />

        <button type="submit">Add Product</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};
export default NewProduct;
