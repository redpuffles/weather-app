import React from "react";

import api_urls from "../config/api_urls.json";

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
      setTemp(props.temp);
    }
  }, [props]);

  return (
    <div>
      <p>{props.day}</p>
      <p>{temp}°</p>
      {icon === ""
        ? null
        : <img alt={description} src={icon} />
      }
    </div>
  );
}

export default ForecastDay;
