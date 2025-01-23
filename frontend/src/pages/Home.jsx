import Header from "../components/Header/Header.jsx";
import Navbar from "../components/NavBar/NavBar.jsx";
import BannerA from "../assets/images/Testing-Banner(A)(2000x500).png";
import BannerB from "../assets/images/Testing-Banner(B).png";
import BannerC from "../assets/images/Testing-Banner(C).jpg";
import BannerD from "../assets/images/Testing-Banner(D)(2000x1000).png";
import "./Home.css";

const HomePage = () => {
  return (
    <>
      <Header />
      <Navbar></Navbar>
      <div className="main">
        <div className="main-content">
          <div className="main-content-upper">
            <a href="">
              <img
                className="upper-banner"
                loading="lazy"
                src={BannerA}
                alt="Banner A"
              />
            </a>
          </div>
          <div className="main-content-lower">
            <div className="main-content-lower-left">
              <a href="">
                <img
                  className="left-upper-lower-banner"
                  loading="lazy"
                  src={BannerC}
                  alt=""
                />
              </a>
              <a href="">
                <img
                  className="left-lower-lower-banner"
                  loading="lazy"
                  src={BannerD}
                  alt=""
                />
              </a>
            </div>
            <div className="main-content-lower-center">
              <a href="">
                <img
                  className="middle-lower-banner"
                  loading="lazy"
                  src={BannerB}
                  alt=""
                />
              </a>
            </div>
            <div className="main-content-lower-right">
              <a href="">
                <img
                  className="right-upper-lower-banner"
                  loading="lazy"
                  src={BannerD}
                  alt=""
                />
              </a>
              <a href="">
                <img
                  className="right-lower-lower-banner"
                  loading="lazy"
                  src={BannerC}
                  alt=""
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
