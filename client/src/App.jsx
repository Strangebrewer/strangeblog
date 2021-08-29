import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from 'react-redux';

import Main from './pages/Main';

import { Spinner } from './styles/Elements';

import { setAuthToken, resetAuthToken } from './utils/token';

function App(props) {
  const [loading, setLoading] = useState(true);

  return (
    loading
      ? (
        <div style={{ height: '100vh', background: 'linear-gradient(black, 88%, blue)' }} >
          <Spinner size="120" border="10" />
        </div >
      ) : (
        <Router>
          <Switch>
            <Route
              exact
              path="/"
              component={Main}
            />
          </Switch>
        </Router>
      )
  )
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
  }
}

const dispatchProps = {
  getUser: getCurrentUser
};

export default connect(mapStateToProps, dispatchProps)(App);
