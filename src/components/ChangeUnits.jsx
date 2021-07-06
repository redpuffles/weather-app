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
      {props.units === "imperial"
        ? <div>
            <S.UnitOption
              active={false}
              data-testid="celsius"
              onClick={props.handleUnitsC}
            >
              °C
            </S.UnitOption>
            <S.UnitOptionDivide>|</S.UnitOptionDivide>
            <S.UnitOption
              active={true}
              data-testid="fahrenheit"
            >°F</S.UnitOption>
          </div>
        : <div>
          <S.UnitOption
            active={true}
            data-testid="celsius"
          >°C</S.UnitOption>
          <S.UnitOptionDivide>|</S.UnitOptionDivide>
          <S.UnitOption
            active={false}
            data-testid="fahrenheit"
            onClick={props.handleUnitsF}
          >
            °F
          </S.UnitOption>
        </div>
      }
    </S.ChangeUnits>
  );
}

ChangeUnits.propTypes = {
  handleUnitsC: PropTypes.func.isRequired,
  handleUnitsF: PropTypes.func.isRequired,
  units: PropTypes.string.isRequired
}

export default ChangeUnits;
