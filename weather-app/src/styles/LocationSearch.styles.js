/**
 * Styled components for the LocationSearch component.
 * 
 * @file This file defines the LocationSearch styled-components.
 * @author Roger.
 * @since 1.0.2
 */

import styled from "styled-components";

export const LocationSearch = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;

  h4 {
    margin: 0 0 10px;
    text-align: center;
  }

  @media (orientation: landscape) and (max-height: 639px) {
    h4 {
      font-size: 0.8em;
      margin: 0 0 5px;
    }
  }
`;

export const SearchButton = styled.button`
  background-color: rgb(16,152,173);
  border: 1px solid rgb(12,122,138);
  border-radius: 0 5px 5px 0;
  font-weight: 600;
  padding: 3px 0;

  &:hover {
    background-color: rgb(20,160,180);
    cursor: pointer;
    opacity: 0.9;
  }

  @media (orientation: landscape) and (max-height: 639px) {
    font-size: 0.6em;
  }
`;

export const SearchContainer = styled.div`
  align-items: stretch;
  display: flex;
  flex-direction: row;
  width: 100%;

  @media (max-width: 599px) {
    flex-direction: column;
  }
`;
