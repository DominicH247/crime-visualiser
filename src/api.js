const key = require("./config.js");
// import Axios from "axios";

const getGeoLocation = searchInput => {
  const apiKey = key;
  return fetch(
    `https://eu1.locationiq.com/v1/search.php?key=${apiKey}&postalcode=${searchInput}&countrycodes=gb&format=json`
  )
    .then(response => {
      return response.json();
    })
    .then(data => {
      return data;
    });
};

module.exports = { getGeoLocation };
