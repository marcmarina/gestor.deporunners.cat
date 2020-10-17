import jwtDecode from 'jwt-decode';

const jwtKey = 'jwt-token';
const refreshKey = 'refresh-token';

export const storeToken = (jwtToken: string) => {
  localStorage.setItem(jwtKey, jwtToken);
};

export const getToken = () => localStorage.getItem(jwtKey);

export const removeToken = () => localStorage.removeItem(jwtKey);

export const storeRefreshToken = (refreshToken: string) => {
  localStorage.setItem(refreshKey, refreshToken);
};

export const getRefreshToken = () => localStorage.getItem(refreshKey);

export const getUser = (): any => {
  const token = getToken();
  return token ? jwtDecode(token) : null;
};
export const removeRefreshToken = () => localStorage.removeItem(refreshKey);
