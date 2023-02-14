import { Payload, User } from '~/models/modules/login';
import axiosClient from '../axios-client';

export function postLogin(payload: Payload): Promise<User> {
  return axiosClient.post('/auth/login', payload);
}
