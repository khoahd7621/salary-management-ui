import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { Revenue } from '~/models/modules/dashboard';

export interface RevenueChartProps {
  data?: Revenue[];
}

export function RevenueChart(_props: RevenueChartProps) {
  const data = [
    {
      date: '09/2022',
      revenue: 4000,
      cost: 2400,
    },
    {
      date: '10/2022',
      revenue: 3000,
      cost: 1398,
    },
    {
      date: '11/2022',
      revenue: 2000,
      cost: 9800,
    },
    {
      date: '12/2022',
      revenue: 2780,
      cost: 3908,
    },
    {
      date: '01/2023',
      revenue: 1890,
      cost: 4800,
    },
    {
      date: '02/2023',
      revenue: 2390,
      cost: 3800,
    },
    {
      date: '03/2023',
      revenue: 3490,
      cost: 4300,
    },
  ];

  return (
    <ResponsiveContainer width={'100%'} height={330}>
      <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="revenue" stroke="#5FD068" />
        <Line type="monotone" dataKey="cost" stroke="#990000" />
      </LineChart>
    </ResponsiveContainer>
  );
}
