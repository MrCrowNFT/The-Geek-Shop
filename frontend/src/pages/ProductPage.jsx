import Header from "../components/Header/Header.jsx";
import Navbar from "../components/NavBar/NavBar.jsx";
import Slider from "../components/Slider/Slider.jsx";
import ImageA from "../assets/images/ImageA.png";
import ImageB from "../assets/images/ImageB.png";
import ImageC from "../assets/images/ImageC.png";
import ImageD from "../assets/images/ImageD.png";
import CardWrapper from "../components/CardWrapper/CardWrapper.jsx";
import "./ProductPage.css";
import Footer from "../components/Footer/Footer.jsx";

const mockProducts = [
  {
    id: 1,
    name: "Product 1",
    price: 19.99,
    description: "Description 1",
    images: [ImageC, ImageD, ImageA],
  },
  {
    id: 2,
    name: "Product 2",
    price: 29.99,
    description: "Description 2",
    images: [ImageB, ImageC, ImageD],
  },
  {
    id: 3,
    name: "Product 3",
    price: 29.99,
    description: "Description 3",
    images: [ImageA, ImageB, ImageC],
  },
  {
    id: 4,
    name: "Product 4",
    price: 49.99,
    description: "Description 4",
    images: [ImageD, ImageA, ImageB],
  },
  {
    id: 5,
    name: "Product 5",
    price: 59.99,
    description: "Description 5",
    images: [ImageC, ImageD, ImageA],
  },
];

const mockProduct = {
  id: 1,
  name: "Product 1",
  price: 19.99,
  description: "Description 1",
  images: [ImageA, ImageB, ImageC, ImageD],
};
const ProductPage = () => {
  return (
    <>
      <Header />
      <Navbar />
      <div className="product-page">
        <div className="product-page-slider">
          <Slider images={mockProduct.images}></Slider>
        </div>
        <div className="product-page-info">
          <h2>{mockProduct.name}</h2>
          <h1>{mockProduct.price}</h1>
          <p>{mockProduct.description}</p>
        </div>
      </div>
      <br/>
      <br/>
      <h2>Related Products</h2>
      <br/>
      <CardWrapper products={mockProducts}></CardWrapper>
      <Footer></Footer>
    </>
  );
};

export default ProductPage;
