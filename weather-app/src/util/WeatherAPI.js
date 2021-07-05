/**
 * An API for making HTTP calls to OpenWeather One Call and Google Maps APIs.
 * 
 * Google Geocoding API: https://developers.google.com/maps/documentation/geocoding/overview
 * OpenWeather One Call API: https://openweathermap.org/api/one-call-api
 * 
 * @file This file defines the API class.
 * @author Roger.
 * @since 1.0.2
 */

import api_keys from "../config/api_keys.json";
import api_urls from "../config/api_urls.json";

export class API {
  constructor (forecastURL, reverseGeoURL) {
    this.forecastURL = forecastURL;
    this.reverseGeoURL = reverseGeoURL;
  }

  /**
   * Returns weather data for the given location for the next 7 days.
   * 
   * @param {string} lat   The latitude of the location.
   * @param {string} lon   The longitude of the location.
   * @param {string} units Units to receive temperature as (metric or imperial).
   * 
   * @return {object} The response object, including response code and body.
   */
  forecast (lat, lon, units) {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json"
      }
    }

    return (fetch(`${this.forecastURL}?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=${units}&appid=${api_keys.openweather}`, options));
  }

  /**
   * Converts latitude and longitude into a string location.
   * 
   * @param {string} lat   The latitude of the location.
   * @param {string} lon   The longitude of the location.
   * 
   * @return {object} The response object, including response code and body.
   */
  reverseGeocode (lat, lon) {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json"
      }
    }

    return (fetch(`${this.reverseGeoURL}?latlng=${lat},${lon}&key=${api_keys.googlemaps}`, options));
  }
}

const api = new API(api_urls.forecast, api_urls.reverse_geocode);

export default api;
