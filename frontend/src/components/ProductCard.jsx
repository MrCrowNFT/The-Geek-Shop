import PropTypes from "prop-types";

const ProductCard = ({ product }) => {
    return (
      <div>
        <img
          src={product.images[0]}
          alt={product.name}
        />
        <div >
          <h2 >{product.name}</h2>
          <div >
            <span >${product.price}</span>
            <button >
              Buy Now
            </button>
          </div>
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