import React, { useState } from "react";
import PropTypes from "prop-types";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  const [hovering, setHovering] = useState(false);

  return (
    <div
      className="product-card"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {/* Product Image Section */}
      <div className="image-container">
        <img
          className={`product-image ${hovering ? "hidden" : ""}`}
          src={product.images[0]}
          alt={product.name}
        />
        {product.images[1] && (
          <img
            className={`product-image ${hovering ? "visible" : ""}`}
            src={product.images[1]}
            alt={`${product.name} - hover`}
          />
        )}
      </div>

      {/* Product Info Section */}
      <div className="product-info">
        <h2 className="product-name">{product.name}</h2>
        <p className="product-price">${product.price}</p>
        <a href="#" className={`add-to-cart ${hovering ? "visible" : ""}`}>
          Add to cart →
        </a>
      </div>
    </div>
  );
};

  ProductCard.propTypes = {
    product: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      images: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,
  };
  
  export default ProductCard;