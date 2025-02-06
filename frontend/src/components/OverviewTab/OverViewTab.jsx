import "./OverViewTab.css";
import Indicator from "../Indicator/Indicator.jsx";
import BarGraph from "../BarGraph/BarGraph.jsx";

const mockAmount = [
  {
    index: "Daily earnings",
    num: 109.99,
    trend: "up",
  },
  {
    index: "Monthly earnings",
    num: 199.99,
    trend: "down",
  },
  {
    index: "Yearly earnings",
    num: 299.99,
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
