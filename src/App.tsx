import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import LoginScreen from './components/LoginScreen';
import './App.css';

function App() {
  return (
    <>
      <Switch>
        <Route path="/login" component={LoginScreen} />
        <Redirect from="/" to="/login" />
      </Switch>
    </>
  );
}

export default App;
