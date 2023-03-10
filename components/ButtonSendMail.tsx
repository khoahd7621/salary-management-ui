import { render } from '@react-email/render';
import { Button, message } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';

import { mailApi } from '~/api-clients/modules/mail-api';
import { Payslip } from '~/models/modules/payslips';
import { MailTemplate } from './MailTemplate';

type ButtonSendMailProps = {
  data: Payslip;
};

export function ButtonSendMail({ data }: ButtonSendMailProps) {
  const [isSending, setIsSending] = useState(false);

  const handleSendMail = async (data: Payslip) => {
    setIsSending(true);
    try {
      await mailApi.sendMail({
        // Todo: change to real email
        to: 'sample@gmail.com',
        subject: `New Payslip in ${dayjs(data.paidDate).format('MM/YYYY')} from OT & Salary Management`,
        html: render(<MailTemplate payslip={data} />),
      });
      message.success('Send mail successfully!');
    } catch (error) {
      message.error('Employee does not have email or email is invalid or something went wrong! Please try again!');
    }
    setIsSending(false);
  };

  return (
    <Button disabled={isSending} onClick={() => handleSendMail(data)}>
      Send mail
    </Button>
  );
}
