import Header from "../components/Header/Header.jsx";
import Navbar from "../components/NavBar/NavBar.jsx";
import BannerWrapper from "../components/BannerWrapper/BannerWrapper.jsx";

import "./Home.css";
import CardWrapper from "../components/CardWrapper/CardWrapper.jsx";
import CardWrapperMore from "../components/CardWrapper/CardWrapperMoreTab.jsx";
import Footer from "../components/Footer/Footer.jsx";

import ImageA from "../assets/images/ImageA.png";
import ImageB from "../assets/images/ImageB.png";
import ImageC from "../assets/images/ImageC.png";
import ImageD from "../assets/images/ImageD.png";

const mockProducts = [
  { id: 1, name: "Product 1", price: 19.99, description: "Description 1", images: [ImageA, ImageB] },
  { id: 2, name: "Product 2", price: 29.99, description: "Description 2", images: [ImageB, ImageA] },
  { id: 3, name: "Product 3", price: 29.99, description: "Description 3", images: [ImageC, ImageB] },
  { id: 4, name: "Product 4", price: 49.99, description: "Description 4", images: [ImageD, ImageC] },
  { id: 5, name: "Product 5", price: 59.99, description: "Description 5", images: [ImageA, ImageD] },
];

const mockProducts2 = [
  { id: 6, name: "Product 6", price: 69.99, description: "Description 6", images: [ImageA, ImageB] },
  { id: 7, name: "Product 7", price: 79.99, description: "Description 7", images: [ImageB, ImageA] },
  { id: 8, name: "Product 8", price: 89.99, description: "Description 8", images: [ImageC, ImageB] },
  { id: 9, name: "Product 9", price: 99.99, description: "Description 9", images: [ImageA, ImageD] },
]

const HomePage = () => {
  return (
    <>
      <Header />
      <Navbar/>
      <BannerWrapper/>
      <br/><br/>
      <h2>New Prodcuts</h2>
      <br/>
      <CardWrapper products={mockProducts}></CardWrapper>
      <br/>
      <CardWrapperMore products={mockProducts2}></CardWrapperMore>
      <br/>
      <br/><br/>
      <h2>Best Sellers</h2>
      <br/>
      <CardWrapper products={mockProducts}></CardWrapper>
      <br/>
      <CardWrapperMore products={mockProducts2}></CardWrapperMore>
      <br/>
      <Footer/>
    </>
  );
};

export default HomePage;
