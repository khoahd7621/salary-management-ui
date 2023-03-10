import getConfig from 'next/config';
import nodemailer from 'nodemailer';

const { serverRuntimeConfig } = getConfig();

export type EmailPayload = {
  to: string;
  subject: string;
  html: string;
};

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: serverRuntimeConfig.SMTP_USER,
    pass: serverRuntimeConfig.SMTP_PASSWORD,
  },
});

export const mailOptions = {
  from: serverRuntimeConfig.SMTP_USER,
};
