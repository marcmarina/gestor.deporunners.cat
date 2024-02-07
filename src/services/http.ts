import axios from 'axios';
import { merge } from 'lodash';

import { getRefreshToken, getJWT, storeJWT } from 'auth/storage';
import { config } from 'config';

const instance = axios.create({
  baseURL: config.API_URL,
  headers: {
    'x-api-token': config.API_TOKEN ?? '',
  },
  timeout: 10000,
});

instance.interceptors.request.use((config) => {
  return merge({}, config, {
    headers: {
      'x-auth-token': getJWT(),
      'x-refresh-token': getRefreshToken(),
      'x-request-id': crypto.randomUUID(),
    },
  });
});

instance.interceptors.response.use((config) => {
  const returnedToken = config.headers['x-auth-token'];

  if (returnedToken && returnedToken !== getJWT()) {
    storeJWT(returnedToken);
  }

  return config;
});

export default instance;
