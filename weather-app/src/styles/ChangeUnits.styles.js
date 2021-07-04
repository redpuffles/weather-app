import styled, { css } from "styled-components";

export const ChangeUnits = styled.div`
  align-items: top;
  // background-color: lightgrey;
  border-bottom: 1px solid grey;
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: center;
  margin: 20px 0 0;
`;

export const UnitOption = styled.span`
  border-radius: 2px;
  color: ${props => props.active ? "black" : "grey"};
  font-weight: ${props => props.active ? 700 : 400};
  // opacity: ${props => props.active ? 1.0 : 0.8};
  padding: 5px;

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
  // opacity: 0.9;
`;
