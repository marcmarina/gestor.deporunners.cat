import { useContext } from 'react';
import http from 'services/http';

import React from 'react';

import User from 'interfaces/User';
import {
  removeRefreshToken,
  removeToken,
  storeRefreshToken,
  storeToken,
} from './storage';

interface UserContext {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
}

export function useAuthContext() {
  const { user, setUser } = useContext(AuthContext);

  const login = async ({ authToken, refreshToken }) => {
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

const AuthContext = React.createContext<Partial<UserContext>>({});

export default AuthContext;
