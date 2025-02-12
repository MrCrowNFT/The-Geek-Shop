import "./NewProduct.css";
import { useState } from "react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";

const NewProduct = () => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
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
      return res.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to create product"
      );
    }
  };

  const createProductMutation = useMutation({
    mutationFn: createProductRequest,
    onSuccess: () => {
      setError(null);
      setSuccess(true);
      // reset form after success
      setNewProduct({
        name: "",
        priceTag: 0,
        total_cost: { cost: 0, shipping: 0 },
        discount: { amount: 0, status: false },
        sku: null,
        urls: [{ url: "", priority: 1 }],
        isAvailable: false,
        images: [""],
        description: "",
        category: [""],
      });
      // clear success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    },
    onError: (error) => {
      setError(error?.message);
      setSuccess(false);
    },
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : parseFloat(value) || value, //if input is a checkbox, sets the state to checked (t/f).
    }));
  };

  const handleNestedChange = (e, parent, field) => {
    const { value, type, checked } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: type === "checkbox" ? checked : parseFloat(value) || value,
      },
    }));
  };

  const handleArrayChange = (index, field, value) => {
    setNewProduct((prev) => {
      const updatedArray = [...prev[field]];
      if (typeof updatedArray[index] === "object") {
        updatedArray[index] = { ...updatedArray[index], ...value };
      } else {
        updatedArray[index] = value;
      }
      return { ...prev, [field]: updatedArray };
    });
  };

  const createProductHandler = (e) => {
    e.preventDefault();
    createProductMutation.mutate(newProduct);
  };
  return (
    <div className="new-product-container">
      <h2>Add New Product</h2>
      <form onSubmit={createProductHandler}>
        <div className="form-group">
          <label>Product Name:</label>
          <input
            type="text"
            name="name"
            value={newProduct.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Price:</label>
            <input
              type="number"
              name="priceTag"
              value={newProduct.priceTag}
              onChange={handleChange}
              min="0"
              required
            />
          </div>

          <div className="form-group">
            <label>SKU:</label>
            <input
              type="number"
              name="sku"
              value={newProduct.sku || ""}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Cost:</label>
            <input
              type="number"
              value={newProduct.total_cost.cost}
              onChange={(e) => handleNestedChange(e, "total_cost", "cost")}
              min="0"
              required
            />
          </div>

          <div className="form-group">
            <label>Shipping Cost:</label>
            <input
              type="number"
              value={newProduct.total_cost.shipping}
              onChange={(e) => handleNestedChange(e, "total_cost", "shipping")}
              min="0"
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Discount Amount:</label>
            <input
              type="number"
              value={newProduct.discount.amount}
              onChange={(e) => handleNestedChange(e, "discount", "amount")}
              min="0"
            />
          </div>

          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                checked={newProduct.discount.status}
                onChange={(e) => handleNestedChange(e, "discount", "status")}
              />
              Apply Discount
            </label>
          </div>
        </div>

        <div className="form-group">
          <label>Product URL:</label>
          <input
            type="text"
            value={newProduct.urls[0].url}
            onChange={(e) =>
              handleArrayChange(0, "urls", { url: e.target.value })
            }
          />
        </div>

        <div className="form-group checkbox-group">
          <label>
            <input
              type="checkbox"
              checked={newProduct.isAvailable}
              onChange={(e) => handleChange(e)}
              name="isAvailable"
            />
            Available
          </label>
        </div>

        <div className="form-group">
          <label>Image URL:</label>
          <input
            type="text"
            value={newProduct.images[0]}
            onChange={(e) => handleArrayChange(0, "images", e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Description:</label>
          <textarea
            name="description"
            value={newProduct.description}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Category ID:</label>
          <input
            type="text"
            value={newProduct.category[0]}
            onChange={(e) => handleArrayChange(0, "category", e.target.value)}
          />
        </div>

        <div className="form-actions">
          <button
            type="submit"
            disabled={createProductMutation.isPending}
            className={createProductMutation.isPending ? "loading" : ""}
          >
            {createProductMutation.isPending ? "Adding..." : "Add Product"}
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}
        {success && (
          <div className="success-message">Product added successfully!</div>
        )}
      </form>
    </div>
  );
};

export default NewProduct;
