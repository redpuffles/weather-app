/**
 * A component that allows the user to search for a location, and change the
 * application's forecasting location to it.
 * 
 * Contains a GooglePlacesAutoComplete component, courtesy of Tintef:
 *  - https://tintef.github.io/react-google-places-autocomplete/docs/
 * This uses various Google Maps and Google Places APIs.
 * 
 * @file This file defines the LocationSearch component class.
 * @author Roger.
 * @since 1.0.2
 */

import PropTypes from "prop-types";
import React from "react";
import GooglePlacesAutoComplete, { geocodeByPlaceId } from "react-google-places-autocomplete";

import { ErrorMessage } from "../styles/Global.styles";
import * as S from "../styles/LocationSearch.styles";

import api_keys from "../config/api_keys.json";

function LocationSearch (props) {
  const [errorSearch, setErrorSearch] = React.useState(""); // An error shown if something goes wrong when searching using this component.
  const [search, setSearch] = React.useState(""); // Value of the search, updates onChange.

  /**
   * Submits the searched and/or selected location and retrieves location data
   * from the Google Geocoding API.
   * 
   * Retrieves and updates coords in App. Clears the search box after
   * submission, regardless of success. On success, closes settings and returns
   * to the home page.
   * 
   * @return {null} No return values.
   */
  function submitSearch () {
    try {
      geocodeByPlaceId(search.value.place_id)
        .then(results => {
          const lat = String(results[0].geometry.location.lat());
          const long = String(results[0].geometry.location.lng());
          props.handleCoords(lat, long);
          setErrorSearch("");
          props.closeSettings();
        });
    } catch (e) {
      setErrorSearch("Couldn't retrieve location data from the server.");
    } finally {
      setSearch(null);
    }
  }

  return (
    <S.LocationSearch>
      <h4>Search For Your Location</h4>
      <ErrorMessage>{errorSearch}</ErrorMessage>
      <S.SearchContainer>
        <GooglePlacesAutoComplete
          apiKey={api_keys.googleplaces}
          autocompletionRequest={{
            types: [ "(regions)" ]
          }}
          debounce="1000"
          selectProps={{
            onChange: setSearch,
            placeholder: "Search and select...",
            styles: {
              container: (provided) => ({
                ...provided,
                flex: 1
              }),
              control: (provided) => ({
                ...provided,
                fontFamily: "Open Sans, Helvetica Nueue, sans-serif",
                height: "30px"
              }),
              menuList: (provided) => ({
                ...provided,
                maxHeight: "100px"
              })
            },
            value: search
          }}
        />
        <S.SearchButton onClick={submitSearch}>Update Location</S.SearchButton>
      </S.SearchContainer>
    </S.LocationSearch>
  );
}

LocationSearch.propTypes = {
  closeSettings: PropTypes.func,
  handleCoords: PropTypes.func
}

export default LocationSearch;
