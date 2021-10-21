import React from 'react';
import { withAuthenticationRequired } from '@auth0/auth0-react';
import { Route, RouteProps } from 'react-router-dom';
import { ComponentType } from 'react-router/node_modules/@types/react';
import { RouteComponentProps, StaticContext } from 'react-router';

export default function ProtectedRoute({ component, ...rest }: RouteProps) {
  return (
    <Route
      component={withAuthenticationRequired(
        component as ComponentType<
          RouteComponentProps<any, StaticContext, unknown>
        >,
        {
          onRedirecting: () => <div>Loading</div>,
        }
      )}
      {...rest}
    />
  );
}
