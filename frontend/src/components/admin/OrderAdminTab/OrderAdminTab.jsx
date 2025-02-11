import { useState, useEffect } from "react";
import OrderListItem from "../OrderListItem/OrderListItem.jsx";
import "./OrderAdminTab.css";

const OrderAdminTab = () => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async (page = 1, limit = 20) => {
    setLoading(true);
    try {
      //need to check the route!!
      //Need to check how this works with the JWT
      const response = await fetch(
        `/admin/orders/search?page=${page}&limit=${limit}`
      );
      const data = await response.json();
      if (data.success) {
        setOrders(data.data);
        setTotalPages(data.pagination.totalPages);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      //setting load off
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders(currentPage);
  }, [currentPage]);

  // page nac handlers
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  return (
    <div className="orders-tab">
      <div className="orders-list">
        {loading ? (
          <p>Loading...</p>
        ) : (
          orders.map((product) => (
            <OrderListItem key={product._id} product={product} />
          ))
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
