import React from "react";

import ForecastDay from "./ForecastDay";

import * as S from "../styles/ForecastConditions.styles";

function ForecastConditions (props) {
  const [forecast, setForecast] = React.useState([]);

  React.useEffect(() => {
    const dayOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    var forecastTemp = [];

    const now = new Date();
    const nowDate = String(now.getDate()).padStart(2, "0");
    const nowMonth = new Intl.DateTimeFormat("en-US", { month: "short" }).format(now);
    const nowDay = dayOfWeek[now.getDay()];
    
    var dateDay;
    var i;

    try {
      for (i = 0; i < 5; i++) {
        const date = new Date(props.data.daily[i].dt * 1000);
        const dateDate = String(date.getDate()).padStart(2, "0");
        const dateMonth = new Intl.DateTimeFormat("en-US", { month: "short" }).format(date);
        dateDay = dayOfWeek[date.getDay()];

        if ((nowDate === dateDate) && (nowMonth === dateMonth) && (nowDay === dateDay)) {
          dateDay = "Today";
        }

        const data = {
          day: dateDay,
          description: props.data.daily[i].weather[0].description,
          icon: props.data.daily[i].weather[0].icon,
          temp: props.data.daily[i].temp.day
        }

        forecastTemp = [ ...forecastTemp, data ];
      }

      setForecast(forecastTemp);
    } catch (e) {
      var date = now;
      dateDay = nowDay;

      for (i = 0; i < 5; i++) {
        const data = {
          day: dateDay,
          description: "",
          icon: "",
          temp: ""
        }

        forecastTemp = [ ...forecastTemp, data ];

        date.setDate(date.getDate() + 1);
        dateDay = dayOfWeek[date.getDay()];
      }

      setForecast(forecastTemp);
    }
  }, [props]);

  return (
    <S.ForecastConditions>
      {forecast.map((item) =>
        <ForecastDay day={item.day} description={item.description} icon={item.icon} key={item.day} temp={item.temp} />
      )}
    </S.ForecastConditions>
  );
}

export default ForecastConditions;
