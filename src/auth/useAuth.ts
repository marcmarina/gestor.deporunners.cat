import { useContext } from 'react';
import jwtDecode from 'jwt-decode';

import AuthContext from './context';
import { removeToken, storeToken } from './storage';
import User from '../interfaces/User';

export default function useAuth() {
  const { user, setUser } = useContext(AuthContext);

  const login = (authToken: any) => {
    const storedUser: User = jwtDecode(authToken);
    if (storedUser) {
      if (setUser) setUser(storedUser);
      storeToken(authToken);
    }
  };

  const logout = () => {
    removeToken();
    if (setUser) setUser(undefined);
  };

  return { user, setUser, login, logout };
}
