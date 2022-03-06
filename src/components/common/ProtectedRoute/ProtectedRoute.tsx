import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

import { useAuthContext } from 'auth/AuthContext';

export default function ProtectedRoute({
  component: Component,
  path,
  ...rest
}: RouteProps) {
  const { user } = useAuthContext();
  if (!user) return <Redirect to="/login" />;
  return <Route {...rest} path={path} component={Component} />;
}
