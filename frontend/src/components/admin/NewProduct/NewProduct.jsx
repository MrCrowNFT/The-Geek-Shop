import { useState } from "react";
import { useCreateProduct } from "../hooks/useCreateProduct";
import styles from "./NewProduct.module.css";

const NewProduct = () => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [newProduct, setNewProduct] = useState({
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

  const createProductMutation = useCreateProduct(() => {
    setError(null);
    setSuccess(true);
    // Reset form after success
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
    // Clear success message after 3 seconds
    setTimeout(() => setSuccess(false), 3000);
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : parseFloat(value) || value,
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
    createProductMutation.mutate(newProduct, {
      onError: (error) => {
        setError(error.message);
        setSuccess(false);
      },
    });
  };

  return (
    <div className={styles.newProductContainer}>
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

        <div className={styles.formActions}>
          <button
            type="submit"
            disabled={createProductMutation.isPending}
            className={createProductMutation.isPending ? styles.loading : ""}
          >
            {createProductMutation.isPending ? "Adding..." : "Add Product"}
          </button>
        </div>

        {error && <div className={styles.errorMessage}>{error}</div>}
        {success && (
          <div className={styles.successMessage}>
            Product added successfully!
          </div>
        )}
      </form>
    </div>
  );
};

export default NewProduct;
