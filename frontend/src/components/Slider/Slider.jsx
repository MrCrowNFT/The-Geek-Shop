import { useState } from "react";
import arrowLeft from "../../assets/icons/arrow-left.png";
import arrowRight from "../../assets/icons/arrow-right.png";
import PropTypes from "prop-types";
import "./Slider.css";

const Slider = ({ images }) => {
  const [sliderIndex, setSliderIndex] = useState(0);

  return (
    <div className="img-slider">
      <img src={images[sliderIndex]} className="img-slider-img" />
      <button>
        <img src={arrowLeft} alt="arrow left" className="img-slider-button" style={{left: 0}} />
      </button>
      <button>
        <img src={arrowRight} alt="arrow right" className="img-slider-button" style={{right: 0}} />
      </button>
    </div>
  );
};
Slider.propTypes = {
  images: PropTypes.objectOf(PropTypes.string),
};

export default Slider;
