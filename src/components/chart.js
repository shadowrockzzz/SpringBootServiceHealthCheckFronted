import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import moment from "moment";

Chart.register(...registerables);

const Graph = ({ healthStatusList }) => {
  const data = {
    labels: healthStatusList.map((status) =>
      moment(status.timestamp).format("MM/DD/YYYY h:mm:ss A")
    ),
    datasets: [
      {
        label: "Health Status",
        data: healthStatusList.map((status) =>
          status.status === "ACTIVE" ? 1 : 0
        ),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        min: 0,
        max: 1,
        ticks: {
          stepSize: 1,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    animation: {
      duration: 2000, // duration of animation in milliseconds
      easing: "linear", // easing function for animation
    },
  };

  return <Line data={data} options={options} />;
};

export default Graph;
