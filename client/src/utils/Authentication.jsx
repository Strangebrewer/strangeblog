import React, { useState, useEffect } from 'react';
import { Redirect } from "react-router-dom";

const WuhTuhFuh = (WrappedComponent, passedProps = {}) => {
  function Authentication(props) {
    const [redirect, setRedirect] = useState(false);
    const [destination, setDestination] = useState('');

    useEffect(() => {
      function checkAuthenticated() {
        const { adminRequired, admin, required, authenticated } = passedProps;

        if (adminRequired && !admin) {
          setRedirect(true);
          setDestination('/');
        }

        if (required && !authenticated) {
          setRedirect(true);
          setDestination('/login');
        }

        if (!required && authenticated) {
          setRedirect(true);
          setDestination('/');
        }
      }

      checkAuthenticated();
    }, []);

    if (redirect)
      return <Redirect to={destination} />

    return <WrappedComponent {...props} {...passedProps} />
  }

  return Authentication;
}

export default WuhTuhFuh;