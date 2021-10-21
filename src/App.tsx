import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { StylesProvider } from '@material-ui/core';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import LoginScreen from 'components/LoginScreen';
import HomeScreen from 'components/HomeScreen';
import PrivacyScreen from 'components/PrivacyScreen';
import ProtectedRoute from 'components/common/ProtectedRoute';

import './App.css';
import SignupScreen from 'components/SignupScreen';
import { useAuth0 } from '@auth0/auth0-react';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUB_KEY || '');

function App() {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return null;
  }

  return (
    <StylesProvider injectFirst>
      <Elements stripe={stripePromise}>
        <Switch>
          <Route path="/login" component={LoginScreen} />
          <Route path="/inscripcio" component={SignupScreen} />
          <Route path="/privacy" component={PrivacyScreen} />
          <ProtectedRoute path="/" component={HomeScreen} />
        </Switch>
      </Elements>
    </StylesProvider>
  );
}

export default App;
