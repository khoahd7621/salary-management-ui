import { Avatar, Space, Typography } from 'antd';
import { PhoneOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { User } from '~/models/modules/User';

export interface ProfileProps {
  profile?: User;
}

export function Profile({ profile = {} }: ProfileProps) {
  return (
    <Space style={{ width: '100%' }} direction="vertical" align="center">
      <Avatar size={128} icon={<UserOutlined />} />
      <Typography.Title level={4}>{profile.name}</Typography.Title>

      <Space>
        <Typography.Text>
          <PhoneOutlined />
        </Typography.Text>
        <Typography.Text>
          <a href={`tel:${profile.phoneNumber}`}>{profile.phoneNumber}</a>
        </Typography.Text>
      </Space>
      <Space>
        <Typography.Text>
          <MailOutlined />
        </Typography.Text>
        <Typography.Text>
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
        </Typography.Text>
      </Space>
    </Space>
  );
}
