import React from "react";
import GooglePlacesAutoComplete, { geocodeByPlaceId } from "react-google-places-autocomplete";
import OutsideClickHandler from "react-outside-click-handler";

import { Modal, ModalBackground } from "../styles/Modal.styles";

import api_keys from "../config/api_keys.json";

function LocationSettings (props) {
  const [search, setSearch] = React.useState("");
  const [status, setStatus] = React.useState("");

  function getLocation () {
    if (!navigator.geolocation) {
      console.log("Geolocation not supported.");
    } else {
      navigator.geolocation.getCurrentPosition(getLocationSuccess, getLocationError);
    }
  }

  function getLocationError () {
    setStatus("Unable to retrieve your location. Try manually searching for it below.");
  }

  function getLocationSuccess (position) {
    const gotLatitude = position.coords.latitude;
    const gotLongitude = position.coords.longitude;

    props.handleCoords(gotLatitude, gotLongitude);
  }

  function onOutsideClick () {
    ;
  }

  function submitSearch () {
    geocodeByPlaceId(search.value.place_id)
      .then(results => {
        props.handleCoords(String(results[0].geometry.location.lat()), String(results[0].geometry.location.lng()));
      })
      .catch(error => console.log("ERROR: RETRIEVING GEOCODE."));
  }

  return (
    <ModalBackground active="true">
      <OutsideClickHandler onOutsideClick={onOutsideClick}>
        <Modal active="true">
          <h2>Location Settings</h2>
          <p>Current Location: {props.location}</p>
          <div>
            <h4>Choose A New Location</h4>
            <div>
              <button onClick={getLocation} type="button">➤</button>
            </div>
            <p>{status}</p>
            <div>
              <GooglePlacesAutoComplete
                apiKey={api_keys.googleplaces}
                autocompletionRequest={{
                  types: [ "(regions)" ]
                }}
                debounce="1000"
                selectProps={{
                  search,
                  onChange: setSearch
                }}
              />
              <button onClick={submitSearch} type="button">Use this</button>
            </div>
          </div>
        </Modal>
      </OutsideClickHandler>
    </ModalBackground>
  );
}

export default LocationSettings;
