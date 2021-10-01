import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from 'react-redux';
import { Themes, GlobalStyle } from "./styles";
import { ThemeProvider } from 'styled-components';

import Account from './pages/Account';
import Admin from './pages/Admin';
import Authoritaw from './pages/Authoritaw';
import Main from './pages/Main';
import PostEditor from './pages/PostEditor';
import SinglePost from './pages/SinglePost';
import Sources from './pages/Sources';

import Authentication from './utils/Authentication';
import { Spinner, SpinnerWrap } from './styles/Elements';

import { setAuthToken, resetAuthToken } from './utils/token';
import { getCurrentUser } from './redux/actions/authActions';
import { getBlogData } from './redux/actions/otherActions';
import { getCategories } from './redux/actions/categoryActions';

function App(props) {
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState(Themes.nightmode);
  const [currentTheme, setCurrentTheme] = useState('night');

  const { getBlog, getUser } = props;

  useEffect(() => {
    (async function () {
      const token = localStorage.getItem('token');
      const theme = localStorage.getItem('theme');
      try {
        if (token) {
          setAuthToken(token);
          await getUser();
        }
        if (!theme || theme === 'night') {
          setMode(Themes.nightmode);
          setCurrentTheme('night');
        } else {
          setMode(Themes.brightmode);
          setCurrentTheme('bright');
        }
      } catch (e) {
        if (token) resetAuthToken();
      } finally {
        await getBlog();
        setTimeout(() => setLoading(false), 1000);
      }
    })();
  }, [getUser, getBlog]);

  function toggleMode(theme) {
    if (theme === 'night') {
      setMode(Themes.nightmode);
    } else {
      setMode(Themes.brightmode);
    }
    setCurrentTheme(theme);
    localStorage.setItem('theme', theme)
  }

  return (
    loading
      ? (
        <ThemeProvider theme={mode}>
          <GlobalStyle />
          <SpinnerWrap background="linear-gradient(black, 88%, #e22c5a)">
            <Spinner size="120" border="10" />
          </SpinnerWrap>
        </ThemeProvider>
      ) : (
        <ThemeProvider theme={mode}>
          <GlobalStyle />
          <Router>
            <Switch>
              <Route exact path="/">
                {routeProps => (
                  <Main {...routeProps} toggleMode={toggleMode} mode={currentTheme} />
                )}
              </Route>

              <Route
                exact
                path="/login"
                component={Authentication(Authoritaw, { required: false, authenticated: props.authenticated })}
              />

              <Route
                exact
                path="/editor"
                component={Authentication(PostEditor, { adminRequired: true, admin: props.admin })}
              />

              <Route
                exact
                path="/editor/:id"
                component={Authentication(PostEditor, { adminRequired: true, admin: props.admin })}
              />

              <Route
                exact
                path="/admin"
                component={Authentication(Admin, { adminRequired: true, admin: props.admin })}
              />

              <Route
                exact
                path="/sources"
                component={Sources}
              />

              <Route
                exact
                path="/my-info"
                component={Authentication(Account, { required: true, authenticated: props.authenticated })}
              />

              <Route
                exact
                path="/:id"
                component={SinglePost}
              />
            </Switch>
          </Router>
        </ThemeProvider>
      )
  )
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    admin: state.user.acl && state.user.acl && state.user.acl.includes('admin'),
    user: state.user
  }
}

const dispatchProps = {
  getBlog: getBlogData,
  getCategories,
  getUser: getCurrentUser
};

export default connect(mapStateToProps, dispatchProps)(App);
