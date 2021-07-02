import React from "react";

function CurrentConditions (props) {
  const [conditions, setConditions] = React.useState({});
  const [date, setDate] = React.useState("");
  const [high, setHigh] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [low, setLow] = React.useState("");
  const [temp, setTemp] = React.useState("");

  React.useEffect(() => {
    try {
      setConditions(props.data.current.condition);
    } catch (e) {
      const cond = {
        icon: "",
        text: "-"
      }
      setConditions(cond);
    }
  }, [props]);

  React.useEffect(() => {
    try {
      const cur = new Date(props.data.location.localtime_epoch * 1000);
      const date = cur.getDate();
      const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(cur);
      const dayOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const day = cur.getDay();
      setDate(`${date} ${month} (${dayOfWeek[day]})`);
    } catch (e) {
      setDate("-");
    };
  }, [props]);

  React.useEffect(() => {
    try {
      if (props.units === "temp_c") { setHigh(props.data.forecast.forecastday[0].day.maxtemp_c) }
      else if (props.units === "temp_f") { setHigh(props.data.forecast.forecastday[0].day.maxtemp_f) }
    } catch (e) {
      setHigh("-");
    }
  }, [props]);

  React.useEffect(() => {
    try {
      setLocation(props.data.location.name + ", " + props.data.location.region);
    } catch (e) {
      setLocation("-");
    };
  }, [props]);


  React.useEffect(() => {
    try {
      if (props.units === "temp_c") { setLow(props.data.forecast.forecastday[0].day.mintemp_c) }
      else if (props.units === "temp_f") { setLow(props.data.forecast.forecastday[0].day.mintemp_f) }
    } catch (e) {
      setLow("-");
    }
  }, [props]);

  React.useEffect(() => {
    try {
      if (props.units === "temp_c") { setTemp(props.data.current.temp_c) }
      else if (props.units === "temp_f") { setTemp(props.data.current.temp_f) }
    } catch (e) {
      setTemp("-");
    };
  }, [props]);

  return (
    <div>
      <p>{date}</p>
      <p>{location}</p>
      <p>{temp}°</p>
      <p>{conditions.text}</p>
      <img src={conditions.icon} />
      <p>low: {low}° high: {high}°</p>
    </div>
  );
}

export default CurrentConditions;
