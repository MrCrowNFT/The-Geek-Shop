import ProductCard from "../ProductCard/ProductCard";
import PropTypes from "prop-types";
import "./CardWrapper.css";

//the idea would be for it to recieve an array of products, deconstruct them and pass
//them on to every Product Card
const CardWrapper = ({ products }) => {
  return (
    <div className="card-wrapper">
      <div className="upper-card-wrapper">
        {products.slice(0, 5).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className="lower-card-wrapper">
        {products.slice(5, 9).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
        <div className="more-tab">
          <a href="">See More →</a>
        </div>
      </div>
    </div>
  );
};

CardWrapper.propTypes = {
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

export default CardWrapper;
