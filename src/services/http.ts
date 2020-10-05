import axios from 'axios';

import { getToken } from 'auth/storage';
const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'api-token': process.env.REACT_APP_API_TOKEN,
    Authorization: `Bearer ${getToken()}`,
  },
});

export default {
  get: instance.get,
  post: instance.post,
  put: instance.put,
  delete: instance.delete,
  patch: instance.patch,
};
