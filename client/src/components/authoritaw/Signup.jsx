import React, { useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { signup, setError, clearError } from '../../redux/actions/authActions';
import { Input, MainButton } from '../../styles/components';

const Signup = props => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');

  const handleInputChange = e => {
    const { name, value } = e.target;
    switch (name) {
      case 'email': return setEmail(value);
      case 'username': return setUsername(value);
      case 'password': return setPassword(value);
      default: setConfirmation(value);
    }
  }

  const enterSandman = async e => {
    e.preventDefault();
    if (password !== confirmation) {
      props.setError('Passwords do not match.', 'signup');
      setTimeout(() => props.clearError(), 5000);
      return;
    }

    await props.signup({ email, password, username });
    setTimeout(() => props.clearError(), 5000);
  }

  return (
    <Form>
      <h3>Sign Up</h3>
      <Input
        type="text"
        name="email"
        value={email}
        onChange={handleInputChange}
        placeholder="Enter your email"
      />
      <Input
        type="text"
        name="username"
        value={username}
        onChange={handleInputChange}
        placeholder="Enter your username"
      />

      <Input
        type="password"
        name="password"
        value={password}
        onChange={handleInputChange}
        placeholder="Enter your password"
      />

      <Input
        type="password"
        name="confirmation"
        value={confirmation}
        onChange={handleInputChange}
        placeholder="Confirm your password"
      />

      <MainButton
        color="nBlue"
        disabled={!email || !username || !password || !confirmation}
        onClick={enterSandman}
      >
        Abandon all hope...
      </MainButton>

      <button className="toggle-button" onClick={props.toggleForms}>login</button>

      <Error>{props.error}</Error>
    </Form>
  )

}

function mapStateToProps(state) {
  return {
    error: state.auth.signupError
  }
}

export default connect(mapStateToProps, { signup, setError, clearError })(Signup);

export const Form = styled.form`
  margin: auto;
  padding-bottom: 24px;
  position: relative;
  width: 240px;

  > h3 {
    color: ${props => props.theme.nPurple};
    font-size: 1.8rem;
    margin-bottom: 12px;
  }

  > input {
    margin-bottom: 12px;
    width: 100%;
  }

  > button {
    display: block;
    margin: 12px auto;
  }

  > .toggle-button {
    background: none;
    border: none;
    color: ${props => props.theme.nBlue};
    cursor: pointer;
    outline: transparent;
  }
`;

export const Error = styled.div`
  color: crimson;
  font-size: 12px;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
`;
