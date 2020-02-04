import React from "react";
import { Doughnut, Chart, Line } from "react-chartjs-2";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";

const Graph = props => {
  let crimeCategories = Object.keys(props.crimeData);

  const doughnutData = {
    labels: crimeCategories,
    datasets: [
      {
        data: Object.values(props.crimeData),
        backgroundColor: props.colors,
        hoverBackgroundColor: props.colors
      }
    ]
  };

  Chart.defaults.global.defaultFontColor = "black";

  const months = Object.keys(props.yearlyCrimeData);
  const monthlyData = Object.values(props.yearlyCrimeData);

  const lineData = {
    labels: months,
    datasets: [
      {
        label: "All Crimes",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: monthlyData
      }
    ]
  };

  return (
    <div>
      <h3 className="display-name">{props.displayName}</h3>
      <section className="display-graph">
        <div className="dougnut-container">
          <Doughnut data={doughnutData} />
        </div>
        <div className="map-container">
          <h3>Crime Location Map</h3>
          <p>Showing all crime in the given area for the past month.</p>
          <Map
            id="mapid"
            center={[props.searchLocation.lat, props.searchLocation.lon]}
            zoom={13}
          >
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {props.crimeAreaData.map(crime => {
              let position = [
                crime.location.latitude,
                crime.location.longitude
              ];

              return (
                <Marker key={crime.id} position={position}>
                  <Popup>Crime category: {crime.category}</Popup>
                </Marker>
              );
            })}
          </Map>
        </div>
        <div className="line-container">
          <h3>Crime count over past year</h3>
          <Line data={lineData} />
        </div>
      </section>
    </div>
  );
};

export default Graph;
