import React from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';

import Login from '../components/authoritaw/Login';
import Signup from '../components/authoritaw/Signup';

const Auth = () => {
  return (
    <Wrapper>
      <Login />
      <Signup />
      <p><Link to="/">&lt;&lt; home</Link></p>
    </Wrapper>
  )
};

export default Auth;

export const Wrapper = styled.div`
  background-color: black;
  display: flex;
  justify-content: center;
  min-height: 100vh;
  min-width: 100%;
  position: relative;

  > p {
    position: absolute;
    bottom: 50px;
    text-align: center;
    > a {
      color: ${props => props.theme.nBlue};
    }
  }
`;
