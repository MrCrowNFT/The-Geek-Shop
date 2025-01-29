import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import Navbar from "../components/NavBar/NavBar";

//this will recieve the products requested from the query
const SearchPage = () => {
  return (
    <>
        <Header/>
        <Navbar/>
        <div className="content">
            <div></div>  
            <div></div>  
        </div>
        <Footer/>
    </>
  );
};

export default SearchPage;
