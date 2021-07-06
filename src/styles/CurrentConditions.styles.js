/**
 * Styled components for the CurrentConditions component.
 * 
 * @file This file defines the CurrentConditions styled-components.
 * @author Roger.
 * @since 1.0.3
 */

import styled from "styled-components";

export const CurrentConditions = styled.div`
  align-items: center;
  display: flex;
  flex: 6;
  flex-direction: column;
  font-weight: 600;
  justify-content: space-around;

  @media (orientation: landscape) and (max-height: 640px) {
    flex: 1;
  }
`;

export const Desc = styled.span`
  display: block;
  font-size: 0.8em;
  text-align: center;

  @media (orientation: landscape) and (max-height: 639px) {
    display: none;
  }
`;

export const Icon = styled.img`
  @media (orientation: landscape) and (max-height: 639px) {
    display: none;
  }
`;

export const LowHigh = styled.div`
  font-size: 0.8em;

  & + & {
    margin-left: 20px;
  }

  @media (orientation: landscape) and (max-height: 639px) {
    display: none;
  }
`;

export const LowHighContainer = styled.span`
  display: flex;
  flex-direction: row;
`;

export const Temp = styled.span`
  font-size: 4em;

  @media (orientation: landscape) {
    font-size: 20vh;
  }

  @media (orientation: portrait) {
    font-size: 20vw;
  }
`;

export const TempContainer = styled.div`
  text-align: center;
`;
