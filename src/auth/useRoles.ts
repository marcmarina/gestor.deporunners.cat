import { useAuth0 } from '@auth0/auth0-react';

export default function useRoles() {
  const { user } = useAuth0();

  const roles = user?.[
    `${process.env.REACT_APP_AUTH0_AUDIENCE as string}/roles`
  ] as string[];

  const hasRole = (role: string) => roles.includes(role);

  return { roles, hasRole };
}
