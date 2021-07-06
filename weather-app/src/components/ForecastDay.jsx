/**
 * A component that displays brief forecast weather data for a day.
 * 
 * Shows the day name, temperature, and a weather conditions icon.
 * 
 * @file This file defines the ForecastDay component class.
 * @author Roger.
 * @since 1.0.3
 */

import PropTypes from "prop-types";
import React from "react";

import * as S from "../styles/ForecastDay.styles";

function ForecastDay (props) {
  const [alt, setAlt] = React.useState(""); // Alt text for the icon image.
  const [day, setDay] = React.useState(""); // The day this component corresponds to, shortened to three letters.
  const [iconURL, setIconURL] = React.useState(""); // // An icon URL reflecting forecasted weather conditions.
  const [temp, setTemp] = React.useState(""); // Forecasted average temperature.

  /**
   * Stores and updates alt from props.
   */
  React.useEffect(() => {
    if (props.desc !== "") {
      setAlt(props.desc);
    } else {
      setAlt("Alt text unavailable.");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.alt]);

  /**
   * Stores and updates day from props (a day should always be provided).
   */
  React.useEffect(() => {
    setDay(props.day);
  }, [props.day]);

  /**
   * Stores and updates icon URL from props. Convert props.icon into the
   * correspnding URL.
   */
  React.useEffect(() => {
    if (props.icon !== "") {
      setIconURL(props.getIconURL(props.icon));
    } else {
      setIconURL("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.icon]);

  /**
   * Stores and updates temp from props.
   */
  React.useEffect(() => {
    if (props.Temp !== "") {
      setTemp(Math.round(props.temp));
    } else {
      setTemp("-");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.temp]);

  return (
    <S.ForecastDay>
      <S.Day>{day}</S.Day>
      <S.Temp>{temp}°</S.Temp>
      {iconURL !== ""
        ? <S.Icon alt={alt} src={iconURL}/>
        : null
      }
    </S.ForecastDay>
  );
}

ForecastDay.propTypes = {
  alt: PropTypes.string,
  day: PropTypes.string.isRequired,
  getIconURL: PropTypes.func,
  icon: PropTypes.string,
  temp: PropTypes.string
}

export default ForecastDay;
