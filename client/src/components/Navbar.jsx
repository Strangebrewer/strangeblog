import { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { PurpleGreenButton } from '../styles/components';
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
        <PurpleGreenButton text onClick={() => goTo('/')}>
          <i className="fas fa-home" />
        </PurpleGreenButton>

        <PurpleGreenButton
          title="news sources"
          width="50"
          height="26"
          onClick={() => goTo('/sources')}
          disabled={location.includes('sources')}
        >
          <i className="fas fa-info" />
        </PurpleGreenButton>

        {props.admin && (
          <>
            <PurpleGreenButton
              title="new post"
              width="50"
              height="26"
              onClick={() => goTo('/editor')}
              disabled={location.includes('editor')}
            >
              <i className="fas fa-plus" />
            </PurpleGreenButton>

            <PurpleGreenButton
              title="admin"
              width="50"
              height="26"
              onClick={() => goTo('/admin')}
              disabled={location.includes('admin')}
            >
              <i className="fas fa-cog" />
            </PurpleGreenButton>
          </>
        )}

        {props.authenticated
          ? (
            <PurpleGreenButton width="50" height="26" onClick={props.logout} title="logout">
              <i className="fas fa-sign-out-alt" />
            </PurpleGreenButton>
          ) : (
            <PurpleGreenButton width="50" height="26" onClick={() => goTo('/login')} title="login">
              <i className="fas fa-sign-in-alt" />
            </PurpleGreenButton>
          )}
      </nav>
    </Wrapper>
  )
}

function mapStateToProps(state) {
  return {
    admin: state.user.acl && state.user.acl.includes('admin'),
    authenticated: state.auth.authenticated
  }
}

export default connect(mapStateToProps, { logout })(Navbar);

const Wrapper = styled.header`
  margin-bottom: 16px;

  > nav {
    display: flex;
    justify-content: center;
    margin: 0 auto;
    padding: 16px 0;

    > button {
      margin: 4px 10px;
      min-width: 100px;
      justify-content: center;
    }
  }
`;