import React from "react";

import ChangeUnits from "./components/ChangeUnits";
import CurrentConditions from "./components/CurrentConditions";
import ForecastConditions from "./components/ForecastConditions";
import LocationSettings from "./components/LocationSettings";
import SettingsButton from "./components/SettingsButton";

import defaults from "./config/defaults.json";

import * as S from "./styles/App.styles";
import { ModalBackground } from "./styles/Modal.styles";

import api from "./util/WeatherAPI";

function App () {
  const [data, setData] = React.useState({});
  const [coords, setCoords] = React.useState([]);
  const [date, setDate] = React.useState("");
  const [error, setError] = React.useState("");
  const [loadingActive, setLoadingActive] = React.useState(false);
  const [location, setLocation] = React.useState("Location Undefined");
  const [night, setNight] = React.useState("false");
  const [settingsActive, setSettingsActive] = React.useState(false);
  const [units, setUnits] = React.useState(defaults.units);

  function closeSettings () {
    setSettingsActive(false);
  }

  async function fetchData () {
    // setLoadingActive(true);
    // const response = await api.forecast(coords[0], coords[1], units);
    // const body = await response.json();

    // if (response.status !== 200) {
    //   setError("1: Couldn't fetch weather data from the servers.");
    //   return;
    // }
    // // console.log(body);
    // setData(body);
    // setLoadingActive(false);
  }

  function handleCoords (newLat, newLong) {
    setCoords([ newLat, newLong ]);
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
    if (localStorage.getItem("lat") === null) {
      localStorage.setItem("lat", defaults.lat);
    }

    if (localStorage.getItem("lon") === null) {
      localStorage.setItem("lon", defaults.lon);
    }

    if (localStorage.getItem("location") === null) {
      localStorage.setItem("location", defaults.location);
    }

    if (localStorage.getItem("units") === null) {
      localStorage.setItem("units", defaults.units);
    }

    setCoords([ localStorage.getItem("lat"), localStorage.getItem("lon") ]);

    setUnits(localStorage.getItem("units"));
  }, []);

  // location + data
  React.useEffect(() => {
    // if (coords.length !== 2) return;

    // localStorage.setItem("lat", coords[0]);
    // localStorage.setItem("lon", coords[1]);

    // async function fetchLocation() {
    //   const response = await api.reverseGeocode(coords[0], coords[1]);
    //   const body = await response.json();

    //   if (response.status !== 200) {
    //     setError("2. Couldn't fetch location from the servers.");
    //     return;
    //   }

    //   if (body.status !== "OK") {
    //     setError("3. Could fetch location from the servers.");
    //     return;
    //   }

    //   var loc = body.plus_code.compound_code.split(" ");
    //   loc.shift();

    //   setLocation(loc.join(" "));
    // }

    // fetchData();
    // fetchLocation();
  }, [coords]);

  // current date: text
  React.useEffect(() => {
    const dayOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const now = new Date();
    const date = now.getDate();
    const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(now);
    const day = dayOfWeek[now.getDay()];
    const hour = now.getHours();

    if ((hour > 20) || (hour < 6)) {
      setNight(true);
    } else {
      setNight(false);
    }

    setDate(`${date} ${month} (${day})`);
  }, [data]);

  React.useEffect(() => {
    localStorage.setItem("location", location);
  }, [location]);

  // data
  React.useEffect(() => {
    if (coords.length !== 2) return;
    localStorage.setItem("units", units);
    fetchData();
  }, [units]);

  return (
    <S.App night={night}>
      <ModalBackground active={loadingActive} />
      <LocationSettings
        closeSettings={closeSettings}
        handleCoords={handleCoords}
        location={location}
        settingsActive={settingsActive}
      />
      <S.HomeWrapper>
        <SettingsButton openSettings={openSettings} />
        <S.Date>{date}</S.Date>
        <S.Location>{location}</S.Location>
        <CurrentConditions
          data={data}
          location={location}
          setError={setError}
          units={units}
        />
        <ChangeUnits
          handleUnitsC={handleUnitsC}
          handleUnitsF={handleUnitsF}
          units={units}
        />
        <ForecastConditions data={data} units={units} />
      </S.HomeWrapper>
    </S.App>
  );
}

export default App;
