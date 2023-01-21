import axios from 'axios';

import { getRefreshToken, getJWT, storeJWT } from 'auth/storage';
import { config } from 'config';

const instance = axios.create({
  baseURL: config.API_URL,
  headers: {
    'x-api-token': config.API_TOKEN ?? '',
  },
});

instance.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    'x-auth-token': `${getJWT()}`,
    'x-refresh-token': `${getRefreshToken()}`,
  };
  return config;
});

instance.interceptors.response.use((config) => {
  const returnedToken = config.headers['x-auth-token'];
  if (returnedToken && returnedToken !== getJWT()) {
    storeJWT(returnedToken);
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
