/**
 * React unit tests for CurrentConditions.
 * 
 * - "renders properly given the minimal required props"
 * - "renders properly given weatherData props"
 * - "calls handleHomeError if weatherData isn't provided"
 * 
 * @file This file contains unit tests for the CurrentConditions component.
 * @author Roger.
 * @since 1.0.0
 */

import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import renderer from 'react-test-renderer';
import { screen } from '@testing-library/react';

import CurrentConditions from "../components/CurrentConditions";

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
  // default values when weatherData isn't given as a prop
  act(() => {
    render(<CurrentConditions
              getIconURL={() => {}}
              handleHomeError={() => {}}
           />, container);
  });
  expect(screen.getByTestId("temp")).toHaveTextContent("-°");
  expect(screen.getByTestId("desc")).toHaveTextContent("-");
  expect(screen.getByAltText("-")).toBeTruthy();
  expect(screen.getByTestId("low")).toHaveTextContent("-°");
  expect(screen.getByTestId("high")).toHaveTextContent("-°");

  // snapshot rendering with minimal props
  const test = renderer.create(<CurrentConditions
                                  getIconURL={() => {}}
                                  handleHomeError={() => {}}
                               />, container);
  expect(test).toMatchSnapshot();
});

it("renders properly given weatherData props", () => {
  // given prop values should be reflected, iconURL should be called
  const mockURL = jest.fn();

  const weatherData = {
                        current: {
                          temp: "50.1",
                          weather: [
                            {
                              icon: "01d",
                              main: "Sunny"
                            }
                          ]
                        },
                        daily: [
                          {
                            temp: {
                              max: "100",
                              min: "1"
                            }
                          }
                        ]
                      }

  act(() => {
    render(<CurrentConditions
              getIconURL={mockURL}
              handleHomeError={() => {}}
              weatherData={weatherData}
           />, container);
  });
  expect(screen.getByTestId("temp")).toHaveTextContent("50°");
  expect(screen.getByTestId("desc")).toHaveTextContent("Sunny");
  expect(screen.getByAltText("Sunny")).toBeTruthy();
  expect(mockURL).toHaveBeenCalledTimes(1);
  expect(screen.getByTestId("low")).toHaveTextContent("1°");
  expect(screen.getByTestId("high")).toHaveTextContent("100°");
});

it("calls handleHomeError if weatherData isn't provided", () => {
  const mockFunc = jest.fn();

  act(() => {
    render(<CurrentConditions
              getIconURL={() => {}}
              handleHomeError={mockFunc}
          />, container);
  });
  expect(mockFunc).toHaveBeenCalledTimes(1);
});
