import { useOrders } from "../../../hooks/useOrders.jsx";
import OrderListItem from "../OrderListItem/OrderListItem.jsx";
import "./OrderAdminTab.css";

const OrderAdminTab = () => {
  const {
    orders,
    loading,
    currentPage,
    totalPages,
    handleNextPage,
    handlePreviousPage,
  } = useOrders();

  return (
    <div className="orders-tab">
      <div className="orders-list">
        {loading ? (
          <p>Loading...</p>
        ) : (
          orders.map((order) => <OrderListItem key={order._id} order={order} />)
        )}
      </div>
      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default OrderAdminTab;
