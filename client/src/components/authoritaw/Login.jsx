import React, { useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { login } from '../../redux/actions/authActions';
import { Error, Form } from './Signup';

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
    <Form login>
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
