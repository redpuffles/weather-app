/**
 * React unit tests for App.
 * 
 * - "renders snapshot"
 * 
 * @file This file contains unit tests for the App component.
 * @author Roger.
 * @since 1.0.0
 */

import React from "react";
import { unmountComponentAtNode } from "react-dom";
import renderer from 'react-test-renderer';

import App from "../App";

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

it("renders snapshot", () => {
  // snapshot rendering with minimal props
  const test = renderer.create(<App />, container);
  expect(test).toMatchSnapshot();
});
