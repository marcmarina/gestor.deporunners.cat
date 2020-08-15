import React from 'react';
import useAuth from '../auth/useAuth';

export default function HomeScreen() {
  const { user } = useAuth();
  return <h1>Hello - {user && user.name}</h1>;
}
