import styled from "styled-components";

export const CurrentConditions = styled.div`
  align-items: center;
  // background-color: lightblue;
  display: flex;
  flex: 6;
  flex-direction: column;
  font-weight: 600;
  justify-content: space-around;
`;

export const Desc = styled.span`
  display: block;
  font-size: 0.8em;
  text-align: center;
`;

export const Icon = styled.img`
  // background-color: white;
`;

export const LowHigh = styled.div`
  font-size: 0.8em;

  & + & {
    margin-left: 20px;
  }
`;

export const LowHighContainer = styled.span`
  // background-color: white;
  display: flex;
  flex-direction: row;
`;

export const Temp = styled.span`
  font-size: 5em;

  // @media (min-width: 801px) {
  //   font-size: 8em;
  // }
`;

export const TempContainer = styled.div`
  text-align: center;
`;
