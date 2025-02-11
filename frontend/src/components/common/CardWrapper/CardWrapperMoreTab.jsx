import ProductCard from "../ProductCard/ProductCard";
import PropTypes from "prop-types";
import "./CardWrapper.css";

const CardWrapperMore = ({ products }) => {
  return (
    <div className="card-wrapper">
      <div className="lower-card-wrapper">
        {products.slice(0, 4).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
        <div className="more-tab">
          <a href="">See More →</a>
        </div>
      </div>
    </div>
  );
};

CardWrapperMore.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      images: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ).isRequired,
};

export default CardWrapperMore;
