/**
 * A component that automatically gets the user location, if they choose to.
 * 
 * @file This file defines the UserGeolocation component class.
 * @author Roger.
 * @since 1.0.2
 */

import PropTypes from "prop-types";
import React from "react";

import { ErrorMessage } from "../styles/Global.styles";
import * as S from "../styles/UserGeolocation.styles";

function UserGeolocation (props) {
  const [errorLocate, setErrorLocate] = React.useState(""); // An error shown if something goes wrong when searching using this component. 

  /**
   * Try to find the user's location.
   * 
   * Run locateUserSuccess on success, or locateUserFail on a fail.
   * 
   * @return {null} No return values.
   */
  function locateUser () {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(locateUserSuccess,
                                               locateUserFail);
    } else {
      setErrorLocate("Your device doesn't support geolocation. Try searching " +
                     "for it below.");
    }
  }

  /**
   * Failed to retrieve user's location. Set errorLocate to an error message.
   * 
   * @return {null} No return values.
   */
  function locateUserFail () {
    setErrorLocate("Couldn't retrieve your location. Try searching for it " +
                   "below.");
  }

  /**
   * Succeeded in retrieving user's location. Update coords in App and close
   * settings.
   * 
   * @return {null} No return values.
   */
  function locateUserSuccess (pos) {
    setErrorLocate("");

    const lat = pos.coords.latitude;
    const long = pos.coords.longitude;

    props.handleCoords(lat, long);
    props.closeSettings();
  }

  return (
    <S.UserGeolocation>
      <p>
        <S.LocateButton onClick={locateUser}>
          <i className="fas fa-location-arrow"></i>
        </S.LocateButton>
        Use your own location.
      </p>
      <ErrorMessage>{errorLocate}</ErrorMessage>
    </S.UserGeolocation>
  );
}

UserGeolocation.propTypes = {
  closeSettings: PropTypes.func,
  handleCoords: PropTypes.func
}

export default UserGeolocation;
