import type { NextApiRequest, NextApiResponse } from 'next';

import { mailOptions, transporter } from '~/config/nodemailer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  if (!req.body.to) {
    return res.status(400).json({ message: 'Email is required' });
  }
  if (!req.body.subject) {
    return res.status(400).json({ message: 'Subject is required' });
  }
  if (!req.body.html) {
    return res.status(400).json({ message: 'Html is required' });
  }

  try {
    await transporter.sendMail({
      ...mailOptions,
      to: req.body.to,
      subject: req.body.subject,
      html: req.body.html,
    });

    return res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    return res.status(400).json({ message: 'Email sending failed' });
  }
}
