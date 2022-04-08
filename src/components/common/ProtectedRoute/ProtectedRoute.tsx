import React from 'react';
import { Redirect, Route, RouteProps, useLocation } from 'react-router-dom';

import { useAuthContext } from 'auth';

export default function ProtectedRoute({
  component: Component,
  path,
  ...rest
}: RouteProps) {
  const { user } = useAuthContext();
  const { pathname } = useLocation();

  const hasNextPage = pathname !== '/';

  if (!user)
    return (
      <Redirect to={`/login${hasNextPage ? `?nextPage=${pathname}` : ''}`} />
    );

  return <Route {...rest} path={path} component={Component} />;
}
