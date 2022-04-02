import React from 'react';
import { Redirect, Route, RouteProps, useLocation } from 'react-router-dom';

import { useAuthContext } from 'auth/AuthContext';

export default function ProtectedRoute({
  component: Component,
  path,
  ...rest
}: RouteProps) {
  const { user } = useAuthContext();
  const { pathname } = useLocation();

  if (!user) return <Redirect to={`/login?nextPage=${pathname}`} />;

  return <Route {...rest} path={path} component={Component} />;
}
