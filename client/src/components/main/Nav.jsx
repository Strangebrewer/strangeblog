import { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { logout } from '../../redux/actions/authActions';

const Nav = props => {
  const history = useHistory();
  const [categoryId, setCategoryId] = useState('');
  const [searchHeight, setSearchHeight] = useState('56px');
  const [searchWidth, setSearchWidth] = useState('360px');
  const [transition, setTransition] = useState('max-width .2s ease-in-out, height .3s ease-in-out .06s')

  function handleSelectChange({ target }) {
    const { name, value } = target;
    console.log('name:::', name);
    console.log('value:::', value);
    setCategoryId(value);
    // logic to retrieve filtered posts goes here
  }

  function goTo(route, state) {
    history.push(route, state);
  }

  function openSearch() {
    if (searchHeight === "150px") {
      setTransition('max-width .2s ease-in-out .14s, height .3s ease-in-out');
      setSearchHeight("56px");
      setSearchWidth("360px");
    } else {
      setTransition('max-width .2s ease-in-out, height .3s ease-in-out .06s')
      setSearchHeight("150px");
      setSearchWidth("500px");
    }
  }

  return (
    <Wrapper height={searchHeight} width={searchWidth} transition={transition}>
      {/* <button>Home</button> */}
      <select name="category" onChange={handleSelectChange} value={categoryId}>
        <option value="None">Filter by Category</option>
        {props.categories.map((c, i) => {
          if (c.name !== 'None')
            return <option key={`cat-${i}`} value={c.id}>{c.name}</option>
        })}
      </select>
      <button onClick={openSearch}>Search</button>
      {props.admin && <button onClick={() => goTo('/editor')}>New</button>}
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
  max-width:  ${props => props.width};
  margin: 30px auto 0 auto;
  padding: 16px 32px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background-color: #ffffff22;
  border-radius: 12px;
  height: ${props => props.height};
  transition: ${props => props.transition};

  > button, > select {
    height: 24px;
  }
`;

