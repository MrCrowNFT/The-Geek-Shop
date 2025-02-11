import Footer from "../components/common/Footer/Footer";
import Header from "../components/common/Header/Header";
import Navbar from "../components/common/NavBar/NavBar";
import ProductCard from "../components/common/ProductCard/ProductCard";
import "./SearchPage.css";

import { useEffect, useState } from "react";

//this will recieve the products requested from the query
const SearchPage = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  //fetch products from backend
  const fetchProducts = async (page = 1, limit = 20) => {
    setLoading(true);
    try {
      const response = await fetch(`/home/search?page=${page}&limit=${limit}`);
      const data = await response.json();
      if (data.success) {
        setProducts(data.data);
        setTotalPages(data.pagination.totalPages);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      //at the we want to set this off regardless of the response
      setLoading(false);
    }
  };

  // Fetch products when the component mounts or the page changes
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
    <>
      <Header />
      <Navbar />
      <div className="content">
        {/*Need to make the search options and include them on the search */}
        <div className="search-options"></div>
        <div className="result-products">
          {loading ? (
            <p>Loading...</p>
          ) : (
            products.map((product) => (
              <ProductCard key={product._id} product={product} />
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
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SearchPage;
