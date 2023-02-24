import { Col, Image, Row, Space } from 'antd';
import dayjs from 'dayjs';

import { Employee } from '~/models/modules/employees';

export interface DetailProps {
  data: Employee;
}

export function Detail({ data }: DetailProps) {
  return (
    <Space direction="vertical">
      <Row>
        <Col span={6}>Image:</Col>
        <Col span={18}>
          <Image width={100} src={data.image} alt={data.name} />
        </Col>
      </Row>
      <Row>
        <Col span={6}>Code:</Col>
        <Col span={18}>{data.code}</Col>
      </Row>
      <Row>
        <Col span={6}>Name:</Col>
        <Col span={18}>{data.name}</Col>
      </Row>
      <Row>
        <Col span={6}>Date of birth:</Col>
        <Col span={18}>{dayjs(data.dateOfBirth).format('DD/MM/YYYY')}</Col>
      </Row>
      <Row>
        <Col span={6}>Phone:</Col>
        <Col span={18}>{data.phoneNumber}</Col>
      </Row>
      <Row>
        <Col span={6}>Address:</Col>
        <Col span={18}>{data.address}</Col>
      </Row>
    </Space>
  );
}
