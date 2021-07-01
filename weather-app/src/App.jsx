/*

Last Updated: 1 July 2021, Roger.
Created: 1 July 2021, Roger.

*/

import React from "react";

import "./App.css";
import defaults from "./defaults.json";
import api from "./util/WeatherAPI";

function App () {
  // const [forecastData, setForecastData] = React.useState([]);
  const [location,] = React.useState(defaults.location);
  // const [locationData, setLocationData] = React.useState({});
  // const [todayData, setTodayData] = React.useState({});
  // const [unit, setUnit] = React.useState(defaults.unit);

  // On page load, initialise weather data in state variables.
  React.useEffect(() => {
    fetchData();
  }, [location]);

  // Fetches weather data for the current location in `location` and stores it
  // in the state variables.
  async function fetchData () {
    const response = await api.forecast(5, location);
    const body = await response.json();

    if (response.status !== 200) {
      console.log("ERROR FETCHING FORECAST DATA.");
      return;
    }

    console.log(body);
    return;
  }

  return (
    <div className="App">
      <p>Home Page!</p>
    </div>
  );
}

export default App;
