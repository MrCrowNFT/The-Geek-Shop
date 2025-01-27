import Header from "../components/Header/Header.jsx";
import Navbar from "../components/NavBar/NavBar.jsx";
import Slider from "../components/Slider/Slider.jsx";
import ImageA from "../assets/images/ImageA.png";
import ImageB from "../assets/images/ImageB.png";
import ImageC from "../assets/images/ImageC.png";
import ImageD from "../assets/images/ImageD.jpeg";
import CardWrapper from "../components/CardWrapper/CardWrapper.jsx";
import "./ProductPage.css";

const mockProducts = [
  {
    id: 1,
    name: "Product 1",
    price: 19.99,
    description: "Description 1",
    images: ["/image1.jpg", "/image1-hover.jpg"],
  },
  {
    id: 2,
    name: "Product 2",
    price: 29.99,
    description: "Description 2",
    images: ["/image2.jpg", "/image2-hover.jpg"],
  },
  {
    id: 3,
    name: "Product 3",
    price: 29.99,
    description: "Description 3",
    images: ["/image3.jpg", "/image3-hover.jpg"],
  },
  {
    id: 4,
    name: "Product 4",
    price: 49.99,
    description: "Description 4",
    images: ["/image4.jpg", "/image4-hover.jpg"],
  },
  {
    id: 5,
    name: "Product 5",
    price: 59.99,
    description: "Description 5",
    images: ["/image5.jpg", "/image5-hover.jpg"],
  },
  {
    id: 6,
    name: "Product 6",
    price: 69.99,
    description: "Description 6",
    images: ["/image6.jpg", "/image6-hover.jpg"],
  },
  {
    id: 7,
    name: "Product 7",
    price: 79.99,
    description: "Description 7",
    images: ["/image7.jpg", "/image7-hover.jpg"],
  },
  {
    id: 8,
    name: "Product 8",
    price: 89.99,
    description: "Description 8",
    images: ["/image8.jpg", "/image8-hover.jpg"],
  },
  {
    id: 9,
    name: "Product 9",
    price: 99.99,
    description: "Description 9",
    images: ["/image9.jpg", "/image9-hover.jpg"],
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
    </>
  );
};

export default ProductPage;
