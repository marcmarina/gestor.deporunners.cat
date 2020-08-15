import jwtDecode from 'jwt-decode';

const key = 'jwt-token';

export const storeToken = (jwtToken: string) => {
  localStorage.setItem(key, jwtToken);
};

export const getToken = () => localStorage.getItem(key);

export const getUser = (): any => {
  const token = getToken();
  return token ? jwtDecode(token) : null;
};

export const removeToken = () => localStorage.removeItem(key);
