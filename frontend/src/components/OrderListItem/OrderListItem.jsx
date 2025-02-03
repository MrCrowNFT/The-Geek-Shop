import "./OrderListItem.css";
import PropTypes from "prop-types";

const OrderListItem = ({ order }) => {
  return (
    <div className="order">
      <a href="">
        <div className="order-info">
        <p>{order.id}</p>
        <p><b>{order.costumer.name}</b></p>
        <p>{order.details.paid_amount}</p>
        <p>{order.status.state}</p>
        </div>
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
    status: PropTypes.shape({
      state: PropTypes.string.isRequired,
    }).isRequired,
    details: PropTypes.shape({
      paid_amount: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};

export default OrderListItem;
