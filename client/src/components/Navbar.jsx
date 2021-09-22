import { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { RedBlueButton } from '../styles/components';
import { logout } from '../redux/actions/authActions';

const Navbar = props => {
  const history = useHistory();
  const [location, setLocation] = useState('');

  useEffect(() => {
    setLocation(history.location.pathname);
  }, [])

  function goTo(route, state) {
    history.push(route, state)
  }

  return (
    <Wrapper>
      <nav>
        <RedBlueButton text onClick={() => goTo('/')}>
          <i className="fas fa-home" />
        </RedBlueButton>
        {props.admin && (
          <>
            <RedBlueButton
              title="new post"
              width="50"
              height="26"
              onClick={() => goTo('/editor')}
              disabled={location.includes('editor')}
            >
              <i className="fas fa-plus" />
            </RedBlueButton>

            <RedBlueButton
              title="admin"
              width="50"
              height="26"
              onClick={() => goTo('/admin')}
              disabled={location.includes('admin')}
            >
              <i className="fas fa-cog" />
            </RedBlueButton>
          </>
        )}
        <RedBlueButton
          title="news sources"
          width="50"
          height="26"
          onClick={() => goTo('/sources')}
          disabled={location.includes('sources')}
        >
          <i className="fas fa-info" />
        </RedBlueButton>
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
      </nav>
    </Wrapper>
  )
}

function mapStateToProps(state) {
  return {
    admin: state.user.acl === "admin",
    authenticated: state.auth.authenticated
  }
}

export default connect(mapStateToProps, { logout })(Navbar);

const Wrapper = styled.header`
  margin-bottom: 16px;

  > nav {
    display: flex;
    justify-content: center;
    width: 800px;
    margin: 0 auto;
    padding: 16px 0;

    > button {
      margin: 4px 10px;
      min-width: 100px;
      justify-content: center;
    }
  }
`;