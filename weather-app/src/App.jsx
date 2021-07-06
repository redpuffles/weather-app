/**
 * A simple weather app to show current weather conditions and a five-day
 * forecast.
 * 
 * Handles weather location and data retrieval from the relevant APIs and passes
 * them down to the children components. Uses the OpenWeather One Call API,
 * Google Places and Google Geocoding API services.
 *  Google Geocoding API: https://developers.google.com/maps/documentation/geocoding/overview
 *  Google Places API: https://developers.google.com/maps/documentation/places/web-service/overview
 *  OpenWeather One Call API: https://openweathermap.org/api/one-call-api
 * 
 * @file This file defines the App component class.
 * @author Roger.
 * @since 1.2.4
 */

import React from "react";

import ChangeUnits from "./components/ChangeUnits";
import CurrentConditions from "./components/CurrentConditions";
import ForecastConditions from "./components/ForecastConditions";
import LocationSettings from "./components/LocationSettings";
import SettingsButton from "./components/SettingsButton";

import api_urls from "./config/api_urls.json";
import defaults from "./config/defaults.json";

import * as S from "./styles/App.styles";
import { ErrorMessage, ModalLoading } from "./styles/Global.styles";

import api from "./util/WeatherAPI";

function App () {
  const [coords, setCoords] = React.useState([]); // Coordinates in the format [ lat, long ]
  const [date, setDate] = React.useState(""); // Current date as a string.
  const [homeError, setHomeError] = React.useState(""); // Any error that should be displayed on the home page, empty otherwise.
  const [loadingActive, setLoadingActive] = React.useState(false); // Is fetchWeatherData() currently running?
  const [location, setLocation] = React.useState(""); // Location as a string.
  const [settingsActive, setSettingsActive] = React.useState(false); // Is the settings window open?
  const [units, setUnits] = React.useState(defaults.units); // Temperature units as "metric" or "imperial".
  const [weatherData, setWeatherData] = React.useState({}); // Weather data retrieved from the APIs.

  /**
   * Closes the settings window.
   * 
   * Sets settingsActive useState to false.
   * 
   * @return {null} No return values.
   */
  function closeSettings () {
    setSettingsActive(false);
  }

  /**
   * Convert a number to the corresponding day of the week as a string.
   * 
   * Given a number from 0 to 6, returns a day string in three-letter short
   * format. Assumes num will be valid.
   * 
   * @param {number} num A number from 0 to 6, corresponding to a day of the
   *                     week. 0 is Sunday, 6 is Saturday.
   * 
   * @return {string} The corresponding day of the week in three-letter short
   *                  format, e.g. "Sun".
   */
  function dayFromNum (num) {
    const dayOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return dayOfWeek[num];
  }

  /**
   * Retrieves location as a string from the Google Geocoding API.
   * 
   * Uses current coords values to retrieve location as a string and store in
   * location. If an error occurs, a message is displayed on the home page.
   * 
   * @return {null} No return values.
   */
   async function fetchLocation() {
    if (coords.length !== 2) return;

    const response = await api.reverseGeocode(coords[0], coords[1]);
    const body = await response.json();

    if (response.status !== 200) {
      setHomeError("Couldn't fetch location from the servers.");
      return;
    }

    if (body.status !== "OK") {
      setHomeError("Couldn't verify location from the server data.");
      return;
    }

    var loc = body.plus_code.compound_code.split(" ");
    loc.shift();

    setHomeError("");
    setLocation(loc.join(" "));
  }

  /**
   * Retrieves weather data from the OpenWeather One Call API.
   * 
   * Stores the returned data object in weatherData. If an error occurs, a
   * message is displayed on the home page.
   * 
   * @return {null} No return values.
   */
  async function fetchWeatherData () {
    setLoadingActive(true);

    const response = await api.forecast(coords[0], coords[1], units);
    const body = await response.json();

    if (response.status !== 200) {
      setHomeError("Couldn't fetch weather data from the servers.");
      return;
    }

    setHomeError("");
    setWeatherData(body);

    setLoadingActive(false);
  }

  /**
   * Get the corresponding OpenWeather weather icon URL from a given code.
   * 
   * Given a code string, produce an icon URL able to be used in an img src tag.
   * 
   * @param {string} icon A code corresponding to a weather icon.
   * 
   * @return {string} A weather condition icon URL.
   */
  function getIconURL (icon) {
    return (api_urls.weather_icons + "/" + icon + "@2x.png");
  }

  /**
   * A handler to set coords.
   * 
   * For children component use.
   * 
   * @param {string} newLat  The new latitude value.
   * @param {string} newLong The new longitude value.
   * 
   * @return {null} No return values.
   */
  function handleCoords (newLat, newLong) {
    setCoords([ newLat, newLong ]);
  }

  /**
   * A handler to set the error (if any) displayed on the home page.
   * 
   * For children component use.
   * 
   * @param {string} error The new error message. If none, this should be an
   *                       empty string.
   * 
   * @return {null} No return values.
   */
  function handleHomeError (error) {
    setHomeError(error);
  }

  /**
   * A handler to set the temperature display units to metric AKA Celsius.
   * 
   * For children component use.
   * 
   * @return {null} No return values.
   */
  function handleUnitsC () {
    setUnits("metric");
  }

  /**
   * A handler to set the temperature display units to imperial AKA Fahrenheit.
   * 
   * For children component use.
   * 
   * @return {null} No return values.
   */
  function handleUnitsF () {
    setUnits("imperial");
  }

  /**
   * Opens the settings window.
   * 
   * Sets settingsActive useState to true.
   * 
   * @return {null} No return values.
   */
  function openSettings () {
    setSettingsActive(true);
  }

  /**
   * Initialises localStorage data for first time users, and retrieves previous
   * preferences for returning users.
   * 
   * Initialises localStorage values, then retrieves coordinates and units.
   */
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

  /**
   * When coords update, fetch the new weather data and update the location
   * string.
   * 
   * Also updates relevant localStorage values.
   */
  React.useEffect(() => {
    if (coords.length !== 2) return;

    localStorage.setItem("lat", coords[0]);
    localStorage.setItem("lon", coords[1]);

    fetchWeatherData();
    fetchLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coords]);

  /**
   * When location updates, update the relevant localStorage values.
   */
  React.useEffect(() => {
    localStorage.setItem("location", location);
  }, [location]);

  /**
   * When units updates, fetch the new weather data and update the relevant
   * localStorage values.
   */
  React.useEffect(() => {
    if (coords.length !== 2) return;
    localStorage.setItem("units", units);
    fetchWeatherData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [units]);

  /**
   * When weatherData updates, update displayed date to reflect the current
   * time.
   */
  React.useEffect(() => {
    const now = new Date();
    const date = now.getDate();
    const month = new Intl.DateTimeFormat("en-US", { month: "short" })
                      .format(now);
    const day = dayFromNum(now.getDay());

    setDate(`${date} ${month} (${day})`);
  }, [weatherData]);

  return (
    <S.App>
      <ModalLoading active={loadingActive} />
      <LocationSettings
        closeSettings={closeSettings}
        handleCoords={handleCoords}
        location={location}
        settingsActive={settingsActive}
      />
      <S.HomeWrapper>
        <SettingsButton openSettings={openSettings} />
        <S.Date>{date}</S.Date>
        <ErrorMessage>{homeError}</ErrorMessage>
        <S.Location>{location}</S.Location>
        <CurrentConditions
          getIconURL={getIconURL}
          handleHomeError={handleHomeError}
          weatherData={weatherData}
        />
        <ChangeUnits
          handleUnitsC={handleUnitsC}
          handleUnitsF={handleUnitsF}
          units={units}
        />
        <ForecastConditions
          dayFromNum={dayFromNum}
          getIconURL={getIconURL}
          handleHomeError={handleHomeError}
          weatherData={weatherData}
        />
      </S.HomeWrapper>
    </S.App>
  );
}

export default App;
