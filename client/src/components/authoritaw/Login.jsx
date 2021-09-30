import React, { useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { login, reactivate, clearError } from '../../redux/actions/authActions';
import { Error, Form } from './Signup';

import { Input, MainButton, PurpleGreenButton } from '../../styles/components';

const Login = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleInputChange(e) {
    const { name, value } = e.target;
    if (name === 'email') return setEmail(value);
    setPassword(value);
  }

  async function enterSandman(e) {
    e.preventDefault();
    await props.login({ email, password });
    setTimeout(() => props.clearError(), 2000);
  }

  function submitReactivate(e) {
    e.preventDefault();
    props.reactivate(email);
  }

  return (
    <Form login>
      <h3>Login</h3>
      <Input
        type="text"
        name="email"
        value={email}
        onChange={handleInputChange}
        placeholder="Enter your email"
      />
      <Input
        type="password"
        name="password"
        value={password}
        onChange={handleInputChange}
        placeholder="Enter your password"
      />
      <MainButton
        color="nBlue"
        disabled={!email || !password}
        onClick={enterSandman}
      >
        Abandon all hope...
      </MainButton>

      <button className="toggle-button" onClick={props.toggleForms}>register</button>
      <Error>{props.error}</Error>

      {props.error && props.error.includes('Would you like to reactivate it') && (
        <PurpleGreenButton text onClick={submitReactivate}>
          Yes, please reactivate my account
        </PurpleGreenButton>
      )}
    </Form>
  );
}

function mapStateToProps(state) {
  return {
    error: state.auth.loginError
  }
}

export default connect(mapStateToProps, { login, reactivate, clearError })(Login);
