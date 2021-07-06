/**
 * React unit tests for SettingsButton.
 * 
 * - "renders properly given the minimal required props"
 * - "calls the onclick functions only when it should"
 * 
 * @file This file contains unit tests for the SettingsButton component.
 * @author Roger.
 * @since 1.0.0
 */

import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import renderer from 'react-test-renderer';
import { screen } from '@testing-library/react';

import SettingsButton from "../components/SettingsButton";

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
    render(<SettingsButton openSettings={() => {}} />, container);
  });
  expect(screen.getByTestId("icon")).toBeTruthy();

  // snapshot rendering with minimal props
  const test = renderer.create(<SettingsButton openSettings={() => {}} />,
                               container);
  expect(test).toMatchSnapshot();
});

it ("calls the onclick functions only when it should", () => {
  const mockClick = jest.fn();

  act(() => {
    render(<SettingsButton data-testid="submit" openSettings={mockClick} />,
           container);
  });

  const button = document.querySelector("[data-testid=submit]");

  act(() => {
    button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  expect(mockClick).toHaveBeenCalledTimes(1);
});
