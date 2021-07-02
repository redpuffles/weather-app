import React from "react";

import "./App.css";

// import CurrentConditions from "./components/CurrentConditions";
// import ForecastConditions from "./components/ForecastConditions";
import LocationSettings from "./components/LocationSettings";

import defaults from "./config/defaults.json";

import api from "./util/WeatherAPI";

function App () {
  const [data, setData] = React.useState({});
  const [lat, setLat] = React.useState(defaults.lat);
  const [location, setLocation] = React.useState("");
  const [lon, setLon] = React.useState(defaults.lon);
  const [units, setUnits] = React.useState(defaults.unit);

  React.useEffect(() => {
    async function fetchData () {
      const response = await api.forecast(lat, lon);
      const body = await response.json();

      console.log(body);
  
      if (response.status !== 200) {
        console.log("ERROR FETCHING FORECAST DATA.");
        return;
      }
  
      setData(body);
  
      return;
    }

    fetchData();
  }, [lat, lon]);

  React.useEffect(() => {
    async function fetchLocation() {
      const response = await api.reverseGeocode(lat, lon);
      const body = await response.json();

      console.log(body);

      if (response.status !== 200) {
        console.log("ERROR FETCHING REVERSE GEOCODE DATA (COORDINATES -> LOCATION.");
        return;
      }

      return;
    }

    fetchLocation();
  }, [lat, lon]);

  return (
    <div className="App">
      location: {location}
      <LocationSettings />
      {/* <CurrentConditions data={data} units={units} />
      <p>----------------</p>
      <ForecastConditions data={data} units={units} /> */}
    </div>
  );
}

export default App;
