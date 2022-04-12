const jwtKey = 'jwt-token';
const refreshKey = 'refresh-token';

export const storeJWT = (jwtToken: string) => {
  localStorage.setItem(jwtKey, jwtToken);
};

export const getJWT = () => localStorage.getItem(jwtKey);

export const removeJWT = () => localStorage.removeItem(jwtKey);

export const storeRefreshToken = (refreshToken: string) => {
  localStorage.setItem(refreshKey, refreshToken);
};

export const getRefreshToken = () => localStorage.getItem(refreshKey);

export const removeRefreshToken = () => localStorage.removeItem(refreshKey);
