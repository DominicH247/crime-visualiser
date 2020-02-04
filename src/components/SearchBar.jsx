import React, { Component } from "react";
import Graph from "./Graph";
import * as utils from "../utils/utils";
import * as api from "../api";

class SearchBar extends Component {
  state = {
    searchInput: "",
    searchLocation: {
      lat: "",
      lon: "",
      displayName: "Your location"
    },
    crimeData: {},
    crimeAreaData: [],
    crimeCatColors: [],
    decemberCrimeLength: 0,
    yearlyCrimeData: {},
    yearlyDataLoaded: false
  };

  componentDidMount = () => {
    this.getBrowserLocation(); 
  }

  getBrowserLocation = () => {
    let browserPosition = [];

    const showPosition = (position) => {
      let long = position.coords.longitude;
      let lat = position.coords.latitude;      
      browserPosition.push(lat, long);
      this.setState((currentState) => {
        return {searchLocation: { ...currentState.searchLocation, lat: browserPosition[0], lon: browserPosition[1]}}
      }, () => {
        this.fetchCrimeData();  
      })
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      alert("This site needs access to your browser location")
    }
  }

  handleChange = event => {
    const input = event.target.value;
    this.setState({ searchInput: input });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.fetchGeolocation();
  };

  fetchGeolocation = () => {
    api.getGeoLocation(this.state.searchInput)
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
    api.getCrimeData(this.state.searchLocation)
    .then((data) => {
      const crimeTally = data.reduce((tally, crime) => {
        tally[crime.category] = (tally[crime.category] || 0) + 1;
        return tally;
      }, {});
  
      const crimeAreaData = data.map(({ category, location, id }) => {
        return { category, location, id };
      });
  
      this.setState(
        {
          crimeData: crimeTally,
          decemberCrimeLength: data.length,
          crimeAreaData
        },
        () => {
          this.fetchYearlyData();
          this.setCrimeCatColors();
        }
      );
    })
  };

  fetchYearlyData = () => {
    let monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    let monthlyCount = [];
    api.getYearlyData(this.state.searchLocation)
    .then((res) => {
      res.forEach(obj => {        
        monthlyCount.push(obj.data.length);

      });
      monthlyCount.push(this.state.decemberCrimeLength);
   
      let reducer = monthNames.reduce((yearlyData, currentMonth, index) => {
        yearlyData[currentMonth] = monthlyCount[index];
        return yearlyData;
      }, {});
  
      this.setState({ yearlyCrimeData: reducer, yearlyDataLoaded: true});
    })
    .catch((error) => {
      if (error) {
        alert("Error loading data. Please try again");
        this.setState({ yearlyDataLoaded: false});
      }
      
    })
  };

  setCrimeCatColors = () => {
    let crimeCategories = Object.keys(this.state.crimeData);
    let colors = utils.colorGenerator(crimeCategories);
    this.setState({ crimeCatColors: colors });
  };

  render() {
    const { displayName } = this.state.searchLocation;
    return (
      <div className="search-container">
        <form className="search-form" onSubmit={this.handleSubmit}>
          <label>
            Postcode: <input type="text" onChange={this.handleChange} placeholder="Please enter your postcode"/>
          </label>
          <button>Search</button>
        </form>
        <Graph
          crimeData={this.state.crimeData}
          displayName={displayName}
          colors={this.state.crimeCatColors}
          yearlyCrimeData={this.state.yearlyCrimeData}
          crimeAreaData={this.state.crimeAreaData}
          searchLocation={this.state.searchLocation}
          yearlyDataLoaded={this.state.yearlyDataLoaded}
        />
      </div>
    );
  }
}

export default SearchBar;
