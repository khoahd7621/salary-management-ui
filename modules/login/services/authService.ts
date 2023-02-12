import axiosClient from '~/config/axios-client';
import { LoginPayload } from '../models/loginPayload';

export function login(payload: LoginPayload) {
  return axiosClient.post('/auth/login', payload);
}
