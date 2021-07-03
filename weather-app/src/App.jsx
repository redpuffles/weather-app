import React from "react";

import "./App.css";

import CurrentConditions from "./components/CurrentConditions";
// import ForecastConditions from "./components/ForecastConditions";
import LocationSettings from "./components/LocationSettings";

import defaults from "./config/defaults.json";

import api from "./util/WeatherAPI";

function App () {
  const [data, setData] = React.useState({});
  const [coords, setCoords] = React.useState([ defaults.lat, defaults.lon ]);
  const [location, setLocation] = React.useState("-");
  const [units, setUnits] = React.useState(defaults.unit);

  function handleCoords (newLatitude, newLongitude) {
    setCoords([ newLatitude, newLongitude ]);
  }

  // React.useEffect(() => {
  //   async function fetchData () {
  //     const response = await api.forecast(coords[0], coords[1], units);
  //     const body = await response.json();

  //     console.log(body);
  
  //     if (response.status !== 200) {
  //       console.log("ERROR FETCHING FORECAST DATA.");
  //       return;
  //     }
  
  //     setData(body);
  //   }

  //   fetchData();
  // }, [coords]);

  // React.useEffect(() => {
  //   async function fetchLocation() {
  //     const response = await api.reverseGeocode(coords[0], coords[1]);
  //     const body = await response.json();

  //     if (response.status !== 200) {
  //       console.log("ERROR FETCHING REVERSE GEOCODE DATA (COORDINATES -> LOCATION.");
  //       return;
  //     }

  //     if (body.status !== "OK") {
  //       console.log("ERROR FETCHING REVERSE GEOCODE DATA (COORDINATES -> LOCATION.");
  //       return;
  //     }

  //     var loc = body.plus_code.compound_code.split(" ");
  //     loc.shift();

  //     setLocation(loc.join(" "));
  //   }

  //   fetchLocation();
  // }, [coords]);

  return (
    <div className="App">
      <LocationSettings handleCoords={handleCoords} location={location}/>
      <CurrentConditions data={data} location={location} units={units} />
      <p>----------------</p>
      {/* <ForecastConditions data={data} units={units} /> */}
    </div>
  );
}

export default App;
