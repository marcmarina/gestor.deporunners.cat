import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { StylesProvider } from '@material-ui/core';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import LoginScreen from 'components/LoginScreen';
import HomeScreen from 'components/HomeScreen';
import PrivacyScreen from 'components/PrivacyScreen';
import ProtectedRoute from 'components/common/ProtectedRoute';

import AuthContext from 'auth/context';

import User from 'interfaces/User';

import './App.css';
import SignupScreen from 'components/SignupScreen';
import http from 'services/http';
import { getRefreshToken, getToken } from 'auth/storage';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUB_KEY || '');

function App() {
  const [user, setUser] = useState<User>();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    restoreUser();
  }, []);

  const restoreUser = async () => {
    try {
      if (getToken() && getRefreshToken()) {
        const { data } = await http.get('/user/self');
        setUser(data);
      }
    } catch (ex) {
      console.log(ex);
    }
    setIsReady(true);
  };

  if (!isReady) return null;

  return (
    <StylesProvider injectFirst>
      <Elements stripe={stripePromise}>
        <AuthContext.Provider value={{ user, setUser }}>
          <Switch>
            <Route path="/login" component={LoginScreen} />
            <Route path="/inscripcio" component={SignupScreen} />
            <Route path="/privacy" component={PrivacyScreen} />
            <ProtectedRoute path="/" component={HomeScreen} />
          </Switch>
        </AuthContext.Provider>
      </Elements>
    </StylesProvider>
  );
}

export default App;
