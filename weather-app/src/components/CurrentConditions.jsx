import React from "react";

import api_urls from "../config/api_urls.json";
import defaults from "../config/defaults.json";

import * as S from "../styles/CurrentConditions.styles";

function CurrentConditions (props) {
  const [conditions, setConditions] = React.useState({});
  const [high, setHigh] = React.useState("");
  const [low, setLow] = React.useState("");
  const [temp, setTemp] = React.useState("");

  // conditions: icon and main text
  React.useEffect(() => {
    try {
      setConditions(props.data.current.weather[0]);
    } catch (e) {
      const cond = {
        icon: "01d",
        main: "Weather Undefined"
      }

      setConditions(cond);
      props.setError("4. Couldn't fetch weather conditions from the servers.");
    }
  }, [props]);

  // high: text
  React.useEffect(() => {
    try {
      setHigh(Math.round(props.data.daily[0].temp.max));
    } catch (e) {
      setHigh("-");
      props.setError("5. Couldn't fetch max temperature from the servers.");
    }
  }, [props]);

  // low: text
  React.useEffect(() => {
    try {
      setLow(Math.round(props.data.daily[0].temp.min));
    } catch (e) {
      setLow("-");
      props.setError("6. Couldn't fetch minimum temperature from the servers.");
    }
  }, [props]);

  // temp: text
  React.useEffect(() => {
    try {
      setTemp(Math.round(props.data.current.temp));
    } catch (e) {
      setTemp("-");
      props.setError("7. Couldn't fetch current temperature from the servers.");
    };
  }, [props]);

  return (
    <S.CurrentConditions>
      <div>
        <S.Temp>{temp}</S.Temp>
        <S.TempDeg>°</S.TempDeg>
        <S.Desc>{conditions.main}</S.Desc>
      </div>
      <S.Img
        alt={conditions.main}
        src={api_urls.weather_icons + "/" + conditions.icon + "@2x.png"}
      />
      <S.LowHighContainer>
        <S.LowHigh>Low: {low}°</S.LowHigh>
        <S.LowHigh>High: {high}°</S.LowHigh>
      </S.LowHighContainer>
    </S.CurrentConditions>
  );
}

export default CurrentConditions;
