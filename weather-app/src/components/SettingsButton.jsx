/**
 * A button component that opens Location Settings.
 * 
 * Displays on the home page.
 * 
 * @file This file defines the SettingsButton component class.
 * @author Roger.
 * @since 1.0.2
 */

import PropTypes from "prop-types";
import React from "react";

import * as S from "../styles/SettingsButton.styles";

function SettingsButton (props) {
  return (
    <S.SettingsButton onClick={props.openSettings}>
      <i className="fas fa-cog"></i>
    </S.SettingsButton>
  );
}

SettingsButton.propTypes = {
  openSettings: PropTypes.func
}

export default SettingsButton;
