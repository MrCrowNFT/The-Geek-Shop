import "./Indicator.css";
import greenArrowUp from "../../assets/icons/green-arrow-up.svg";
import redArrowDown from "../../assets/icons/red-arrow-down.svg";
import minus from "../../assets/icons/minus.svg";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

//The amount will be calculated on the backend, send to the page via fetch and
//passed down to the indicator components for display, amount should have two values
//the number (for sales, earnings, etc) and a string that indicates the trend
const Indicator = ({ amount }) => {
  const [trendIcon, setTrendIcon] = useState(minus);

  useEffect(() => {
    if (amount.trend === "up") setTrendIcon(greenArrowUp);
    else if (amount.trend === "down") setTrendIcon(redArrowDown);
    else setTrendIcon(minus);
  }, [amount.trend]);

  return (
    <div className="indicator">
      <p>{amount.index}</p>
      <h1>${amount.num}</h1>
      <img src={trendIcon} alt="trend" />
    </div>
  );
};

Indicator.propTypes = {
  amount: PropTypes.shape({
    index: PropTypes.string,
    num: PropTypes.number,
    trend: PropTypes.string,
  }),
};

export default Indicator;
