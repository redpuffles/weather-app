/**
 * Styled components for the ForecastDay component.
 * 
 * @file This file defines the ForecastDay styled-components.
 * @author Roger.
 * @since 1.0.3
 */

import styled from "styled-components";

export const Day = styled.span`
  font-size: 0.8em;
  font-weight: 700;

  @media (orientation: landscape) and (max-height: 640px) {
    font-size: 0.7em;
  }
`;

export const ForecastDay = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 2px;
  justify-content: center;
`;

export const Icon = styled.img`
  max-height: 100px;
  max-width: 100px;
  width: 50%;

  @media (orientation: landscape) and (max-height: 640px) {
    width: 30%;
  }
`;

export const Temp = styled.span`
  font-size: 0.7em;
  font-weight: 600;

  @media (orientation: landscape) and (max-height: 640px) {
    font-size: 0.6em;
  }
`;
