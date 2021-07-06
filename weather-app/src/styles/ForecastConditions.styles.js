/**
 * Styled components for the ForecastConditions component.
 * 
 * @file This file defines the ForecastConditions styled-components.
 * @author Roger.
 * @since 1.0.2
 */

import styled from "styled-components";

export const ForecastConditions = styled.div`
  align-items: center;
  display: flex;
  flex: 2;
  flex-direction: row;
  gap: 10px;

  @media (orientation: landscape) and (max-height: 640px) {
    flex: 1;
  }
`;
