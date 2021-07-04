import React from "react";

import * as S from "../styles/SettingsButton.styles";

function SettingsButton (props) {
  return (
    <S.SettingsButton onClick={props.openSettings} type="button">Settings</S.SettingsButton>
  );
}

export default SettingsButton;
