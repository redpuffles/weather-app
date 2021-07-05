import styled from "styled-components";

export const App = styled.div `
  background: linear-gradient(180deg, rgba(10,16,46,1) 0%, rgba(11,19,65,1) 50%, rgba(66,66,66,1) 100%);
  color: white;
  height: 100vh;
  margin: auto;
  // min-height: 360px;
  // min-width: 360px;
  width: 100vw;

  // @media (min-height: 1921px) {
  //   height: 1920px;
  // }

  @media (min-width: 1201px) {
    width: 1200px;
  }
`;

export const Date = styled.span`
  // background-color: lightgreen;
  font-size: 0.6em;
  font-weight: 600;
  margin-bottom: 10px;
  text-align: center;
`;

export const HomeWrapper = styled.div`
  // background-color: pink;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 40px);
  padding: 20px;
`;

export const Location = styled.span`
  // background-color: violet;
  font-weight: 600;
  overflow: hidden;
  padding: 0 20px;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
