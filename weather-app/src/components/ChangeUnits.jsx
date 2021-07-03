import React from "react";

function ChangeUnits (props) {
  return (
    <div>
        {props.units === "metric"
          ? <p>
              <span><b>°C</b></span> | <span onClick={props.handleUnitsF}>°F</span>
            </p>
          : <p>
              <span onClick={props.handleUnitsC}>°C</span> | <span><b>°F</b></span>
            </p>
        }
    </div>
  );
}

export default ChangeUnits;
