import React from "react";

import api_urls from "../config/api_urls.json";
import defaults from "../config/defaults.json";

function CurrentConditions (props) {
  const [conditions, setConditions] = React.useState({});
  const [date, setDate] = React.useState("");
  const [high, setHigh] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [low, setLow] = React.useState("");
  const [temp, setTemp] = React.useState("");

  React.useEffect(() => {
    try {
      setConditions(props.data.current.weather[0]);
    } catch (e) {
      const cond = {
        icon: "01d",
        main: "-"
      }
      setConditions(cond);
    }
  }, [props]);

  React.useEffect(() => {
    try {
      const dayOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

      const now = new Date();
      const date = String(now.getDate()).padStart(2, "0");
      const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(now);
      const day = dayOfWeek[now.getDay()];

      setDate(`${date} ${month} (${day})`);
    } catch (e) {
      setDate("-");
    };
  }, [props]);

  React.useEffect(() => {
    try {
      setHigh(props.data.daily[0].temp.max);
    } catch (e) {
      setHigh("-");
    }
  }, [props]);

  React.useEffect(() => {
    try {
      setLocation(props.location);
    } catch (e) {
      setLocation(defaults.location);
    };
  }, [props]);

  React.useEffect(() => {
    try {
      setLow(props.data.daily[0].temp.min);
    } catch (e) {
      setLow("-");
    }
  }, [props]);

  React.useEffect(() => {
    try {
      setTemp(props.data.current.temp);
    } catch (e) {
      setTemp("-");
    };
  }, [props]);

  return (
    <div>
      <p>{date}</p>
      <p>{location}</p>
      <p>{temp}°</p>
      <p>{conditions.main}</p>
      <img alt={conditions.main} src={api_urls.weather_icons + "/" + conditions.icon + "@2x.png"} />
      <p>low: {low}° high: {high}°</p>
    </div>
  );
}

export default CurrentConditions;
