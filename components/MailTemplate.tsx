import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import dayjs from 'dayjs';

import { Payslip } from '~/models/modules/payslips';

interface MailTemplateProps {
  inviteLink?: string;
  inviteFromLocation?: string;
  payslip: Payslip;
}

export const MailTemplate = ({
  inviteLink = 'https://vercel.com/download/template',
  inviteFromLocation = 'Ho Chi Minh City, Vietnam',
  payslip,
}: MailTemplateProps) => {
  const previewText = `Your payslip on ${dayjs(payslip.paidDate).format('MM/YYYY')}`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={{ marginTop: '32px' }}>
            <Img
              src={'https://static-00.iconduck.com/assets.00/vercel-icon-512x449-3422jidz.png'}
              width="40"
              height="37"
              alt="App logo"
              style={logo}
            />
          </Section>
          <Heading style={h1}>
            Your <strong>Payslip</strong> on <strong>{dayjs(payslip.paidDate).format('MM/YYYY')}</strong>
          </Heading>
          <Text style={text}>Hello {payslip.contract.employee.name},</Text>
          <Text style={text}>
            We <strong>kindly</strong> send you new payslip. Click button below to download pdf file.
          </Text>
          <Section
            style={{
              textAlign: 'center',
              marginTop: '26px',
              marginBottom: '26px',
            }}
          >
            <Button pX={20} pY={12} style={btn} href={inviteLink} target="_blank" rel="noreferrer noopener">
              Download Payslip
            </Button>
          </Section>
          <Text style={text}>
            or copy and paste this URL into your browser:{' '}
            <Link href={inviteLink} target="_blank" style={link} rel="noreferrer">
              {inviteLink}
            </Link>
          </Text>
          <Hr style={hr} />
          <Text style={footer}>
            This payslip was sent from <span style={black}>OT & Salary Management</span> located in{' '}
            <span style={black}>{inviteFromLocation}</span>. If you were not expecting this email, you can ignore. If
            you are concerned about your account&apos;s safety, please reply to this email to get in touch with us.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

// CSS
const main = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
};

const container = {
  border: '1px solid #eaeaea',
  borderRadius: '5px',
  margin: '40px auto',
  padding: '20px',
  width: '465px',
};

const logo = {
  margin: '0 auto',
};

const h1 = {
  color: '#000',
  fontSize: '24px',
  fontWeight: 'normal',
  textAlign: 'center' as const,
  margin: '30px 0',
  padding: '0',
};

const link = {
  color: '#067df7',
  textDecoration: 'none',
};

const text = {
  color: '#000',
  fontSize: '14px',
  lineHeight: '24px',
};

const black = {
  color: 'black',
};

const btn = {
  backgroundColor: '#000',
  borderRadius: '5px',
  color: '#fff',
  fontSize: '12px',
  fontWeight: 500,
  lineHeight: '50px',
  textDecoration: 'none',
  textAlign: 'center' as const,
};

const hr = {
  border: 'none',
  borderTop: '1px solid #eaeaea',
  margin: '26px 0',
  width: '100%',
};

const footer = {
  color: '#666666',
  fontSize: '12px',
  lineHeight: '24px',
};
