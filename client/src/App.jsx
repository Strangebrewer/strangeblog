import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from 'react-redux';

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

  useEffect(() => {
    (async function () {
      const token = localStorage.getItem('token');
      try {
        if (token) {
          setAuthToken(token);
          await props.getUser();
        }
      } catch (e) {
        if (token) resetAuthToken();
      } finally {
        await props.getBlogData();
        setTimeout(() => setLoading(false), 1000);
      }
    })();
  }, [props.getUser]);

  return (
    loading
      ? (
        <SpinnerWrap background="linear-gradient(black, 88%, blue)">
          <Spinner size="120" border="10" />
        </SpinnerWrap>
      ) : (
        <Router>
          <Switch>
            <Route
              exact
              path="/"
              component={Main}
            />

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
              path="/:title"
              component={SinglePost}
            />
          </Switch>
        </Router>
      )
  )
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    admin: state.user.acl === 'admin',
    user: state.user
  }
}

const dispatchProps = {
  getBlogData,
  getCategories,
  getUser: getCurrentUser
};

export default connect(mapStateToProps, dispatchProps)(App);
