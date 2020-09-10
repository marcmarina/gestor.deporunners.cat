import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

import useAuth from '../../../auth/useAuth';

export default function ProtectedRoute({
  path,
  component,
  ...rest
}: RouteProps) {
  const { user } = useAuth();
  if (!user) return <Redirect to="/login" />;
  return <Route path={path} component={component} />;
}
