import React, { Component } from "react";
import Graph from "./Graph";
import * as key from "../config.js";
import Axios from 'axios';

class SearchBar extends Component {
  state = {
    searchInput: "",
    searchLocation: {
      lat: "",
      lon: "",
      displayName: ""
    },
    crimeData: {},
    decemberCrimeLength: 0,
    yearlyCrimeData: {}
  };

  handleChange = event => {
    const input = event.target.value;
    this.setState({ searchInput: input });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.fetchGeolocation();
  };

  fetchGeolocation = () => {
    const apiKey = key;
    fetch(
      `https://eu1.locationiq.com/v1/search.php?key=${apiKey}&postalcode=${this.state.searchInput}&countrycodes=gb&format=json`
    )
      .then(response => {
        return response.json();
      })
      .then(data => {
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
      `https://data.police.uk/api/crimes-street/all-crime?lat=${this.state.searchLocation.lat}&lng=${this.state.searchLocation.lon}`
    )
      .then(response => {
        return response.json();
      })
      .then(data => {

        const crimeTally = data.reduce((tally, crime) => {
          tally[crime.category] = (tally[crime.category] || 0) + 1;
          return tally;
        }, {});

        this.setState({ crimeData: crimeTally, decemberCrimeLength: data.length }, () => {
          this.fetchYearlyData();
        });
      });
  };

  fetchYearlyData = () => {
    let months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11'];
    let monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let monthlyCount = [];
    let promisesArr = [];
    months.forEach(month => {
      let req = Axios.get(`https://data.police.uk/api/crimes-street/all-crime?lat=${this.state.searchLocation.lat}&lng=${this.state.searchLocation.lon}&date=2019-${month}`, {mode: 'cors'})
      
      promisesArr.push(req)
      
    })
    return Promise.all(promisesArr)
    .then((res) => {
       res.forEach((obj) => {
        monthlyCount.push(obj.data.length);
      })
      monthlyCount.push(this.state.decemberCrimeLength);
  console.log(monthlyCount, "monthylcut");
  
      let reducer = monthNames.reduce((yearlyData, currentMonth, index) => {
        yearlyData[currentMonth] = monthlyCount[index];
        return yearlyData;
      }, {})

      console.log(reducer);

     
    })
    
   
  }

  render() {
    const {displayName} = this.state.searchLocation
    return (
      <div className="search-container">
        <form className="search-form" onSubmit={this.handleSubmit}>
          <label>
            Post Code: <input type="text" onChange={this.handleChange} />
          </label>
          <button>Search</button>
        </form>
        <Graph crimeData={this.state.crimeData} displayName={displayName} />
      </div>
    );
  }
}

export default SearchBar;
