import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'api-token': process.env.REACT_APP_API_TOKEN,
  },
});

// instance.interceptors.response.use(null, error => {
//   const expectedError =
//     error.response &&
//     error.response.status >= 400 &&
//     error.response.status < 500;

//   if (!expectedError) {
//     console.log('Logging the error', error);
//     alert('An unexpected error occurred.');
//   }
//   return Promise.reject(error);
// });

export default {
  get: instance.get,
  post: instance.post,
  put: instance.put,
  delete: instance.delete,
  patch: instance.patch,
};
