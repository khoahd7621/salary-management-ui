import { Payload, User } from '~/models/modules/login';
import axiosClient from '../axios-client';

export const authApi = {
  login: (payload: Payload): Promise<User> => {
    return axiosClient.post('/auth/login', payload);
  },
  logout() {
    return axiosClient.post('/auth/logout');
  },
};
