import { useState } from "react";

export const useProductForm = () => {
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

  return {
    newProduct,
    handleChange,
    handleNestedChange,
    handleArrayChange,
    setNewProduct,
  };
};
