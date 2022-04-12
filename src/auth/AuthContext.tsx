import React, { useContext, createContext } from 'react';

import User from 'interfaces/User';
import {
  getRefreshToken,
  getJWT,
  removeRefreshToken,
  removeJWT,
  storeRefreshToken,
  storeJWT,
} from './storage';
import { http } from 'services';
import { useQuery, useQueryClient } from 'react-query';
import axios from 'axios';

interface UserContext {
  user: User;
}

export function useAuthContext() {
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const login = ({ authToken, refreshToken }) => {
    storeJWT(authToken);
    storeRefreshToken(refreshToken);
    queryClient.invalidateQueries('authentication');
  };

  const logout = () => {
    removeJWT();
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
AuthContext.displayName = 'AuthContext';

export const AuthContextProvider = ({ children }) => {
  const queryClient = useQueryClient();

  const { data: user, isLoading } = useQuery(
    'authentication',
    async () => {
      if (getJWT() && getRefreshToken()) {
        const { data } = await http.get('/user/self');

        return data;
      } else {
        return undefined;
      }
    },
    {
      retry: (failureCount, error) => {
        if (failureCount > 3) return false;

        if (axios.isAxiosError(error) && error?.response?.status === 401) {
          removeJWT();
          removeRefreshToken();
          queryClient.invalidateQueries('authentication');
        }

        return true;
      },
    }
  );

  if (isLoading) return null;

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};
