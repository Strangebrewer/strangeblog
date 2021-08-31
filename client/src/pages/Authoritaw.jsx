import React from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';

import Login from '../components/Login';
import Signup from '../components/Signup';

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
    display: flex;
    justify-content: center;
    min-height: 100vh;
    min-width: 100%;
    position: relative;

    button {
        background-color: ${props => props.theme.nBlue};
        border: 2px solid ${props => props.theme.nPurple};
        border-radius: 5px;
        box-shadow: inset 1px 1px 5px white, inset -1px -1px 5px white;
        color: white;
        cursor: pointer;
        font-size: 18px;
        height: 40px;
        margin: auto;
        outline: none;
        padding: 6px 20px;
        position: absolute;
        bottom: 35px;
        left: 0;
        right: 0;
    }

    p {
        position: absolute;
        bottom: 50px;
        text-align: center;
        a {
            color: ${props => props.theme.nBlue};
        }
    }
`;
