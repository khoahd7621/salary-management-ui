import { Typography } from 'antd';
import dayjs from 'dayjs';

import { Contract } from '~/models/modules/contracts';
import { formatFileName, formatMoney } from '~/utils/format';

export interface ContractDetailProps {
  data: Contract;
}

export function ContractDetail({ data }: ContractDetailProps) {
  return (
    <table>
      <tbody>
        <tr style={{ display: 'block', padding: '4px' }}>
          <td style={{ width: '140px', fontWeight: 'bold' }}>File:</td>
          <td>
            {
              <Typography.Link href={data.file} target="_blank" rel="noopener noreferrer">
                {formatFileName.splitFileName(data.file)}
              </Typography.Link>
            }
          </td>
        </tr>
        <tr style={{ display: 'block', padding: '4px' }}>
          <td style={{ width: '140px', fontWeight: 'bold' }}>Company:</td>
          <td>{data.partner.companyName}</td>
        </tr>
        <tr style={{ display: 'block', padding: '4px' }}>
          <td style={{ width: '140px', fontWeight: 'bold' }}>Employee:</td>
          <td>{data.employee.name}</td>
        </tr>
        <tr style={{ display: 'block', padding: '4px' }}>
          <td style={{ width: '140px', fontWeight: 'bold' }}>Start date:</td>
          <td>{dayjs(data.startDate).format('DD/MM/YYYY')}</td>
        </tr>
        <tr style={{ display: 'block', padding: '4px' }}>
          <td style={{ width: '140px', fontWeight: 'bold' }}>End date:</td>
          <td>{dayjs(data.endDate).format('DD/MM/YYYY')}</td>
        </tr>
        <tr style={{ display: 'block', padding: '4px' }}>
          <td style={{ width: '140px', fontWeight: 'bold' }}>Job title:</td>
          <td>{data.partner.companyName}</td>
        </tr>
        <tr style={{ display: 'block', padding: '4px' }}>
          <td style={{ width: '140px', fontWeight: 'bold' }}>Contract type:</td>
          <td>{data.contractType}</td>
        </tr>
        <tr style={{ display: 'block', padding: '4px' }}>
          <td style={{ width: '140px', fontWeight: 'bold' }}>Basic salary:</td>
          <td>{formatMoney.VietnamDong.format(data.basicSalary)}</td>
        </tr>
        <tr style={{ display: 'block', padding: '4px' }}>
          <td style={{ width: '140px', fontWeight: 'bold' }}>Salary type:</td>
          <td>{data.salaryType}</td>
        </tr>
        <tr style={{ display: 'block', padding: '4px' }}>
          <td style={{ width: '140px', fontWeight: 'bold' }}>BHXH:</td>
          <td>{formatMoney.VietnamDong.format(data.bhxh ?? 0)}</td>
        </tr>
        <tr style={{ display: 'block', padding: '4px' }}>
          <td style={{ width: '140px', fontWeight: 'bold' }}>Tax:</td>
          <td>{formatMoney.VietnamDong.format(data.tax ?? 0)}</td>
        </tr>
        <tr style={{ display: 'block', padding: '4px' }}>
          <td style={{ width: '140px', fontWeight: 'bold' }}>BHYT:</td>
          <td>{formatMoney.VietnamDong.format(data.bhyt ?? 0)}</td>
        </tr>
        <tr style={{ display: 'block', padding: '4px' }}>
          <td style={{ width: '140px', fontWeight: 'bold' }}>BHTN:</td>
          <td>{formatMoney.VietnamDong.format(data.bhtn ?? 0)}</td>
        </tr>
        <tr style={{ display: 'block', padding: '4px' }}>
          <td style={{ width: '140px', fontWeight: 'bold' }}>Status:</td>
          <td>{data.contractStatus ?? 'N/a'}</td>
        </tr>
      </tbody>
    </table>
  );
}
