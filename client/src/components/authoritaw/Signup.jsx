import React, { useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { signup, setError } from '../../redux/actions/authActions';
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
    if (password !== confirmation)
      return props.setError('Passwords do not match.', true);

    props.signup({ email, password, username });
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

      <button onClick={props.toggleForms}>login</button>

      <Error>{props.error}</Error>
    </Form>
  )

}

function mapStateToProps(state) {
  return {
    error: state.auth.signupError
  }
}

export default connect(mapStateToProps, { signup, setError })(Signup);

export const Form = styled.form`
  margin: auto;
  width: 240px;

  > h3 {
    font-size: 1.8rem;
    margin-bottom: 12px;
    color: ${props => props.theme.nPurple};
  }

  > input {
    width: 100%;
    margin-bottom: 12px;
  }

  > button {
    margin: 12px auto;
    display: block;
  }

  > .toggle-button {
    border: none;
    background: none;
    outline: transparent;
    color: ${props => props.theme.nBlue};
  }
`;

export const Error = styled.div`
  color: crimson;
  font-size: 12px;
  text-align: center;
`;
