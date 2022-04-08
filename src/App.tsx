import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { StylesProvider } from '@material-ui/core';

import LoginScreen from 'components/LoginScreen';
import HomeScreen from 'components/HomeScreen';
import PrivacyScreen from 'components/PrivacyScreen';
import ProtectedRoute from 'components/common/ProtectedRoute';
import { AuthContextProvider } from 'auth';

import './App.css';
import SignupScreen from 'components/SignupScreen';
import StripeProvider from 'stripe/StripeProvider';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <StylesProvider injectFirst>
        <AuthContextProvider>
          <StripeProvider>
            <Switch>
              <Route path="/login" component={LoginScreen} />
              <Route path="/inscripcio" component={SignupScreen} />
              <Route path="/privacy" component={PrivacyScreen} />
              <ProtectedRoute path="/" component={HomeScreen} />
            </Switch>
          </StripeProvider>
        </AuthContextProvider>
      </StylesProvider>
    </QueryClientProvider>
  );
}

export default App;
