import React, { useState, useEffect } from 'react';
import { Redirect } from "react-router-dom";

const WuhTuhFuh = (WrappedComponent, passedProps = {}) => {
    function Authentication(props) {
        const [redirect, setRedirect] = useState(false);
        const [destination, setDestination] = useState('');

        useEffect(() => {
            function checkAuthenticated() {
                const { required, authenticated } = passedProps;
    
                if (required && !authenticated) {
                    setRedirect(true);
                    setDestination('/');
                }
    
                if (!required && authenticated) {
                    setRedirect(true);
                    setDestination('/dashboard');
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