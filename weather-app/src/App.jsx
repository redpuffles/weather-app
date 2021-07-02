/*

Last Updated: 1 July 2021, Roger.
Created: 1 July 2021, Roger.

*/

import React from "react";

import "./App.css";
import defaults from "./defaults.json";

import CurrentConditions from "./components/CurrentConditions";
import ForecastConditions from "./components/ForecastConditions";

import api from "./util/WeatherAPI";

function App () {
  const [data, setData] = React.useState({});
  const [location, setLocation] = React.useState(defaults.location);
  const [units, setUnits] = React.useState(defaults.unit);

  React.useEffect(() => {
    async function fetchData () {
      const response = await api.forecast(5, location);
      const body = await response.json();
  
      if (response.status !== 200) {
        console.log("ERROR FETCHING FORECAST DATA.");
        return;
      }
  
      setData(body);
  
      return;
    }

    fetchData();
  }, [location]);

  return (
    <div className="App">
      <CurrentConditions data={data} units={units} />
      <ForecastConditions data={data} units={units} />
    </div>
  );
}

export default App;
