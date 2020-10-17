import axios from 'axios';

import { getRefreshToken, getToken, storeToken } from 'auth/storage';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'x-api-token': process.env.REACT_APP_API_TOKEN,
    'x-refresh-token': `${getRefreshToken()}`,
    'x-auth-token': `${getToken()}`,
  },
});

instance.interceptors.response.use(async config => {
  const returnedToken = config.headers['x-auth-token'];
  if (returnedToken && returnedToken !== getToken()) {
    storeToken(returnedToken);
  }
  return config;
});

export default {
  get: instance.get,
  post: instance.post,
  put: instance.put,
  delete: instance.delete,
  patch: instance.patch,
};
