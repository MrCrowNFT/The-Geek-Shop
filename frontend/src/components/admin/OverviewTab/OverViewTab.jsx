import { mockAmount } from "../../../mocks/overviewMock.js";
import { useOrders } from "../../../hooks/useOrders";
import Indicator from "../Indicator/Indicator.jsx";
import BarGraph from "../BarGraph/BarGraph.jsx";
import OrderListItem from "../OrderListItem/OrderListItem.jsx";
import "./OverViewTab.css";

const OverViewTab = () => {
  const { orders, loading } = useOrders();

  return (
    <div className="overview-tab">
      <div className="indicators">
        {mockAmount.map((amount, index) => (
          <Indicator key={index} amount={amount} />
        ))}
      </div>
      <br />
      <br />
      <div className="lower-info">
        <div className="performance-graph">
          <BarGraph />
        </div>
        <div className="recent-orders">
          <h1>Recent Orders</h1>
          <hr />
          {loading ? (
            <p>Loading...</p>
          ) : (
            orders.map((product) => (
              <OrderListItem key={product._id} product={product} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default OverViewTab;
