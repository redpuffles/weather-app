/**
 * A component that shows data reflecting current weather conditions.
 * 
 * Shows:
 *  - Current temperature.
 *  - Weather conditions as a simple phrase, e.g. "Clear".
 *  - An icon reflecting current weather conditions.
 *  - The low and high temperature of the day.
 * 
 * @file This file defines the CurrentConditions component class.
 * @author Roger.
 * @since 1.1.4
 */

import PropTypes from "prop-types";
import React from "react";

import * as S from "../styles/CurrentConditions.styles";

function CurrentConditions (props) {
  const [desc, setDesc] = React.useState(""); // Weather conditions as a simple phrase, e.g. "Clear".
  const [high, setHigh] = React.useState(""); // High temperature of the day.
  const [iconURL, setIconURL] = React.useState(""); // An icon URL reflecting current weather conditions.
  const [low, setLow] = React.useState(""); // Low temperature of the day.
  const [temp, setTemp] = React.useState(""); // Current temperature.

  /**
   * Stores relevant data from props.weatherData for display.
   */
  React.useEffect(() => {
    try {
      setDesc(props.weatherData.current.weather[0].main);
      setHigh(Math.round(props.weatherData.daily[0].temp.max));
      setIconURL(props.getIconURL(props.weatherData.current.weather[0].icon));
      setLow(Math.round(props.weatherData.daily[0].temp.min));
      setTemp(Math.round(props.weatherData.current.temp));
    } catch (e) {
      props.handleHomeError("Couldn't fetch current weather data from the servers.");
      setDesc("-");
      setHigh("-");
      setIconURL("");
      setLow("-");
      setTemp("-");
    }
  }, [props.weatherData]);

  return (
    <S.CurrentConditions>
      <S.TempContainer>
        <S.Temp>{temp}°</S.Temp>
        <S.Desc>{desc}</S.Desc>
      </S.TempContainer>
      <S.Icon
        alt={desc}
        src={iconURL}
      />
      <S.LowHighContainer>
        <S.LowHigh>Low: {low}°</S.LowHigh>
        <S.LowHigh>High: {high}°</S.LowHigh>
      </S.LowHighContainer>
    </S.CurrentConditions>
  );
}

CurrentConditions.propTypes = {
  getIconURL: PropTypes.func,
  handleHomeError: PropTypes.func,
  weatherData: PropTypes.object
}

export default CurrentConditions;
