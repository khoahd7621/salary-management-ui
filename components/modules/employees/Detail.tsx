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
          <td>
            <Image width={100} src={data.image} alt={data.name} />
          </td>
        </tr>
        <tr style={{ display: 'block', padding: '8px' }}>
          <td style={{ fontWeight: 'bold', width: '160px' }}>Code:</td>
          <td>{data.code}</td>
        </tr>
        <tr style={{ display: 'block', padding: '8px' }}>
          <td style={{ fontWeight: 'bold', width: '160px' }}>Name:</td>
          <td>{data.name}</td>
        </tr>
        <tr style={{ display: 'block', padding: '8px' }}>
          <td style={{ fontWeight: 'bold', width: '160px' }}>Date of birth:</td>
          <td>{dayjs(data.dateOfBirth).format('DD/MM/YYYY')}</td>
        </tr>
        <tr style={{ display: 'block', padding: '8px' }}>
          <td style={{ fontWeight: 'bold', width: '160px' }}>Phone:</td>
          <td>{data.phoneNumber}</td>
        </tr>
        <tr style={{ display: 'block', padding: '8px' }}>
          <td style={{ fontWeight: 'bold', width: '160px' }}>Address:</td>
          <td>{data.address}</td>
        </tr>
      </tbody>
    </table>
  );
}
