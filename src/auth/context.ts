import React from 'react';
import User from '../interfaces/User';

interface UserContext {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
}

const AuthContext = React.createContext<Partial<UserContext>>({});

export default AuthContext;
