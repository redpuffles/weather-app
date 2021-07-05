import styled from "styled-components";

export const Day = styled.span`
  font-size: 0.8em;
  font-weight: 700;
`;

export const ForecastDay = styled.div`
  align-items: center;
  // background-color: skyblue;
  display: flex;
  flex: 1;
  flex-direction: column;
  height: 80%;
  justify-content: center;
`;

export const Icon = styled.img`
  max-height: 100px;
  max-width: 100px;
  width: 50%;
`;

export const Temp = styled.span`
  font-size: 0.7em;
  font-weight: 600;
`;
