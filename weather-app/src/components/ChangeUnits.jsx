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

export default ChangeUnits;
