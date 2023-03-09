import axios from 'axios';

const axiosClientV2 = axios.create({
  baseURL: '/api/v2',
});

axiosClientV2.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosClientV2.interceptors.response.use(
  function (response) {
    return response.data || response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosClientV2;
