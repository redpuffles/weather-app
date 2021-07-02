import React from "react";

function ForecastConditions (props) {
  const [forecast, setForecast] = React.useState([]);

  React.useEffect(() => {
    setForecast([]);
  
    try {
      console.log(props.data.forecast.forecastday);

      for (var i = 0; i < props.data.forecast.forecastday.length; i++) {
        const date = new Date(props.data.forecast.forecastday[i].date_epoch * 1000);
        const dayOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const data = {
          avgtemp_c: props.data.forecast.forecastday[i].day.avgtemp_c,
          avgtemp_f: props.data.forecast.forecastday[i].day.avgtemp_f,
          day: dayOfWeek[date.getDay()]
        }
        setForecast([...forecast, data]);
      }
    } catch (e) {
      setForecast([]);
    }
  }, [props]);

  return (
    <div>{JSON.stringify(forecast)}</div>
  );
}

export default ForecastConditions;
