import styled from "styled-components";

export const Modal = styled.div`
  background: white;
  display: ${props => props.active ? "block" : "none"};
  height: auto;
  left: 50%;
  padding: 10px;
  position: fixed;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
`;

export const ModalBackground = styled.div`
  background: rgba(0, 0, 0, 0.6);
  display: ${props => props.active ? "block" : "none"};
  left: 0;
  position: fixed;
  height: 100%;
  top: 0;
  width: 100%;
`;
