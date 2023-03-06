import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { Revenue } from '~/models/modules/dashboard';

export interface RevenueChartProps {
  data: Revenue[];
}

export function RevenueChart({ data }: RevenueChartProps) {
  return (
    <>
      {data.length ? (
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
      ) : (
        <span>No data</span>
      )}
    </>
  );
}
