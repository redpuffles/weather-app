/**
 * Styled components for the LocationSettings component.
 * 
 * @file This file defines the LocationSettings styled-components.
 * @author Roger.
 * @since 1.1.2
 */

import styled from "styled-components";

export const CloseButton = styled.span`
  border-radius: 2px;
  left: calc(100% - 4px);
  padding: 4px 8px;
  position: fixed;
  top: 4px;
  transform: translateX(-100%);

  &:hover {
    background-color: white;
    cursor: pointer;
    opacity: 0.4;
  }
`;

export const CurrentLocation = styled.div`
  margin: 10px 0;

  @media (orientation: landscape) and (max-height: 639px) {
    font-size: 0.9em;
  }
`;

export const ErrorMessage = styled.p`
  color: red;
  font-size: 0.8em;
  margin: 0 0 0 10px;
`;

export const Header = styled.div`
  align-items: center;
  border-bottom: 1px solid grey;
  display: flex;
  font-size: 1.2em;
  justify-content: center;
  gap: 10px;
  padding: 0 20px 20px 0;

  h3 {
    display: inline-block;
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  i {
    display: inline-block;
  }

  @media (orientation: landscape) and (max-height: 639px) {
    font-size: 0.8em;
  }
`;

export const LocationSettings = styled.div`
  background-color: white;
  border: 1px solid grey;
  color: black;
  display: ${props => props.active ? "block" : "none"};
  height: auto;
  left: 50%;
  padding: 40px 20px 30px;
  position: fixed;
  top: 50%;
  transform: translate(-50%, -50%);
  width: calc(80% - 40px);
  z-index: 11;

  p {
    font-size: 0.8em;
  }

  @media (min-width: 1201px) {
    width: calc(960px - 40px);
  }

  @media (orientation: landscape) and (max-height: 639px) {
    max-height: 250px;
    padding: 20px 20px 30px;
  }
`;

export const OptionsContainer = styled.div`
  margin: 60px 0 0;

  @media (orientation: landscape) and (max-height: 639px) {
    margin: 20px 0 0;
  }
`;

export const OptionsSeparator = styled.p`
  border-bottom: 1px solid grey;
  color: grey;
  line-height: 0.1em;
  margin: 20px 0;
  text-align: center;
  width: 100%;

  span {
    background: white;
    padding: 0 10px;
  }

  @media (orientation: landscape) and (max-height: 639px) {
    span {
      font-size: 0.8em;
    }
  }
`;
