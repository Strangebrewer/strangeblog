import styled from "styled-components";

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
  position: absolute;
  top: ${props => props.top || 0};
  right: ${props => props.right || 0};
  left: ${props => props.left || 0};
  bottom: ${props => props.bottom || 0};
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
