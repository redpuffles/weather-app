import styled from "styled-components";

export const LocationSearch = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;

  h4 {
    margin: 0 0 10px;
    text-align: center;
  }
`;

export const SearchButton = styled.button`
  background-color: rgb(16,152,173);
  border: 1px solid rgb(12,122,138);
  border-radius: 0 5px 5px 0;
  // display: inline-block;
  // font-size: 0.8em;
  font-weight: 600;
  // height: 100%;

  &:hover {
    background-color: rgb(20,160,180);
    cursor: pointer;
    opacity: 0.9;
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
