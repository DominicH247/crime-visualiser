import React from "react";
import { Doughnut } from "react-chartjs-2";

const Graph = props => {
  const data = {
    labels: Object.keys(props.crimeData),
    datasets: [
      {
        data: Object.values(props.crimeData),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"]
      }
    ]
  };

  return (
    <div>
      <Doughnut data={data} />
    </div>
  );
};

export default Graph;
