import { render } from '@react-email/render';
import { Button, message } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';

import { mailApi } from '~/api-clients/modules/mail-api';
import { Payslip, Type } from '~/models/modules/payslips';
import { MailTemplate } from './MailTemplate';

type ButtonSendMailProps = {
  data: Payslip;
};

export function ButtonSendMail({ data }: ButtonSendMailProps) {
  const [isSending, setIsSending] = useState(false);

  const handleSendMail = async (data: Payslip) => {
    setIsSending(true);
    try {
      let to = null;
      if (data.paidType === Type.Staff) to = data.contract.employee.email;
      else if (data.paidType === Type.Partner) to = data.contract.partner.email;

      if (!to) throw new Error();

      await mailApi.sendMail({
        to: to,
        subject: `New Payslip in ${dayjs(data.paidDate).format('MM/YYYY')} from OT & Salary Management`,
        html: render(<MailTemplate payslip={data} />),
      });
      message.success('Send mail successfully!');
    } catch (error) {
      if (data.paidType === Type.Staff)
        message.error('Employee does not have email or email is invalid or something went wrong! Please try again!');
      else if (data.paidType === Type.Partner)
        message.error('Partner does not have email or email is invalid or something went wrong! Please try again!');
    }
    setIsSending(false);
  };

  return (
    <Button disabled={isSending} onClick={() => handleSendMail(data)}>
      Send mail
    </Button>
  );
}
