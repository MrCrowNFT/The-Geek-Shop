import { useState } from "react";
import PropTypes from "prop-types";
import {useCart} from "../../../hooks/useCart.js"
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  const [hovering, setHovering] = useState(false);
  const {addToCart} = useCart();

  return (
    <div
      className="product-card"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {/* Product Image Section */}
      <div className="image-container">
        <img
          className="product-image"
          src={product.images[0]}
          alt={product.name}
          style={{ opacity: hovering ? 0 : 1 }}
        />
        {product.images[1] && (
          <img
            className="product-image"
            src={product.images[1]}
            alt={`${product.name} - hover`}
            style={{ opacity: hovering ? 1 : 0 }}
          />
        )}
      </div>

      {/* Product Info Section */}
      <div className="product-info">
        <h2 className="product-name">{product.name}</h2>
        <p className="product-price">${product.price}</p>
        <button onClick={() => addToCart(product)}  className={`add-to-cart ${hovering ? "visible" : ""}`}>
          Add to cart →
        </button >
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
