import { Bar } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { barData, options } from "../../../mocks/barGraphMock.js";//mock
import "./BarGraph.css";

const BarGraph = () => {
  // Register Chart.js components
  Chart.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  return <Bar options={options} data={barData} />;
};

export default BarGraph;
