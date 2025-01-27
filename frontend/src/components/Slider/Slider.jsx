import { useState } from "react";
import arrowLeft from "../../assets/icons/arrow-left.png";
import arrowRight from "../../assets/icons/arrow-right.png";
import PropTypes from "prop-types";
import "./Slider.css";

const Slider = ({ images }) => {
  const [sliderIndex, setSliderIndex] = useState(0);

  const nextImg = () => {
    setSliderIndex((index) => {
      if (index === images.length - 1) return 0;
      return index + 1;
    });
  };
  const prevImg = () => {
    setSliderIndex((index) => {
      if (index === 0) return images.length - 1;
      return index - 1;
    });
  };

  return (
    <div className="img-slider">
      <div
        style={{
          width: "100%",
          height: "100%",
          overflow: "hidden",
          display: "flex",
        }}
      >
        {images.map((image) => (
          <img
            key={image}
            src={image}
            className="img-slider-img"
            style={{ translate: `${-100 * sliderIndex}` }}
          />
        ))}
      </div>
      <button onClick={nextImg} className="img-slider-button">
        <img src={arrowLeft} alt="arrow left" style={{ left: 0 }} />
      </button>
      <button onClick={prevImg} className="img-slider-button">
        <img src={arrowRight} alt="arrow right" style={{ right: 0 }} />
      </button>
    </div>
  );
};
Slider.propTypes = {
  images: PropTypes.objectOf(PropTypes.string),
};

export default Slider;
