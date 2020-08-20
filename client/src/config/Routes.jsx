import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from '../containers/home/Home';
import ProtectedRoute from '../components/routes/ProtectedRoute';
import Dashboard from '../containers/dashboard/Dashboard';
import { useAuthState } from '../contexts/AuthContext';
import SignIn from '../containers/auth/signIn/SignIn';
import SignUp from '../containers/auth/signUp/SignUp';

const Routes = () => {
  const { isLoggedIn } = useAuthState();
  return (
    <Switch>
      <Route exact path='/'>
        {isLoggedIn ? (
          <Redirect to={'/dashboard'} />
        ) : (
          <Redirect to={'/signIn'} />
        )}
      </Route>
      <Route path={'/signIn'}>
        {isLoggedIn ? <Redirect to={'/dashboard'} /> : <SignIn />}
      </Route>
      <Route path={'/signUp'}>
        {isLoggedIn ? <Redirect to={'/dashboard'} /> : <SignUp />}
      </Route>
      <ProtectedRoute path='/dashboard'>
        <Dashboard />
      </ProtectedRoute>
    </Switch>
  );
};

export default Routes;
