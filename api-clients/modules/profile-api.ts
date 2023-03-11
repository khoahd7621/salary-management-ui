import { User } from '~/models/modules/User';
import axiosClient from '../axios-client';

type PayloadUpdate = {
  name: string;
  image: string;
  phoneNumber: string;
  email: string;
};

type PayloadChangePassword = {
  oldPassword: string;
  newPassword: string;
};

export const profileApi = {
  getProfile: (): Promise<User> => {
    return axiosClient.get('/admin/profile');
  },
  updateProfile: (data: PayloadUpdate): Promise<string> => {
    return axiosClient.put('/admin/update', data);
  },
  changePassword: (data: PayloadChangePassword): Promise<string> => {
    return axiosClient.put('/admin/change-password', data);
  },
};
