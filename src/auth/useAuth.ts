import { useContext } from 'react';
import jwtDecode from 'jwt-decode';

import AuthContext from './context';
import { removeToken, storeToken } from './storage';

export default function useAuth() {
  const { user, setUser } = useContext(AuthContext);

  const login = (authToken: any) => {
    const storedUser = jwtDecode(authToken);
    setUser(storedUser);
    storeToken(authToken);
  };

  const logout = () => {
    removeToken();
    setUser(null);
  };

  return { user, setUser, login, logout };
}
