import Header from "../components/Header/Header.jsx";
import Navbar from "../components/NavBar/NavBar.jsx";
import BannerWrapper from "../components/BannerWrapper/BannerWrapper.jsx";

import "./Home.css";
import CardWrapper from "../components/CardWrapper/CardWrapper.jsx";

const mockProducts = [
  { id: 1, name: "Product 1", price: 19.99, description: "Description 1", images: ["/image1.jpg", "/image1-hover.jpg"] },
  { id: 2, name: "Product 2", price: 29.99, description: "Description 2", images: ["/image2.jpg"] },
  // Add 7 more product objects for testing
];

const HomePage = () => {
  return (
    <>
      <Header />
      <Navbar></Navbar>
      <BannerWrapper></BannerWrapper>
      <br></br>
      <h2>New Prodcuts</h2>
      <CardWrapper products={mockProducts}></CardWrapper>
    </>
  );
};

export default HomePage;
