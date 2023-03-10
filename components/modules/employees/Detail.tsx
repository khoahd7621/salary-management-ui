import { Image } from 'antd';
import dayjs from 'dayjs';

import { Employee } from '~/models/modules/employees';

export interface DetailProps {
  data: Employee;
}

export function Detail({ data }: DetailProps) {
  return (
    <table width={'100%'}>
      <tbody>
        <tr style={{ display: 'block', padding: '8px' }}>
          <td style={{ fontWeight: 'bold', width: '160px' }}>Image:</td>
          <td>{data.image ? <Image width={100} src={data.image} alt={data.name} /> : 'N/a'}</td>
        </tr>
        <tr style={{ display: 'block', padding: '8px' }}>
          <td style={{ fontWeight: 'bold', width: '160px' }}>Code:</td>
          <td>{data.code || 'N/a'}</td>
        </tr>
        <tr style={{ display: 'block', padding: '8px' }}>
          <td style={{ fontWeight: 'bold', width: '160px' }}>Name:</td>
          <td>{data.name || 'N/a'}</td>
        </tr>
        <tr style={{ display: 'block', padding: '8px' }}>
          <td style={{ fontWeight: 'bold', width: '160px' }}>Date of birth:</td>
          <td>{dayjs(data.dateOfBirth).format('DD/MM/YYYY')}</td>
        </tr>
        <tr style={{ display: 'block', padding: '8px' }}>
          <td style={{ fontWeight: 'bold', width: '160px' }}>Phone:</td>
          <td>{data.phoneNumber || 'N/a'}</td>
        </tr>
        <tr style={{ display: 'block', padding: '8px' }}>
          <td style={{ fontWeight: 'bold', width: '160px' }}>Email:</td>
          <td>{data.email || 'N/a'}</td>
        </tr>
        <tr style={{ display: 'block', padding: '8px' }}>
          <td style={{ fontWeight: 'bold', width: '160px' }}>Address:</td>
          <td>{data.address || 'N/a'}</td>
        </tr>
      </tbody>
    </table>
  );
}
