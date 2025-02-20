import BannerA from "../../../assets/images/BannerA.png";
import BannerB from "../../../assets/images/BannerB.png";
import BannerC from "../../../assets/images/BannerC.png";
import "./BannerWrapper.css";

const BannerWrapper = () => {
  return (
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
            <div className="left-upper-lower-banner">
              <a href="">
                <img loading="lazy" src={BannerB} alt="" />
              </a>
            </div>
            <div className="left-lower-lower-banner">
              <a href="">
                <img loading="lazy" src={BannerB} alt="" />
              </a>
            </div>
          </div>

          <div className="main-content-lower-center">
            <a href="">
              <img
                className="middle-lower-banner"
                loading="lazy"
                src={BannerC}
                alt=""
              />
            </a>
          </div>

          <div className="main-content-lower-right">
            <div className="right-upper-lower-banner">
              <a href="">
                <img loading="lazy" src={BannerB} alt="" />
              </a>
            </div>
            <div className="right-lower-lower-banner">
              <a href="">
                <img loading="lazy" src={BannerB} alt="" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BannerWrapper;
