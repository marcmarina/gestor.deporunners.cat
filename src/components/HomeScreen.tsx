import React from 'react';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import useAuth from '../auth/useAuth';

export default function HomeScreen() {
  const history = useHistory();
  const { user, logout } = useAuth();
  return (
    <div
      style={{
        padding: 10,
      }}
    >
      <h1>Hello - {user && user.name}</h1>
      <Button
        color="primary"
        variant="contained"
        onClick={() => {
          logout();
          history.push('/login');
        }}
      >
        Log out
      </Button>
    </div>
  );
}
