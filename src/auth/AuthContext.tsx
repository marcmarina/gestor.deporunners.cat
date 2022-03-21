import React, { useContext, createContext, useEffect, useState } from 'react';

import User from 'interfaces/User';
import {
  getRefreshToken,
  getToken,
  removeRefreshToken,
  removeToken,
  storeRefreshToken,
  storeToken,
} from './storage';
import { http } from 'services';

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

const AuthContext = createContext<Partial<UserContext>>({});

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    restoreUser();
  }, []);

  const restoreUser = async () => {
    try {
      if (getToken() && getRefreshToken()) {
        const { data } = await http.get('/user/self');
        setUser(data);
      }
    } catch (ex) {
      console.log(ex);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return null;

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
