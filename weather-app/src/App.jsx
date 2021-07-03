import React from "react";

import "./App.css";

import ChangeUnits from "./components/ChangeUnits";
import CurrentConditions from "./components/CurrentConditions";
import ForecastConditions from "./components/ForecastConditions";
import LocationSettings from "./components/LocationSettings";
import SettingsButton from "./components/SettingsButton";

import defaults from "./config/defaults.json";

import api from "./util/WeatherAPI";

function App () {
  const [data, setData] = React.useState({});
  const [coords, setCoords] = React.useState([]);
  const [location, setLocation] = React.useState("Unidentified Location");
  const [settingsActive, setSettingsActive] = React.useState(false);
  const [units, setUnits] = React.useState(defaults.units);

  function closeSettings () {
    setSettingsActive(false);
  }

  async function fetchData () {
    const response = await api.forecast(coords[0], coords[1], units);
    const body = await response.json();

    if (response.status !== 200) {
      console.log("ERROR FETCHING FORECAST DATA.");
      return;
    }

    setData(body);
  }

  function handleCoords (newLatitude, newLongitude) {
    setCoords([ newLatitude, newLongitude ]);
  }

  function handleUnitsC () {
    setUnits("metric");
  }

  function handleUnitsF () {
    setUnits("imperial");
  }

  function openSettings () {
    setSettingsActive(true);
  }

  // on page load, try to retrieve localstorage data. otherwise, use defaults.
  React.useEffect(() => {
    const localLat = localStorage.getItem("lat");
    if (localLat === null) localStorage.setItem("lat", defaults.lat);
    const localLon = localStorage.getItem("lon");
    if (localLon === null) localStorage.setItem("lon", defaults.lon);
    const localLocation = localStorage.getItem("location");
    if (localLocation === null) localStorage.setItem("location", defaults.location);
    const localUnits = localStorage.getItem("units");
    if (localUnits === null) localStorage.setItem("units", defaults.units);
    setCoords([ localStorage.getItem("lat"), localStorage.getItem("lon") ]);
    setUnits(localStorage.getItem("units"));
  }, []);

  React.useEffect(() => {
    if (coords.length !== 2) return;

    localStorage.setItem("lat", coords[0]);
    localStorage.setItem("lon", coords[1]);
  }, [coords]);

  React.useEffect(() => {
    localStorage.setItem("location", location);
  }, [location]);

  // location + data
  React.useEffect(() => {
    if (coords.length !== 2) return;

    async function fetchLocation() {
      const response = await api.reverseGeocode(coords[0], coords[1]);
      const body = await response.json();

      if (response.status !== 200) {
        console.log("ERROR FETCHING REVERSE GEOCODE DATA (COORDINATES -> LOCATION.");
        return;
      }

      if (body.status !== "OK") {
        console.log("ERROR FETCHING REVERSE GEOCODE DATA (COORDINATES -> LOCATION.");
        return;
      }

      var loc = body.plus_code.compound_code.split(" ");
      loc.shift();

      setLocation(loc.join(" "));
    }

    fetchData();
    fetchLocation();
  }, [coords]);

  // data
  React.useEffect(() => {
    if (coords.length !== 2) return;
    localStorage.setItem("units", units);
    fetchData();
  }, [units]);

  return (
    <div className="App">
      <SettingsButton openSettings={openSettings} />
      <LocationSettings closeSettings={closeSettings} handleCoords={handleCoords} location={location} settingsActive={settingsActive}/>
      <CurrentConditions data={data} location={location} units={units} />
      <ChangeUnits handleUnitsC={handleUnitsC} handleUnitsF={handleUnitsF} units={units} />
      <p>----------------</p>
      <ForecastConditions data={data} units={units} />
    </div>
  );
}

export default App;
