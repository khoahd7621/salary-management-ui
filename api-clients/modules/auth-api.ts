import { Payload } from '~/models/modules/login';
import { User } from '~/models/modules/User';
import axiosClient from '../axios-client';

export const authApi = {
  login: (payload: Payload): Promise<User> => {
    return axiosClient.post('/auth/login', payload);
  },
  logout() {
    return axiosClient.post('/auth/logout');
  },
};
