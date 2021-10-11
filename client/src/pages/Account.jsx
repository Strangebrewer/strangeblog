import { useState } from "react";
import { connect } from 'react-redux';
import styled from 'styled-components';
import Navbar from "../components/Navbar";
import { Input, Label, MainButton } from '../styles/components';

import { update, setError, clearError } from '../redux/actions/authActions';

const Account = props => {
  const [email, setEmail] = useState(props.user.email);
  const [username, setUsername] = useState(props.user.username);
  const [password, setPassword] = useState('');
  const [confirmPw, setConfirmPw] = useState('');

  function handleInputChange({ target }) {
    const { name, value } = target;
    if (name === 'email') setEmail(value);
    if (name === 'username') setUsername(value);
    if (name === 'password') setPassword(value);
    if (name === 'confirmPw') setConfirmPw(value);
  }

  async function submit(e) {
    e.preventDefault();
    const isValid = validate();
    if (isValid) {
      const changes = { id: props.user.id };
      if (email !== props.user.email) changes.email = email;
      if (username !== props.user.username) changes.username = username;
      if (password && password === confirmPw) changes.password = password;
      const response = await props.update(changes);
      if (response) {
        props.setError('Updated Successfully', 'update');
      }
      setTimeout(() => props.clearError(), 5000);
    }
  }

  function validate() {
    const { user } = props;
    let valid = true;

    if (email === user.email && username === user.username && !password) {
      props.setError('You have to change something first...', 'update');
      setTimeout(() => props.clearError(), 5000);
      valid = false;
    }
    if (password && password !== confirmPw) {
      props.setError('Password and confirmation do not match', 'update');
      setTimeout(() => props.clearError(), 5000);
      valid = false;
    }

    return valid;
  }

  return (
    <Wrapper>
      <Navbar />

      <form>
        <h3>Update Your Info</h3>
        <div>
          <Label>Email</Label>
          <Input
            type="text"
            name="email"
            value={email}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <Label>Username</Label>
          <Input
            type="text"
            name="username"
            value={username}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <Label>Password</Label>
          <Input
            type="password"
            name="password"
            value={password}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <Label>Confirm Password</Label>
          <Input
            type="password"
            name="confirmPw"
            value={confirmPw}
            onChange={handleInputChange}
          />
        </div>

        <MainButton color="nGreen" onClick={submit}>Submit</MainButton>

        <Error green={props.error && props.error.toLowerCase().includes('success')}>{props.error}</Error>
      </form>
    </Wrapper>
  );
};

function mapPropsToState(state) {
  return {
    admin: state.user.acl && state.user.acl.includes('admin'),
    blog: state.blog,
    sources: state.sources,
    user: state.user,
    error: state.auth.updateError
  }
}

const mapDispatchToState = {
  update,
  setError,
  clearError
};

export default connect(mapPropsToState, mapDispatchToState)(Account);

const Wrapper = styled.div`
  min-height: 100vh;

  > form {
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 48px auto 0 auto;
    padding-bottom: 24px;
    position: relative;
    width: 220px;

    > div {
      margin: 8px 0;
      width: 100%;

      > input, > label {
        width: 100%;
      }    
    }

    > h3 {
      font-size: 1.8rem;
      font-weight: 500;
      margin-bottom: 12px;
      text-align: center;
      width: 100%;
    }

    > button {
      margin: 8px 0 24px 0;
    }
  }
`;

export const Error = styled.div`
  color: ${props => props.green ? 'green' : 'crimson'};
  font-size: 12px;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
`;
