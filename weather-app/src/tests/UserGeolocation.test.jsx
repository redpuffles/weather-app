/**
 * React unit tests for UserGeolocation.
 * 
 * - "renders properly given the minimal required props"
 * - "calls the onclick functions only when it should"
 * 
 * @file This file contains unit tests for the UserGeolocation component.
 * @author Roger.
 * @since 1.0.0
 */

import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import renderer from 'react-test-renderer';
import { screen } from '@testing-library/react';

import UserGeolocation from "../components/UserGeolocation";
import { LocateButton } from "../styles/UserGeolocation.styles";

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
    render(<UserGeolocation
              closeSettings={() => {}}
              handleCoords={() => {}}
           />, container);
  });
  expect(screen.getByTestId("location-show")).toBeTruthy();
  expect(screen.getByTestId("button-icon")).toBeTruthy();
  expect(screen.getByTestId("error-locate")).toHaveTextContent("");

  // snapshot rendering with minimal props
  const test = renderer.create(<UserGeolocation
                                  closeSettings={() => {}}
                                  handleCoords={() => {}}
                               />, container);
  expect(test).toMatchSnapshot();
});

it ("calls the onclick functions only when it should", () => {
  const mockClick = jest.fn();

  act(() => {
    render(<LocateButton data-testid="button" onClick={mockClick} />,
           container);
  });

  const button = document.querySelector("[data-testid=button]");

  act(() => {
    button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  expect(mockClick).toHaveBeenCalledTimes(1);
});
