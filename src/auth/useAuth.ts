import { useContext } from 'react';
import jwtDecode from 'jwt-decode';

import AuthContext from './context';
import {
  removeRefreshToken,
  removeToken,
  storeRefreshToken,
  storeToken,
} from './storage';
import User from '../interfaces/User';

export default function useAuth() {
  const { user, setUser } = useContext(AuthContext);

  const login = (authToken: any, refreshToken: any) => {
    const storedUser: User = jwtDecode(authToken);
    if (storedUser) {
      if (setUser) setUser(storedUser);
      storeToken(authToken);
      storeRefreshToken(refreshToken);
    }
  };

  const logout = () => {
    removeToken();
    removeRefreshToken();
    if (setUser) setUser(undefined);
  };

  return { user, setUser, login, logout };
}
