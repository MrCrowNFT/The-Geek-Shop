import { useState, useEffect } from "react";

export const useOrders = () => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async (page = 1, limit = 20) => {
    setLoading(true);
    try {
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
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders(currentPage); 
  }, [currentPage]);

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

  return {
    orders,
    loading,
    currentPage,
    totalPages,
    handleNextPage,
    handlePreviousPage,
  };
};
