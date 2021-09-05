import { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { logout } from '../../redux/actions/authActions';

const Nav = props => {
  const history = useHistory();
  const [categoryId, setCategoryId] = useState('');

  const { setBioEditable } = props;

  function handleSelectChange({ target }) {
    const { name, value } = target;
    console.log('name:::', name);
    console.log('value:::', value);
    setCategoryId(value);
    // logic to retrieve filtered posts goes here
  }

  function goTo(route, state) {
    history.push(route, state)
  }

  function openSearch() {
    console.log('opening search');
    console.log('props.authenticated:::', props.authenticated);
  }

  return (
    <Wrapper>
      <button>Home</button>
      <select name="category" onChange={handleSelectChange} value={categoryId}>
        <option value="None">Filter by Category</option>
        {props.categories.map((c, i) => {
          if (c.name !== 'None')
            return <option key={`cat-${i}`} value={c.id}>{c.name}</option>
        })}
      </select>
      <button onClick={openSearch}>Search</button>
      {props.admin && <button onClick={() => goTo('/editor')}>New</button>}
      {props.admin && <button onClick={() => setBioEditable(true)}>Edit</button>}
      {props.authenticated
        ? <button onClick={props.logout}>Logout</button>
        : <button onClick={() => goTo('/login')}>Login</button>
      }
    </Wrapper>
  );
};

function mapPropsToState(state) {
  return {
    admin: state.user.acl === "admin",
    authenticated: state.auth.authenticated,
    categories: state.categories
  }
}

const mapDispatchToState = {
  logout,
};

export default connect(mapPropsToState, mapDispatchToState)(Nav);

const Wrapper = styled.nav`
  max-width: 420px;
  margin: 30px auto;
  padding: 16px 32px;
  display: flex;
  justify-content: center;
  background-color: #ffffff22;
  border-radius: 12px;
`;

