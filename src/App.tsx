import React, { useEffect, useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import LoginScreen from './components/LoginScreen';
import HomeScreen from './components/HomeScreen';
import './App.css';
import AuthContext from './auth/context';
import { getUser } from './auth/storage';

function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    const storedUser = getUser();
    if (storedUser) setUser(storedUser);
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Switch>
        <Route path="/login" component={LoginScreen} />
        {/* <Redirect from="/" to="/login" /> */}
        <Route path="/" component={HomeScreen} />
      </Switch>
    </AuthContext.Provider>
  );
}

export default App;
