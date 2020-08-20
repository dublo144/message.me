import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuthState } from '../../contexts/AuthContext.jsx';

const ProtectedRoute = ({ children, ...rest }) => {
  const { isLoggedIn } = useAuthState();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isLoggedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: location }
            }}
          />
        )
      }
    />
  );
};

export default ProtectedRoute;
