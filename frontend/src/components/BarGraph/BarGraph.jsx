import "./BarGraph.css";
import { Bar } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinealScale,
  BarElement,
  Title,
  ToolTip,
  Legend,
} from "chart.js";

const BarGraph = () => {
  Chart.register(
    CategoryScale,
    LinealScale,
    BarElement,
    Title,
    ToolTip,
    Legend
  );
  //this is for cutomization i think, I'll leave it empty for now
  const options = {};

  //for data it should be in the following format, need to include this later
  // in the API response or format it on clientside for formating, I'll decide this on later date
  const barData = {
    labels: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    datasets: [
      {
        label: "Earnings",
        data: [79.99, 69.99, 129.99, 229.99, 39.99, 59.99, 29.99],
        backgroundColot: ["rgba(255, 99, 132, 0.2)"],
        borderColor: ["rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };

  return <Bar options={options} data={barData} />;
};

export default BarGraph;
