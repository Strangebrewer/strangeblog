import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { RedBlueButton } from '../../styles/components';
import styled from 'styled-components';
import { logout } from '../../redux/actions/authActions';

const Nav = props => {
  const history = useHistory();
  const [searchHeight, setSearchHeight] = useState('56px');
  const [searchWidth, setSearchWidth] = useState(props.admin ? '420px' : '300px');
  const [transition, setTransition] = useState('max-width .2s ease-in-out, height .35s ease-in-out .06s');
  const [shadow, setShadow] = useState(null);
  const [showSearch, setShowSearch] = useState(false);

  function toggleSearch() {
    if (showSearch === true) {
      setTransition('max-width .2s ease-in-out .3s, height .35s ease-in-out, box-shadow .2s ease-in-out .15s');
      setSearchHeight("56px");
      setSearchWidth(props.admin ? '420px' : '300px');
      props.setSearchProps({
        opacity: '0',
        transition: '.15s ease-in-out',
        visibility: 'hidden'
      }, 'none');
      setShadow(null);
      setShowSearch(false);
    } else {
      setTransition('max-width .2s ease-in-out, height .35s ease-in-out .15s, box-shadow .2s ease-in-out .12s');
      setSearchHeight("420px");
      setSearchWidth("500px");
      props.setSearchProps({
        opacity: '1',
        transition: '.2s ease-in-out .28s',
        visibility: 'visible'
      }, 'block');
      setShadow(true);
      setShowSearch(true);
    }
  }

  function goTo(route, state) {
    history.push(route, state);
  }

  return (
    <Wrapper height={searchHeight} width={searchWidth} transition={transition} shadow={shadow}>
      <div className="nav-buttons">
        <RedBlueButton width="50" height="26" onClick={toggleSearch} title="toggle search">
          <i className="fas fa-search" />
        </RedBlueButton>

        <RedBlueButton width="50" height="26" onClick={() => goTo('/sources')} title="news sources">
          <i className="fas fa-info" />
        </RedBlueButton>
        
        {props.admin && (
          <>
            <RedBlueButton width="50" height="26" onClick={() => goTo('/editor')} title="new post">
              <i className="fas fa-plus" />
            </RedBlueButton>
            
            <RedBlueButton width="50" height="26" onClick={() => goTo('/admin')} title="admin">
              <i className="fas fa-cog" />
            </RedBlueButton>
          </>
        )}
        {props.authenticated
          ? (
            <RedBlueButton width="50" height="26" onClick={props.logout} title="logout">
              <i className="fas fa-sign-out-alt" />
            </RedBlueButton>
          ) : (
            <RedBlueButton width="50" height="26" onClick={() => goTo('/login')} title="login">
              <i className="fas fa-sign-in-alt" />
            </RedBlueButton>
          )}
      </div>

      {props.children({
        toggleSearch,
        children: props.children
      })}
    </Wrapper>
  );
};

function mapPropsToState(state) {
  return {
    admin: state.user.acl && state.user.acl.includes('admin'),
    authenticated: state.auth.authenticated
  }
}

export default connect(mapPropsToState, { logout })(Nav);

export const Wrapper = styled.nav`
  background-color: #ffffff22;
  border-radius: 12px;
  ${props => props.shadow && 'box-shadow: 0 0 4px #ffffff'};
  height: ${props => props.height};
  margin: 0 auto;
  max-width:  ${props => props.width};
  padding: 16px 0;
  transition: ${props => props.transition};
  z-index: 1;

  .nav-buttons {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;
    z-index: 1;

    > button:first-of-type {
      margin-left: 0;
    }

    > button:last-of-type {
      margin-right: 0;
    }
  }
`;
