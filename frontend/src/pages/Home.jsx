import Header from "../components/Header/Header.jsx";
import Navbar from "../components/NavBar/NavBar.jsx";
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
              <img className="upper-banner" loading="lazy" src="" alt="" />
            </a>
          </div>
          <div className="main-content-lower">
            <div className="main-content-lower-left">
              <a href="">
                <img
                  className="left-upper-lower-banner"
                  loading="lazy"
                  src=""
                  alt=""
                />
              </a>
              <a href="">
                <img
                  className="left-lower-lower-banner"
                  loading="lazy"
                  src=""
                  alt=""
                />
              </a>
            </div>
            <div className="main-content-lower-center">
              <a href="">
                <img
                  className="middle-lower-banner"
                  loading="lazy"
                  src=""
                  alt=""
                />
              </a>
            </div>
            <div className="main-content-lower-right">
              <a href="">
                <img
                  className="right-upper-lower-banner"
                  loading="lazy"
                  src=""
                  alt=""
                />
              </a>
              <a href="">
                <img
                  className="right-lower-lower-banner"
                  loading="lazy"
                  src=""
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
