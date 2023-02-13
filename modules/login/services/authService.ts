import axiosClient from '~/config/axios-client';
import { LoginPayload } from '../models/loginPayload';
import { UserResponse } from '../models/UserResponse';

export function login(payload: LoginPayload): Promise<UserResponse> {
  return axiosClient.post('/auth/login', payload);
}
