import { useState } from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';

import Login from '../components/authoritaw/Login';
import Signup from '../components/authoritaw/Signup';

const Auth = () => {
  const [showLogin, setShowLogin] = useState(true);

  function toggleForms() {
    setShowLogin(!showLogin);
  }

  return (
    <Wrapper>
      {showLogin
        ? (
          <Login toggleForms={toggleForms} />
        ) : (
          <Signup toggleForms={toggleForms} />
        )}
      <p><Link to="/">&lt;&lt; home</Link></p>
    </Wrapper>
  )
};

export default Auth;

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  min-height: 100vh;
  min-width: 100vw;
  position: relative;

  > p {
    bottom: 50px;
    position: absolute;
    text-align: center;
    
    > a {
      color: ${props => props.theme.nBlue};
    }
  }
`;
