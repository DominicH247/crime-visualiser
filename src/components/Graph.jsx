import React from "react";
import { Doughnut, Chart } from "react-chartjs-2";
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

  Chart.defaults.global.defaultFontColor = "black";
 
  return ( 
    <div>
      <h3 className="display-name">{props.displayName}</h3>
      <section className="display-graph" >
      <Doughnut data={data} />
      </section>
    </div>
  );
};

export default Graph;
