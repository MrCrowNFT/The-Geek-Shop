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
      <div
        style={{
          position: "absolute",
          bottom: "0.5rem",
          left: "50%",
          translate: "-50%",
          display: "flex",
          gap: "0.25rem",
        }}
      >
        {images.map((_, index) => {
          <button
            key={index}
            className="img-slider-dot-nav"
            onClick={() => setSliderIndex(index)}
          >
            {index}
          </button>;
        })}
      </div>
    </div>
  );
};
Slider.propTypes = {
  images: PropTypes.objectOf(PropTypes.string),
};

export default Slider;
