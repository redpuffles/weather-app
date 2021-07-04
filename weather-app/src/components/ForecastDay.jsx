import React from "react";

import api_urls from "../config/api_urls.json";

import * as S from "../styles/ForecastDay.styles";

function ForecastDay (props) {
  const [description, setDescription] = React.useState("");
  const [icon, setIcon] = React.useState("");
  const [temp, setTemp] = React.useState("");

  React.useEffect(() => {
    if (props.description === "") {
      setDescription("Unavailable");
    } else {
      setDescription(props.description);
    }
  }, [props]);

  React.useEffect(() => {
    if (props.icon === "") {
      setIcon("");
    } else {
      setIcon(api_urls.weather_icons + "/" + props.icon + "@2x.png");
    }
  }, [props]);

  React.useEffect(() => {
    if (props.temp === "") {
      setTemp("-");
    } else {
      setTemp(Math.round(props.temp));
    }
  }, [props]);

  return (
    <S.ForecastDay>
      <S.Day>{props.day}</S.Day>
      <S.Temp>{temp}°</S.Temp>
      {icon === ""
        ? null
        : <S.Img alt={description} src={icon} width="10px"/>
      }
    </S.ForecastDay>
  );
}

export default ForecastDay;
