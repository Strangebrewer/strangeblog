import React, { useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { signup, setError } from '../../redux/actions/authActions';

const Signup = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');

  const handleInputChange = e => {
    const { name, value } = e.target;
    switch (name) {
      case 'email': return setEmail(value);
      case 'password': return setPassword(value);
      default: setConfirmation(value);
    }
  }

  const enterSandman = async e => {
    e.preventDefault();
    if (password !== confirmation)
      return props.setError('Passwords do not match.', true);

    props.signup({ email, password });
  }

  return (
    <Form>
      <h3>Sign Up</h3>
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

      <input
        type="password"
        name="confirmation"
        value={confirmation}
        onChange={handleInputChange}
        placeholder="Confirm your password"
      />

      <button
        disabled={!email || !password || !confirmation}
        onClick={enterSandman}
      >
        Abandon all hope...
      </button>

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
  border-right: ${props => props.login ? `2px solid ${props.theme.nPurple}` : 'none'};
  height: 340px;
  margin: auto 0;
  padding: 20px 60px;
  position: relative;
  text-align: left;
  transition: transform .3s, opacity .35s;
  width: 360px;

  > h3 {
    color: ${props => props.theme.nBlue};
    font-size: 36px;
    margin-bottom: 10px;
  }
  
  > input {
    background-color: ${props => props.theme.nBlue}25;
    border: 2px solid ${props => props.theme.nPurple};
    border-radius: 5px;
    box-shadow: inset 3px 3px 3px #666, inset -2px -2px 2px #fff;
    margin: 10px 0;
    outline: transparent;
    padding: 8px 14px;
    width: 100%;
  }

  > button {
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
    width: 200px;
  }
`;

export const Error = styled.div`
  color: crimson;
  font-size: 12px;
  text-align: center;
`;
