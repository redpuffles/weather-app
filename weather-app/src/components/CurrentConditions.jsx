import React from "react";

function CurrentConditions (props) {
  const [conditions, setConditions] = React.useState({});
  const [date, setDate] = React.useState("");
  const [feels, setFeels] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [temp, setTemp] = React.useState("");

  React.useEffect(() => {
    try {
      setConditions(props.data.current.weather[0]);
    } catch (e) {
      const cond = {
        icon: "",
        main: "-"
      }
      setConditions(cond);
    }
  }, [props]);

  React.useEffect(() => {
    try {
      const cur = new Date(props.data.current.dt * 1000);
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
      setFeels(props.data.current.feels_like);
    } catch (e) {
      setFeels("-");
    }
  }, [props]);

  React.useEffect(() => {
    try {
      setLocation(props.location);
    } catch (e) {
      setLocation("-");
    };
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
      <p>{conditions.text}</p>
      <img src={conditions.icon} />
      <p>feels like: {feels}°</p>
    </div>
  );
}

export default CurrentConditions;
