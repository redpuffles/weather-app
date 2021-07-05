/**
 * A component that allows the user to swap between Celsius and Fahrenheit.
 * 
 * The active unit is white, not active is grey. Click on the grey symbol to
 * swap to it.
 * 
 * @file This file defines the ChangeUnits component class.
 * @author Roger.
 * @since 1.0.7
 */

import PropTypes from "prop-types";
import React from "react";

import * as S from "../styles/ChangeUnits.styles";

function ChangeUnits (props) {
  return (
    <S.ChangeUnits>
      {props.units === "metric"
        ? <div>
            <S.UnitOption active={true}>°C</S.UnitOption>
            <S.UnitOptionDivide>|</S.UnitOptionDivide>
            <S.UnitOption
              active={false}
              onClick={props.handleUnitsF}
            >
              °F
            </S.UnitOption>
          </div>
        : <div>
            <S.UnitOption
              active={false}
              onClick={props.handleUnitsC}
            >
              °C
            </S.UnitOption>
            <S.UnitOptionDivide>|</S.UnitOptionDivide>
            <S.UnitOption active={true}>°F</S.UnitOption>
          </div>
      }
    </S.ChangeUnits>
  );
}

ChangeUnits.propTypes = {
  handleUnitsC: PropTypes.func,
  handleUnitsF: PropTypes.func,
  units: PropTypes.string
}

export default ChangeUnits;
