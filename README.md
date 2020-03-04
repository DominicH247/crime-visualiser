# Crime Finder app

An interactive React app that allows users to search a postcode and receive information about crimes in the given location. Third-party apis are used to obtain the crime data and it is visualised in the form of charts and a map.

## Getting started

Follow these instructions to get a local copy of the project up and running on your machine.

### Prerequisites

You will need an API key from [locationIQ](https://locationiq.com/) in order to use the search bar. This key is used for geocoding the users postcode into geographic coordinates.

### Installing

Clone this repo and cd into it

```
git clone
cd crime-visualiser
```

Run this command to install the project dependencies:

```
npm i
```

In the root directory create a .env file and add the following inside it, where 'yourkey' is the API key you recieved from locationIQ

```
REACT_APP_LOCATION_API_KEY=yourkey

```

To view the app on localhost, run:

```
npm start
```

### Testing

To run tests on the util function, type the following in your terminal:

```
npm test
```

## Built using

- React
- Axios
- Leaflet
- Jest
- react-chartjs
- CSS
- [locationIQ](https://locationiq.com/)
- [data.police.uk](https://data.police.uk/)

## Authors

[Humayraa Mulla](https://github.com/Hy-M) &
[Dominic Hui](https://github.com/DominicH247)
