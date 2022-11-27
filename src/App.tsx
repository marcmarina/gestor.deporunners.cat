import { StylesProvider } from '@material-ui/core';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Route, Switch } from 'react-router-dom';
import { StripeProvider } from 'stripe';

import { AuthContextProvider } from 'auth';
import ProtectedRoute from 'components/common/ProtectedRoute';
import HomeScreen from 'components/HomeScreen';
import LoginScreen from 'components/LoginScreen';
import PrivacyScreen from 'components/PrivacyScreen';

import SignupScreen from 'components/SignupScreen';

import './App.css';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
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
