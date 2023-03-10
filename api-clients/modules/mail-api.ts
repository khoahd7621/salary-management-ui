import { EmailPayload } from '~/config/nodemailer';
import axiosClient from '../axios-client';

export const mailApi = {
  sendMail: async (payload: EmailPayload) => {
    return axiosClient.post('/send-email', payload);
  },
};
