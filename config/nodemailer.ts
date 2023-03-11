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
  port: 465,
  secure: true, // use SSL
});

export const mailOptions = {
  from: serverRuntimeConfig.SMTP_USER,
};
