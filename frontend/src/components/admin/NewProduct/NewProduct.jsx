import "./NewProduct.css";
import { useState } from "react";

const NewProduct = () => {
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
    //not sure how to do this one
    category: [
      {
        category: "",
      },
    ],
  });

  const createProduct = () => {};

  return (
    <div>
      <form onSubmit={createProduct}>
        <input />
        <input />
        <input />
        <input />
        <input />
        <input />
        <input />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};
export default NewProduct;
