import React from "react";
import { Doughnut } from "react-chartjs-2";
import * as utils from "../utils/utils";

const Graph = props => {

  let crimeCategories = Object.keys(props.crimeData);
  let colors = utils.colorGenerator(crimeCategories);
  
  const data = {
    labels: crimeCategories,
    datasets: [
      {
        data: Object.values(props.crimeData),
        backgroundColor: colors,
        hoverBackgroundColor: colors
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
