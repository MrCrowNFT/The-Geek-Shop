import "./OverViewTab.css";
import Indicator from "../Indicator/Indicator.jsx";
import BarGraph from "../BarGraph/BarGraph.jsx";
import { useEffect, useState } from "react";
import OrderListItem from "../OrderListItem/OrderListItem.jsx";

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
    trend: "",
  },
];
const OverViewTab = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  //need to adjust this for only the most recent ones
  const fetchOrders = async (page = 1, limit = 20) => {
    setLoading(true);
    try {
      //need to check the route!!
      //Need to check how this works with the JWT
      const response = await fetch(
        `/admin/orders/search?page=${page}&limit=${limit}`
      );
      const data = await response.json();
      if (data.success) {
        setOrders(data.data);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      //setting load off
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchOrders();
  });
  return (
    <div className="overview-tab">
      <div className="indicators">
        <Indicator amount={mockAmount[0]} />
        <Indicator amount={mockAmount[1]} />
        <Indicator amount={mockAmount[2]} />
      </div>
      <br />
      <div className="lower-info">
        <div className="performance-graph">
          <BarGraph />
        </div>
        <div className="recent-orders">
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
