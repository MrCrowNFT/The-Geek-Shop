import "./ProductListItem.css";
import PropTypes from "prop-types";

const ProducListItem = (product) => {
  return (
    <div className="product">
      <a href="">
        <div className="product-info">
          <img src={product.images[0]} alt={product.name} />
          <p>{product.name}</p>
          <p>${product.price}</p>
        </div>
      </a>
    </div>
  );
};

ProducListItem.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default ProducListItem;
