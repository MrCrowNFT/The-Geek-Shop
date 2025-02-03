import "./OrderListItem.css";
import PropTypes from "prop-types";

const OrderListItem = ({ order }) => {
  return (
    <div>
      <a>
        <p>{order.id}</p>
        <p>{order.costumer.name}</p>
        <p>{order.details.paid_amount}</p>
      </a>
    </div>
  );
};

OrderListItem.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    costumer: PropTypes.shape({
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
      run: PropTypes.string.isRequired,
    }).isRequired,
    details: PropTypes.shape({
      paid_amount: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};

export default OrderListItem;
