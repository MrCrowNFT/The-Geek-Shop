import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import Navbar from "../components/NavBar/NavBar";
import ProductCard from "../components/ProductCard/ProductCard";

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
      </div>
      <Footer />
    </>
  );
};

export default SearchPage;
