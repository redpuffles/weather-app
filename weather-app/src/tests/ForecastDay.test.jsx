/**
 * React unit tests for ForecastDay.
 * 
 * - "renders properly given the minimal required props"
 * - "renders properly given relevant weatherData props"
 * 
 * @file This file contains unit tests for the ForecastDay component.
 * @author Roger.
 * @since 1.0.0
 */

import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import renderer from 'react-test-renderer';
import { screen } from '@testing-library/react';

import ForecastDay from "../components/ForecastDay";

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

it("renders properly given the minimal required props", () => {
  act(() => {
    render(<ForecastDay
              alt={""}
              day={"test-day"}
              getIconURL={() => {}}
              icon={""}
              temp={""}
           />, container);
  });
  expect(screen.getByTestId("day")).toHaveTextContent("test-day");
  expect(screen.getByTestId("temp")).toHaveTextContent("°");
  
  // snapshot rendering with minimal props
  const test = renderer.create(<ForecastDay
                                  alt={""}
                                  day={"Day"}
                                  getIconURL={() => {}}
                                  icon={""}
                                  temp={""}
                               />, container);
  expect(test).toMatchSnapshot();
});

it("renders properly given relevant weatherData props", () => {
  // given prop values should be reflected, iconURL should be called
  const mockURL = jest.fn();

  act(() => {
    render(<ForecastDay
              alt={"test-alt"}
              day={"test-day"}
              getIconURL={mockURL}
              icon={"01d"}
              temp={"1"}
           />, container);
  });
  expect(screen.getByTestId("day")).toHaveTextContent("test-day");
  expect(screen.getByTestId("temp")).toHaveTextContent("1°");
  expect(screen.getByAltText("test-alt")).toBeTruthy();
  expect(mockURL).toHaveBeenCalledTimes(1);
});
