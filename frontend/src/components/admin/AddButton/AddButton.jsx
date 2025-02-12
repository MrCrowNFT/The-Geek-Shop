import "./AddButton.css";
import NewProduct from "../NewProduct/NewProduct.jsx";
import { useState } from "react";

const AddButtom = () => {
  const [showNewProduct, setShowNewProduct] = useState(false);

  const toggleNewProduct = () => setShowNewProduct((prev) => !prev);

  return (
    <div>
      <button className="open-modal-button" onClick={toggleNewProduct}>
        Add New Product
      </button>

      {showNewProduct && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-modal-button" onClick={toggleNewProduct}>
              Close
            </button>
            <NewProduct />
          </div>
        </div>
      )}
    </div>
  );
};

export default AddButtom;
