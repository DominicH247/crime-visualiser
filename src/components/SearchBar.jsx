import React, { Component } from "react";
import Graph from "./Graph";
import * as key from "../config.js";

class SearchBar extends Component {
  state = {
    searchInput: "",
    searchLocation: {
      lat: "",
      lon: "",
      displayName: ""
    },
    crimeData: {}
  };

  handleChange = event => {
    const input = event.target.value;
    this.setState({ searchInput: input }, () => {
      // console.log(this.state, "CURRENT SET STATE");
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.fetchGeolocation();
  };

  fetchGeolocation = () => {
    const apiKey = key;

    console.log(key);
    // ${ this.state.searchInput }
    fetch(
      `https://eu1.locationiq.com/v1/search.php?key=${apiKey}&postalcode=${this.state.searchInput}&countrycodes=gb&format=json`
    )
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(data, "THE DATA");
        const { lat, lon, display_name } = data[0];

        this.setState(
          currentState => {
            return {
              searchLocation: {
                ...currentState.searchLocation,
                lat,
                lon,
                displayName: display_name
              }
            };
          },
          () => {
            this.fetchCrimeData();
          }
        );
      });
  };

  fetchCrimeData = () => {
    fetch(
      `https://data.police.uk/api/crimes-street/all-crime?lat=52.629729&lng=-1.131592`
    )
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(data, "CRIME DATA");

        const crimeTally = data.reduce((tally, crime) => {
          tally[crime.category] = (tally[crime.category] || 0) + 1;
          return tally;
        }, {});

        console.log(crimeTally, "Crime Tally!");

        this.setState({ crimeData: crimeTally }, () => {
          console.log(this.state, "POST CRIME FETCH");
        });
      });
  };

  render() {
    return (
      <div className="search-container">
        <form className="search-form" onSubmit={this.handleSubmit}>
          <label>
            Post Code: <input type="text" onChange={this.handleChange} />
          </label>
          <button>Search</button>
        </form>
        <Graph crimeData={this.state.crimeData} />
      </div>
    );
  }
}

export default SearchBar;
