/**
 * Styled components for the ChangeUnits component.
 * 
 * @file This file defines the ChangeUnits styled-components.
 * @author Roger.
 * @since 1.0.2
 */

import styled, { css } from "styled-components";

export const ChangeUnits = styled.div`
  align-items: top;
  border-bottom: 1px solid grey;
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: center;
  margin: 20px 0;

  @media (orientation: landscape) and (max-height: 640px) {
    margin: 15px 0 20px;
  }
`;

export const UnitOption = styled.span`
  border-radius: 2px;
  color: ${props => props.active ? "white" : "grey"};
  font-weight: ${props => props.active ? 700 : 400};
  padding: 5px 8px;

  ${props => !props.active && css `
    &:hover {
      background-color: white;
      cursor: pointer;
      opacity: 0.4;
    }
  `};
`;

export const UnitOptionDivide = styled.span`
  color: grey;
  margin: 0 2px;
`;
