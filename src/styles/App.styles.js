/**
 * Styled components for the App component/page.
 * 
 * @file This file defines the App styled-components.
 * @author Roger.
 * @since 1.0.3
 */

import styled from "styled-components";

export const App = styled.div `
  background: linear-gradient(180deg, rgba(10,16,46,1) 0%, rgba(11,19,65,1) 50%,
              rgba(66,66,66,1) 100%);
  color: white;
  font-family: "Open Sans", "sans-serif";
  height: 100vh;
  margin: 0;
  width: 100vw;

  @media (orientation: landscape) {
    min-height: 360px;
    min-width: 640px;
  }

  @media (orientation: portrait) {
    min-height: 640px;
    min-width: 360px;
  }
`;

export const Date = styled.span`
  font-size: 0.8em;
  font-weight: 600;
  margin-bottom: 10px;
  text-align: center;

  @media (orientation: landscape) and (max-height: 639px) {
    font-size: 0.7em;
  }
`;

export const HomeWrapper = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 40px);
  margin: auto;
  max-width: calc(1200px - 40px);
  padding: 20px;

  @media (orientation: landscape) {
    min-height: calc(360px - 40px);
    min-width: calc(640px - 40px);
  }

  @media (orientation: portrait) {
    min-height: calc(640px - 40px);
    min-width: calc(360px - 40px);
  }
`;

export const Location = styled.span`
  font-weight: 600;
  overflow: hidden;
  padding: 0 20px;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (orientation: landscape) and (max-height: 639px) {
    font-size: 0.8em;
  }
`;
