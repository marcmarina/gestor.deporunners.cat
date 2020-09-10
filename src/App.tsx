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
      <AuthContext.Provider value={{ user, setUser }}>
        <Switch>
          <Route path="/login" component={LoginScreen} />
          <ProtectedRoute path="/" component={HomeScreen} />
        </Switch>
      </AuthContext.Provider>
    </StylesProvider>
  );
}

export default App;
