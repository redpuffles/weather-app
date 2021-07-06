/**
 * React unit tests for LocationSettings.
 * 
 * - "renders properly given the minimal required props"
 * - "renders properly given relevant props"
 * 
 * @file This file contains unit tests for the LocationSettings component.
 * @author Roger.
 * @since 1.0.0
 */

import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import renderer from 'react-test-renderer';
import { screen } from '@testing-library/react';

import LocationSettings from "../components/LocationSettings";

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
    render(<LocationSettings
            closeSettings={() => {}}
            handleCoords={() => {}}
            settingsActive={false}
           />, container);
  });
  expect(screen.getByTestId("location"))
    .toHaveTextContent("Current Location:");
  expect(screen.getByTestId("error-general"))
    .toHaveTextContent("");

  // snapshot rendering with minimal props
  const test = renderer.create(<LocationSettings
                                  closeSettings={() => {}}
                                  handleCoords={() => {}}
                                  settingsActive={false}
                               />, container);
  expect(test).toMatchSnapshot();
});

it("renders properly given relevant props", () => {
  act(() => {
    render(<LocationSettings
            closeSettings={() => {}}
            handleCoords={() => {}}
            location={"test-location"}
            settingsActive={false}
           />, container);
  });
  expect(screen.getByTestId("location"))
    .toHaveTextContent("Current Location: test-location");
  expect(screen.getByTestId("error-general"))
    .toHaveTextContent("");
});
