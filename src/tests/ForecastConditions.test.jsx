/**
 * React unit tests for ForecastConditions.
 * 
 * - "renders properly with the minimal required props"
 * - "calls handleHomeError if weatherData isn't provided"
 * 
 * @file This file contains unit tests for the ForecastConditions component.
 * @author Roger.
 * @since 1.0.0
 */

import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import renderer from 'react-test-renderer';
import { screen } from '@testing-library/react';

import ForecastConditions from "../components/ForecastConditions";

function dayFromNum (num) {
  const dayOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return dayOfWeek[num];
}

let container = null;

afterEach(() => {
  // Clean up after exit.
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

beforeEach(() => {
  // Set up a DOM element as a render target.
  container = document.createElement("div");
  document.body.appendChild(container);
});

it("renders properly with the minimal required props", () => {
  // default values when weatherData isn't given as a prop. checks that five
  // children components are rendered, each with the correct day strings.
  act(() => {
    render(<ForecastConditions
              dayFromNum={dayFromNum}
              getIconURL={() => {}}
              handleHomeError={() => {}}
           />, container);
  });
  var date = new Date();
  for (var i = 0; i < 5; i++) {
    expect(screen.getByRole("forecast-day",
                            { name: dayFromNum(date.getDay()) })).toBeTruthy();
    date.setDate(date.getDate() + 1);
  }

  // snapshot rendering with minimal props
  const test = renderer.create(<ForecastConditions
                                  dayFromNum={(n) => { return "Mon"; }}
                                  getIconURL={() => {}}
                                  handleHomeError={() => {}}
                               />, container);
  expect(test).toMatchSnapshot();
});

it("calls handleHomeError if weatherData isn't provided", () => {
  const mockFunc = jest.fn();

  act(() => {
    render(<ForecastConditions
              dayFromNum={(n) => { return "Mon"; }}
              getIconURL={() => {}}
              handleHomeError={mockFunc}
           />, container);
  });
  expect(mockFunc).toHaveBeenCalledTimes(1);
});
