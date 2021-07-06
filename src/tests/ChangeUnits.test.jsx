/**
 * React unit tests for ChangeUnits.
 * 
 * - "renders properly given the minimal required props"
 * - "calls the onclick functions only when it should"
 * 
 * @file This file contains unit tests for the ChangeUnits component.
 * @author Roger.
 * @since 1.0.0
 */

import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import renderer from 'react-test-renderer';
import { screen } from '@testing-library/react';

import ChangeUnits from "../components/ChangeUnits";
import { UnitOption } from "../styles/ChangeUnits.styles";

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
  // given metric AKA celsius
  act(() => {
    render(<ChangeUnits
              handleUnitsC={() => {}}
              handleUnitsF={() => {}}
              units="metric"
           />, container);
  });
  expect(container.textContent).toBe("°C|°F");
  expect(screen.getByTestId("celsius")).toHaveTextContent("°C");
  expect(screen.getByTestId("celsius")).toHaveStyle("color: white");
  expect(screen.getByTestId("celsius")).toHaveStyle("font-weight: 700");
  expect(screen.getByTestId("fahrenheit")).toHaveTextContent("°F");
  expect(screen.getByTestId("fahrenheit")).toHaveStyle("color: grey");
  expect(screen.getByTestId("fahrenheit")).toHaveStyle("font-weight: 400");

  // given imperial AKA fahrenheit
  act(() => {
    render(<ChangeUnits
              handleUnitsC={() => {}}
              handleUnitsF={() => {}}
              units="imperial"
           />, container);
  });
  expect(container.textContent).toBe("°C|°F");
  expect(screen.getByTestId("celsius")).toHaveTextContent("°C");
  expect(screen.getByTestId("celsius")).toHaveStyle("color: grey");
  expect(screen.getByTestId("celsius")).toHaveStyle("font-weight: 400");
  expect(screen.getByTestId("fahrenheit")).toHaveTextContent("°F");
  expect(screen.getByTestId("fahrenheit")).toHaveStyle("color: white");
  expect(screen.getByTestId("fahrenheit")).toHaveStyle("font-weight: 700");

  // given random unit string, should default to celsius
  act(() => {
    render(<ChangeUnits
              handleUnitsC={() => {}}
              handleUnitsF={() => {}}
              units="random"
           />, container);
  });
  expect(container.textContent).toBe("°C|°F");
  expect(screen.getByTestId("celsius")).toHaveTextContent("°C");
  expect(screen.getByTestId("celsius")).toHaveStyle("color: white");
  expect(screen.getByTestId("celsius")).toHaveStyle("font-weight: 700");
  expect(screen.getByTestId("fahrenheit")).toHaveTextContent("°F");
  expect(screen.getByTestId("fahrenheit")).toHaveStyle("color: grey");
  expect(screen.getByTestId("fahrenheit")).toHaveStyle("font-weight: 400");

  // snapshot rendering with minimal props
  const test = renderer.create(<ChangeUnits
                                  handleUnitsC={() => {}}
                                  handleUnitsF={() => {}}
                                  units="metric"
                               />, container);
  expect(test).toMatchSnapshot();
});

it("calls the onclick functions only when it should", () => {
  const mockClick = jest.fn();

  act(() => {
    render(<UnitOption
              active={false}
              data-testid="celsius"
              onClick={mockClick}
            >
              unit
            </UnitOption>, container);
  });

  const button = document.querySelector("[data-testid=celsius]");

  act(() => {
    button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  expect(mockClick).toHaveBeenCalledTimes(1);
});
