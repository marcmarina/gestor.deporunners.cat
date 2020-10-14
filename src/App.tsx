import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { StylesProvider } from '@material-ui/core';

import LoginScreen from './components/LoginScreen';
import HomeScreen from './components/HomeScreen';
import ProtectedRoute from './components/common/ProtectedRoute';

import AuthContext from './auth/context';
import { getUser } from './auth/storage';

import User from './interfaces/User';

import './App.css';
import SignupScreen from 'components/SignupScreen';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUB_KEY || '');

function App() {
  const [user, setUser] = useState<User>();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    restoreToken();
  }, []);

  const restoreToken = async () => {
    const user = getUser();
    if (user) {
      setUser(user);
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
            <ProtectedRoute path="/" component={HomeScreen} />
          </Switch>
        </AuthContext.Provider>
      </Elements>
    </StylesProvider>
  );
}

export default App;
