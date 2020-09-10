import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

import useAuth from '../../../auth/useAuth';

export default function ProtectedRoute({
  component: Component,
  path,
  ...rest
}: RouteProps) {
  const { user } = useAuth();
  if (!user) return <Redirect to="/login" />;
  return <Route {...rest} path={path} component={Component} />;
}
