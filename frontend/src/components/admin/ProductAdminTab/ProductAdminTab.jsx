import { useProducts } from "../../../hooks/useProducts.js";
import ProducListItem from "../ProductListItem/ProductListItem.jsx";
import AddButtom from "../AddButton/AddButton.jsx";
import "./ProductAdminTab.css";

const ProductAdminTab = () => {
  const {
    products,
    loading,
    currentPage,
    totalPages,
    handleNextPage,
    handlePreviousPage,
  } = useProducts();

  return (
    <div className="product-tab">
      <AddButtom />
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