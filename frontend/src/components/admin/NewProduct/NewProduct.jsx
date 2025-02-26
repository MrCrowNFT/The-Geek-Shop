import { useCreateProduct } from "../../../hooks/useCreateProduct.jsx";
import { useProductForm } from "../../../hooks/useProductForm.jsx";
import FormInput from "./FormInput";
import FormCheckbox from "./FormCheckbox";
import FormTextarea from "./FormTextarea";
import styles from "./NewProduct.module.css";
import { useState } from "react";

const NewProduct = () => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const {
    newProduct,
    handleChange,
    handleNestedChange,
    handleArrayChange,
    setNewProduct,
  } = useProductForm();

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
        <FormInput
          label="Product Name"
          type="text"
          name="name"
          value={newProduct.name}
          onChange={handleChange}
          required
        />

        <div className="form-row">
          <FormInput
            label="Price"
            type="number"
            name="priceTag"
            value={newProduct.priceTag}
            onChange={handleChange}
            min="0"
            required
          />
          <FormInput
            label="SKU"
            type="number"
            name="sku"
            value={newProduct.sku || ""}
            onChange={handleChange}
          />
        </div>

        <div className="form-row">
          <FormInput
            label="Cost"
            type="number"
            value={newProduct.total_cost.cost}
            onChange={(e) => handleNestedChange(e, "total_cost", "cost")}
            min="0"
            required
          />
          <FormInput
            label="Shipping Cost"
            type="number"
            value={newProduct.total_cost.shipping}
            onChange={(e) => handleNestedChange(e, "total_cost", "shipping")}
            min="0"
            required
          />
        </div>

        <div className="form-row">
          <FormInput
            label="Discount Amount"
            type="number"
            value={newProduct.discount.amount}
            onChange={(e) => handleNestedChange(e, "discount", "amount")}
            min="0"
          />
          <FormCheckbox
            label="Apply Discount"
            checked={newProduct.discount.status}
            onChange={(e) => handleNestedChange(e, "discount", "status")}
          />
        </div>

        <FormInput
          label="Product URL"
          type="text"
          value={newProduct.urls[0].url}
          onChange={(e) =>
            handleArrayChange(0, "urls", { url: e.target.value })
          }
        />

        <FormCheckbox
          label="Available"
          checked={newProduct.isAvailable}
          onChange={handleChange}
          name="isAvailable"
        />

        <FormInput
          label="Image URL"
          type="text"
          value={newProduct.images[0]}
          onChange={(e) => handleArrayChange(0, "images", e.target.value)}
          required
        />

        <FormTextarea
          label="Description"
          name="description"
          value={newProduct.description}
          onChange={handleChange}
        />

        <FormInput
          label="Category ID"
          type="text"
          value={newProduct.category[0]}
          onChange={(e) => handleArrayChange(0, "category", e.target.value)}
        />

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
