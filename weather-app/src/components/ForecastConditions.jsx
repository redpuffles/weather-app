/**
 * A component that contains and handles ForecastDay components for the next
 * five days (including the current day).
 * 
 * Processes relevant weatherData data from props and passes them down to each
 * children day component.
 * 
 * @file This file defines the ForecastConditions component class.
 * @author Roger.
 * @since 1.0.3
 */

import PropTypes from "prop-types";
import React from "react";

import ForecastDay from "./ForecastDay";

import * as S from "../styles/ForecastConditions.styles";

function ForecastConditions (props) {
  const [forecastData, setForecastData] = React.useState([]); // An array to hold each forecast day's data. Should be length five, ordered by day.

  /**
   * Processes props.weatherData and holds the relevant parts for each
   * ForecastDay component.
   * 
   * Gets relevant data for the first five days. If an error occurs, a message
   * is displayed on the home page.
   */
  React.useEffect(() => {
    var forecastDataNew = [];
    var i = 0;

    try {
      for (i = 0; i < 5; i++) {
        const date = new Date(props.weatherData.daily[i].dt * 1000);

        const data = {
          alt: props.weatherData.daily[i].weather[0].description,
          day: props.dayFromNum(date.getDay()),
          icon: props.weatherData.daily[i].weather[0].icon,
          key: i,
          temp: String(props.weatherData.daily[i].temp.day)
        }

        forecastDataNew = [ ...forecastDataNew, data ];
      }
    } catch (e) {
      props.handleHomeError("Couldn't fetch daily forecast data from the servers.");

      var date = new Date();

      for (i = 0; i < 5; i++) {
        const data = {
          alt: "",
          day: props.dayFromNum(date.getDay()),
          icon: "",
          key: i,
          temp: ""
        }

        forecastDataNew = [ ...forecastDataNew, data ];

        date.setDate(date.getDate() + 1);
      }
    } finally {
      setForecastData(forecastDataNew);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.weatherData])

  return (
    <S.ForecastConditions>
      {forecastData.map((i) =>
        <ForecastDay
          alt={i.alt}
          day={i.day}
          getIconURL={props.getIconURL}
          icon={i.icon}
          key={i.key}
          temp={i.temp}
        />
      )}
    </S.ForecastConditions>
  );
}

ForecastConditions.propTypes = {
  dayFromNum: PropTypes.func.isRequired,
  getIconURL: PropTypes.func.isRequired,
  handleHomeError: PropTypes.func.isRequired,
  weatherData: PropTypes.object
}

export default ForecastConditions;
