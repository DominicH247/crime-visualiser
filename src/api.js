const key = require("./config.js");
const Axios = require("axios");

const getGeoLocation = searchInput => {
  const apiKey = key;
  return Axios.get(
    `https://eu1.locationiq.com/v1/search.php?key=${apiKey}&postalcode=${searchInput}&countrycodes=gb&format=json`
  )
  .then(({data}) => {
      return data;
    });
};

const getCrimeData = (searchLocation) => {
  return Axios.get(
    `https://data.police.uk/api/crimes-street/all-crime?lat=${searchLocation.lat}&lng=${searchLocation.lon}`
  )
  .then(({data}) => {
      return data;
    });
}

const getYearlyData = (searchLocation) => {
  let months = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11"
  ];
  let promisesArr = [];

  months.forEach(month => {
    let req = Axios.get(
      `https://data.police.uk/api/crimes-street/all-crime?lat=${searchLocation.lat}&lng=${searchLocation.lon}&date=2019-${month}`,
      { mode: "cors" }
    );

    promisesArr.push(req);
  });
  return Promise.all(promisesArr);
}

module.exports = { getGeoLocation, getCrimeData, getYearlyData };
