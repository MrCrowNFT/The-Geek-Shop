import Header from "../components/Header/Header.jsx"
import Navbar from "../components/NavBar/NavBar.jsx";

const HomePage = () => {
  return (
    <>
      <Header />
      <Navbar></Navbar>
      <div className="main">
        <div className="main-content">
          <div className="main-content-upper">
            <a>
              <img className="upper-banner" src="" alt="" />
            </a>
          </div>
          <div className="main-content-lower">
            <div className="main-content-lower-left">
              <a>
                <img className="left-upper-lower-banner" src="" alt="" />
                <img className="left-lower-lower-banner" src="" alt="" />
              </a>
            </div>
            <div className="main-content-lower-center">
              <a>
                <img className="middle-lower-banner" src="" alt="" />
              </a>
            </div>
            <div className="main-content-lower-right">
            <a>
                <img className="right-upper-lower-banner" src="" alt="" />
                <img className="right-lower-lower-banner" src="" alt="" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;