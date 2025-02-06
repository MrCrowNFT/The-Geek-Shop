import "./OverViewTab.css";
import Indicator from "../Indicator/Indicator.jsx";
import BarGraph from "../BarGraph/BarGraph.jsx";

const mockAmount = [
  {
    num: 109.99,
    trend: "up",
  },
  {
    num: 99.99,
    trend: "down",
  }
];
const OverViewTab = () => {
  return (
    <div className="overview-tab">
      <div className="indicators">
        <Indicator amount={mockAmount[0]} />
        <Indicator amount={mockAmount[1]} />
        <Indicator amount={mockAmount} />
      </div>
      <div className="lower-info">
        <div className="performance-graph"></div>
        <div>
          <BarGraph />
        </div>
      </div>
    </div>
  );
};

export default OverViewTab;
