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
  const [transition, setTransition] = useState('max-width .2s ease-in-out, height .3s ease-in-out .06s');
  const [opacity, setOpacity] = useState('0');
  const [opacityTransition, setOpacityTransition] = useState('.2s ease-in-out .25s');
  const [visibility, setVisiblity] = useState('hidden');
  const [shadow, setShadow] = useState(null);

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
    if (searchHeight === "300px") {
      setTransition('max-width .2s ease-in-out .14s, height .3s ease-in-out, box-shadow .2s ease-in-out .15s');
      setSearchHeight("56px");
      setSearchWidth("360px");
      setOpacity('0');
      setVisiblity('hidden');
      setOpacityTransition('.15s ease-in-out');
      setShadow(null);
    } else {
      setTransition('max-width .2s ease-in-out, height .3s ease-in-out .06s, box-shadow .2s ease-in-out .05s')
      setSearchHeight("300px");
      setSearchWidth("500px");
      setOpacity('1');
      setVisiblity('visible');
      setOpacityTransition('.2s ease-in-out .25s');
      setShadow(true);
    }
  }

  function search() {
    // This component is connected to the store, so it can do the search from here
    // The search criteria can be passed up to the parent component for display
  }

  function clearSearch() {
    // return all search fields to blank;
  }

  function cancelSearch() {
    openSearch();
    clearSearch();
  }

  return (
    <Wrapper height={searchHeight} width={searchWidth} transition={transition} shadow={shadow}>
      {/* <button>Home</button> */}
      <div className="nav-buttons">
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
      </div>

      <SearchWrapper
        opacity={opacity}
        visibility={visibility}
        transition={opacityTransition}
      >
        <div className="title-search">
          <label>by Title:</label>
          <input type="text" />
        </div>

        <div className="date-search">
          <label>by Date:</label>

          <div className="date-inputs">
            <div className="start-date">
              <label>start:</label>
              <input type="date" />
            </div>

            <div className="end-date">
              <label>end:</label>
              <input type="date" />
            </div>
          </div>
        </div>

        <p>leave the end date blank to search from the start date until the present moment</p>
        <p>leave the start date blank to search for everything prior to the end date</p>

        <div className="search-buttons">
          <button onClick={search}>Search</button>
          <button onClick={clearSearch}>Clear</button>
          <button onClick={cancelSearch}>Cancel</button>
        </div>
      </SearchWrapper>
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
  background-color: #ffffff22;
  border-radius: 12px;
  ${props => props.shadow && 'box-shadow: 0 0 5px white'};
  height: ${props => props.height};
  margin: 30px auto 0 auto;
  max-width:  ${props => props.width};
  padding: 16px 0;
  transition: ${props => props.transition};

  .nav-buttons {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;
    margin-bottom: 16px;

    > button, > select {
      height: 24px;
    }
  }
`;

const SearchWrapper = styled.div`
  visibility: ${props => props.visiblity};
  opacity: ${props => props.opacity};
  transition: opacity ${props => props.transition};
  padding: 12px 40px;

  .title-search {
    margin-bottom: 12px;

    > label {
      width: 100%;
      display: block;
      margin-bottom: 4px;
    }

    > input {
      display: block;
      width: 100%;
    }
  }

  .date-search {
    .date-inputs {
      margin-top: 4px;
      display: flex;
      justify-content: space-between;
      padding: 0 12px;

      .start-date {
        width: 48%;

        > label, > input {
          width: 100%;
          display: block;
          margin-bottom: 4px;
        }
      }

      .end-date {
        width: 48%;
        
        > label, > input {
          width: 100%;
          display: block;
          margin-bottom: 4px;
        }
      }
    }
  }

  > p {
    font-size: .7rem;
    margin: 4px auto;
    padding: 0 12px;
  }

  .search-buttons {
    display: flex;
    width: 280px;
    justify-content: space-between;
    margin: 30px auto 0 auto;

    > button {
      background: #111;
      border: 1px solid ${props => props.theme.nGreen};
      border-radius: 5px;
      box-shadow: 4px 4px 4px ${props => props.theme.nGreen}77;
      color: ${props => props.theme.nGreen};
      cursor: pointer;
      font-weight: bold;
      margin-right: 16px;
      outline: transparent;
      padding: 6px 12px;
      min-width: 80px;
    }

    > button:nth-child(2) {
      border: 1px solid ${props => props.theme.nBlue};
      box-shadow: 4px 4px 4px ${props => props.theme.nBlue}77;
      color: ${props => props.theme.nBlue};
    }

    > button:last-of-type {
      border: 1px solid ${props => props.theme.nRed};
      box-shadow: 4px 4px 4px ${props => props.theme.nRed}77;
      color: ${props => props.theme.nRed};
      margin-right: 0;
    }
  }
`;