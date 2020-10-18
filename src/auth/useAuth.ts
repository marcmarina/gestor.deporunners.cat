import { useContext } from 'react';
import http from 'services/http';

import AuthContext from './context';
import {
  removeRefreshToken,
  removeToken,
  storeRefreshToken,
  storeToken,
} from './storage';

export default function useAuth() {
  const { user, setUser } = useContext(AuthContext);

  const login = async (authToken: any, refreshToken: any) => {
    storeToken(authToken);
    storeRefreshToken(refreshToken);
    try {
      const { data } = await http.get('/user/self');
      if (setUser) setUser(data);
    } catch (ex) {
      console.log(ex);
    }
  };

  const logout = () => {
    removeToken();
    removeRefreshToken();
    if (setUser) setUser(undefined);
  };

  return { user, setUser, login, logout };
}
