/**
 * A component modal that represents the Location Settings page, allowing the
 * user to change the application's forecasting location.
 * 
 * The user can automatically get their location, or can manually search one and
 * use that. See UserGeolocation and LocationSearch respectively.
 * 
 * @file This file defines the LocationSettings component class.
 * @author Roger.
 * @since 1.2.3
 */

import PropTypes from "prop-types";
import React from "react";

import { ErrorMessage, ModalBackground } from "../styles/Global.styles";
import * as S from "../styles/LocationSettings.styles";

import LocationSearch from "./LocationSearch";
import UserGeolocation from "./UserGeolocation";

function LocationSettings (props) {
  const [errorGeneral, setErrorGeneral] = React.useState(""); // An error shown if something goes wrong when retrieving current location.
  const [location, setLocation] = React.useState(""); // Current location.

  /**
   * Retrieves and stores props.location in location.
   */
  React.useEffect(() => {
    try {
      setErrorGeneral("");
      setLocation(props.location);
    } catch (e) {
      setErrorGeneral("Couldn't fetch location information from the server.");
      setLocation("Location Undefined.");
    }
  }, [props.location]);

  return (
    <ModalBackground active={props.settingsActive}>
      <S.LocationSettings active={props.settingsActive}>
        <S.CloseButton onClick={props.closeSettings}>
          <i className="fas fa-times"></i>
        </S.CloseButton>
        <S.Header>
          <i className="fas fa-map-marker-alt"></i>
          <h3>Location Settings</h3>
        </S.Header>
        <S.CurrentLocation>
          <p data-testid="location">
            <b>Current Location:</b> {location}
          </p>
          <ErrorMessage data-testid="error-general">{errorGeneral}</ErrorMessage>
        </S.CurrentLocation>
        <S.OptionsContainer>
          <UserGeolocation
            closeSettings={props.closeSettings}
            handleCoords={props.handleCoords}
          />
          <S.OptionsSeparator>
            <span>OR</span>
          </S.OptionsSeparator>
          <LocationSearch
            closeSettings={props.closeSettings}
            handleCoords={props.handleCoords}
          />
        </S.OptionsContainer>
      </S.LocationSettings>
    </ModalBackground>
  );
}

LocationSettings.propTypes = {
  closeSettings: PropTypes.func.isRequired,
  handleCoords: PropTypes.func.isRequired,
  location: PropTypes.string,
  settingsActive: PropTypes.bool.isRequired
}

export default LocationSettings;
