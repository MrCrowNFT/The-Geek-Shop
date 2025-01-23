import Header from "../components/Header/Header.jsx";
import Navbar from "../components/NavBar/NavBar.jsx";
import BannerWrapper from "../components/BannerWrapper/BannerWrapper.jsx";

import "./Home.css";

const HomePage = () => {
  return (
    <>
      <Header />
      <Navbar></Navbar>
      <BannerWrapper></BannerWrapper>
    </>
  );
};

export default HomePage;
