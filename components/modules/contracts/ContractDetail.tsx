import { Col, Row, Space } from 'antd';
import Link from 'antd/lib/typography/Link';
import dayjs from 'dayjs';
import { Contract } from '~/models/modules/contracts';
import { formatMoney } from '~/utils/format';

export interface ContractDetailProps {
  data: Contract;
}

export function ContractDetail({ data }: ContractDetailProps) {
  return (
    <Space direction="vertical">
      <Row>
        <Col span={6}>File:</Col>
        <Col span={18}>
          {
            <Link href={data.file} target="_blank" rel="noopener noreferrer">
              {data.file}
            </Link>
          }
        </Col>
      </Row>
      <Row>
        <Col span={6}>Company:</Col>
        <Col span={18}>{data.partner.companyName}</Col>
      </Row>
      <Row>
        <Col span={6}>Employee:</Col>
        <Col span={18}>{data.employee.name}</Col>
      </Row>
      <Row>
        <Col span={6}>Start date:</Col>
        <Col span={18}>{dayjs(data.startDate).format('DD/MM/YYYY')}</Col>
      </Row>
      <Row>
        <Col span={6}>End date:</Col>
        <Col span={18}>{dayjs(data.endDate).format('DD/MM/YYYY')}</Col>
      </Row>
      <Row>
        <Col span={6}>Job title:</Col>
        <Col span={18}>{data.partner.companyName}</Col>
      </Row>
      <Row>
        <Col span={6}>Contract type:</Col>
        <Col span={18}>{data.contractType}</Col>
      </Row>
      <Row>
        <Col span={6}>Basic salary:</Col>
        <Col span={18}>{formatMoney.VietnamDong.format(data.basicSalary)}</Col>
      </Row>
      <Row>
        <Col span={6}>Salary type:</Col>
        <Col span={18}>{data.salaryType}</Col>
      </Row>
      <Row>
        <Col span={6}>BHXH:</Col>
        <Col span={18}>{formatMoney.VietnamDong.format(data.bhxh ?? 0)}</Col>
      </Row>
      <Row>
        <Col span={6}>Tax:</Col>
        <Col span={18}>{formatMoney.VietnamDong.format(data.tax ?? 0)}</Col>
      </Row>
      <Row>
        <Col span={6}>BHYT:</Col>
        <Col span={18}>{formatMoney.VietnamDong.format(data.bhyt ?? 0)}</Col>
      </Row>
      <Row>
        <Col span={6}>BHTN:</Col>
        <Col span={18}>{formatMoney.VietnamDong.format(data.bhtn ?? 0)}</Col>
      </Row>
      <Row>
        <Col span={6}>Status:</Col>
        <Col span={18}>{data.contractStatus ?? 'N/a'}</Col>
      </Row>
    </Space>
  );
}
