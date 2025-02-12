import { useState, useEffect } from "react";
import ProducListItem from "../ProductListItem/ProductListItem.jsx";
import "./ProductAdminTab.css";
import AddButtom from "../AddButton/AddButton.jsx";

const ProductAdminTab = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false); //to display while loading

  //fetch products
  const fetchProducts = async (page = 1, limit = 20) => {
    setLoading(true);
    try {
      //need to check the route!!
      const response = await fetch(`/home/search?page=${page}&limit=${limit}`);
      const data = await response.json();
      if (data.success) {
        setProducts(data.data);
        setTotalPages(data.pagination.totalPages);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      //setting load off
      setLoading(false);
    }
  };
  // fetch products when the component mounts or the page changes
  useEffect(() => {
    fetchProducts(currentPage);
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
    <div className="product-tab">
      <AddButtom/>
      <div className="product-list">
        {loading ? (
                    <p>Loading...</p>
                  ) : (
                    products.map((product) => (
                      <ProducListItem key={product._id} product={product} />
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
export default ProductAdminTab;
