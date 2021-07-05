import styled from "styled-components";

export const SettingsButton = styled.span`
  border-radius: 2px;
  font-size: 1em;
  padding: 4px 8px;
  position: fixed;
  right: 10px;
  top: 10px;

  &:active {
    transform: translateY(2px);
  }

  &:hover {
    background-color: white;
    color: grey;
    cursor: pointer;
    opacity: 0.8;
  }

  @media (min-width: 1201px) {
    right: calc(10px + (100vw - 1200px) / 2);
  }
`;
