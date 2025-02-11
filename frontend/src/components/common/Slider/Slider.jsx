import { useState } from "react";
import arrowLeft from "../../../assets/icons/arrow-left.png";
import arrowRight from "../../../assets/icons/arrow-right.png";
import PropTypes from "prop-types";
import { CircleDot, Circle } from "lucide-react";
import "./Slider.css";

const Slider = ({ images }) => {
  const [sliderIndex, setSliderIndex] = useState(0);

  const nextImg = () => {
    setSliderIndex((index) => (index === images.length - 1 ? 0 : index + 1));
  };
  const prevImg = () => {
    setSliderIndex((index) => (index === 0 ? images.length - 1 : index - 1));
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
            style={{ transform: `translateX(${-100 * sliderIndex}%)` }}
          />
        ))}
      </div>
      <button onClick={prevImg} className="img-slider-button">
        <img src={arrowLeft} alt="arrow left" style={{ left: 0 }} />
      </button>
      <button onClick={nextImg} className="img-slider-button">
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
        {images.map((_, index) => (
          <button
            key={index}
            className="img-slider-dot-nav"
            onClick={() => setSliderIndex(index)}
          >
            {index === sliderIndex ? <CircleDot /> : <Circle />}
          </button>
        ))}
      </div>
    </div>
  );
};
Slider.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Slider;
