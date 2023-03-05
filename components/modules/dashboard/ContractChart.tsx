import { useState } from 'react';
import { Cell, Pie, PieChart, PieLabelRenderProps, ResponsiveContainer, Sector } from 'recharts';

export interface ContractChartProps {}

const data = [
  { name: 'Active', value: 400 },
  { name: 'Expired', value: 300 },
];

const COLORS = ['#82CD47', '#C21010'];

const renderActiveShape = (props: PieLabelRenderProps) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;

  const cxx = cx as number;
  const cyy = cy as number;
  const outerRadiuss = outerRadius as number;
  const innerRadiuss = innerRadius as number;
  const percentt = percent as number;

  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cxx + (outerRadiuss + 10) * cos;
  const sy = cyy + (outerRadiuss + 10) * sin;
  const mx = cxx + (outerRadiuss + 30) * cos;
  const my = cyy + (outerRadiuss + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cxx}
        cy={cyy}
        innerRadius={innerRadiuss}
        outerRadius={outerRadiuss}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cxx}
        cy={cyy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadiuss + 6}
        outerRadius={outerRadiuss + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`Quantity ${value}`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {`(Rate ${(percentt * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

export function ContractChart(_props: ContractChartProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  return (
    <ResponsiveContainer width="100%" height={260}>
      <PieChart>
        <Pie
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          onMouseEnter={onPieEnter}
        >
          {data.map((_entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}
