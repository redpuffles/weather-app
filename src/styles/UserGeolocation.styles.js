/**
 * Styled components for the UserGeolocation component.
 * 
 * @file This file defines the UserGeolocation styled-components.
 * @author Roger.
 * @since 1.0.0
 */

import styled from "styled-components";

export const LocateButton = styled.span`
  background-color: rgb(16,152,173);
  border: 1px solid rgb(12,122,138);
  border-radius: 5px;
  font-size: 1em;
  margin: 0 10px 0 0;
  padding: 4px 8px;

  &:active {
    padding: 3px 6px;
  }

  &:hover {
    background-color: rgb(20,160,180);
    cursor: pointer;
    opacity: 0.9;
  }
`;

export const UserGeolocation = styled.div`
  p {
    text-align: center;
  }

  @media (orientation: landscape) and (max-height: 639px) {
    font-size: 0.9em;
  }
`;
