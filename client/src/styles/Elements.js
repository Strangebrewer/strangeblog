import styled from "styled-components";

export const SpinnerWrap = styled.div`
  height: 100vh;
  width: 100vw;
  background: ${props => props.background || '#00000088'};
  display: flex;
  position: fixed;
  top: 0;
  z-index: 999999;
`;

export const Spinner = styled.span`
  -webkit-animation: spinner 400ms linear infinite;
  animation: spinner 400ms linear infinite;
  border: solid ${props => props.border || '2'}px transparent;
  border-left-color: ${props => 'white'};
  border-bottom-color: ${props => props.theme.purple};
  border-right-color: ${props => props.theme.blue};
  /* border-top-color: ${props => props.theme.blue}; */
  border-radius: 50%;
  height: ${props => props.size}px;
  margin: auto;
  width: ${props => props.size}px;
  @-webkit-keyframes spinner {
    0%   { -webkit-transform: rotate(0deg); }
    100% { -webkit-transform: rotate(360deg); }
  }
  @keyframes spinner {
    0%   { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
