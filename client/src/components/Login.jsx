import React, { useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { login } from '../redux/actions/authActions';

const Login = props => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleInputChange = e => {
        const { name, value } = e.target;
        if (name === 'email') return setEmail(value);
        setPassword(value);
    }

    const enterSandman = async e => {
        e.preventDefault();
        props.login({ email, password });
    }

    return (
        <Form style={props.style}>
            <h3>Login</h3>
            <input
                type="text"
                name="email"
                value={email}
                onChange={handleInputChange}
                placeholder="Enter your email"
            />
            <input
                type="password"
                name="password"
                value={password}
                onChange={handleInputChange}
                placeholder="Enter your password"
            />
            <button
                disabled={!email || !password}
                onClick={enterSandman}
            >
                Abandon all hope...
            </button>
            <Error>{props.error}</Error>
        </Form>
    );
}

function mapStateToProps(state) {
    return {
        error: state.auth.loginError
    }
}

export default connect(mapStateToProps, { login })(Login);

const Form = styled.form`
    border-right: 2px solid ${props => props.theme.nPurple};
    height: 340px;
    margin: auto 0;
    padding: 20px 60px;
    position: relative;
    text-align: left;
    transition: transform .3s, opacity .35s;
    width: 360px;

    h3 {
        color: ${props => props.theme.nBlue};
        font-size: 36px;
        margin-bottom: 10px;
    }
    
    input {
        background-color: ${props => props.theme.nBlue}25;
        border: 2px solid ${props => props.theme.nPurple};
        border-radius: 5px;
        box-shadow: inset 3px 3px 3px #666, inset -2px -2px 2px #fff;
        margin: 10px 0;
        outline: transparent;
        padding: 8px 14px;
        width: 100%;
    }
`;

const Error = styled.div`
    color: crimson;
    font-size: 12px;
    text-align: center;
`;