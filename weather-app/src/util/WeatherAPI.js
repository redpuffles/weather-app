/**
 * An API for making HTTP calls to weatherapi.com
 * 
 * @file This file defines the API class.
 * @author Roger.
 * @since 1.0.0
 */

import api_data from "../api_data.json";

export class API {
  constructor (url) {
    this.url = url;
  }

  /**
   * Returns most recent weather data for the queried location.
   * 
   * @param {string} query The city or location phrase to query.
   * 
   * @return {object} The response object, including response code and body.
   */
  current (query) {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json"
      }
    }

    return (fetch(`${this.url}/current.json?key=${api_data.key}&q=${query}&aqi=no`, options));
  }

  /**
   * Returns most recent weather data for the queried location, as well as data
   * for the next n days.
   * 
   * @param {integer} days Number of days to get forecast data for (includes the
   *                       current day).
   * @param {string} query The city or location phrase to query.
   * 
   * @return {object} The response object, including response code and body.
   */
  forecast (days, query) {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json"
      }
    }

    return (fetch(`${this.url}/forecast.json?key=${api_data.key}&q=${query}&days=${days}&aqi=no&alerts=no`, options));
  }
}

const api = new API(api_data.url);
export default api;
