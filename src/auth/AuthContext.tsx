import React, { useContext, createContext } from 'react';

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
import { useQuery, useQueryClient } from 'react-query';

interface UserContext {
  user: User;
}

export function useAuthContext() {
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const login = ({ authToken, refreshToken }) => {
    storeToken(authToken);
    storeRefreshToken(refreshToken);
    queryClient.invalidateQueries('authentication');
  };

  const logout = () => {
    removeToken();
    removeRefreshToken();
    queryClient.invalidateQueries('authentication');
  };

  return {
    user,
    login,
    logout,
  };
}

const AuthContext = createContext<Partial<UserContext>>({});

export const AuthContextProvider = ({ children }) => {
  const { data: user, isLoading } = useQuery('authentication', async () => {
    if (getToken() && getRefreshToken()) {
      const { data } = await http.get('/user/self');

      return data;
    } else {
      return undefined;
    }
  });

  if (isLoading) return null;

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};
