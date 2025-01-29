import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import Navbar from "../components/NavBar/NavBar";
import ProductCard from "../components/ProductCard/ProductCard";

//this will recieve the products requested from the query
const SearchPage = (products) => {
  return (
    <>
        <Header/>
        <Navbar/>
        <div className="content">
            <div className="search-options"></div>  
            <div className="result-products">
                {products.slice(0, 20).map((product) => (
                          <ProductCard key={product.id} product={product} />
                        ))}
                </div>  
        </div>
        <Footer/>
    </>
  );
};

export default SearchPage;
