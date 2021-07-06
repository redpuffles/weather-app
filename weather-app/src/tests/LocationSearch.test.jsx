/**
 * React unit tests for LocationSearch.
 * 
 * - "renders properly given the minimal required props"
 * - "calls the onclick functions only when it should"
 * 
 * @file This file contains unit tests for the LocationSearch component.
 * @author Roger.
 * @since 1.0.0
 */

import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import renderer from 'react-test-renderer';
import { screen } from '@testing-library/react';

import LocationSearch from "../components/LocationSearch";
import { SearchButton } from "../styles/LocationSearch.styles";

jest.mock("../components/LocationSearch", () => {
  return function DummyAutoComplete (props) {
    return (
      <div data-testid="autocomplete">
        test
      </div>
    );
  }
});

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
  // renders externally imported GooglePlacesAutocomplete component
  act(() => {
    render(<LocationSearch
              closeSettings={() => {}}
              handleCoords={() => {}}
           />, container);
  });
  expect(screen.getByTestId("autocomplete")).toBeTruthy();

  // snapshot rendering with minimal props
  const test = renderer.create(<LocationSearch
                                  closeSettings={() => {}}
                                  handleCoords={() => {}}
                               />, container);
  expect(test).toMatchSnapshot();
});

it("calls the onclick functions only when it should", () => {
  // search button
  const mockClick = jest.fn();

  act(() => {
    render(<SearchButton
              data-testid="submit"
              onClick={mockClick}
           />, container);
  });

  const button = document.querySelector("[data-testid=submit]");

  act(() => {
    button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  expect(mockClick).toHaveBeenCalledTimes(1);
});
