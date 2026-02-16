'use client';

import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { useState } from 'react';
import { useElementSize } from '@core/hooks/use-element-size';
import { useIndustryLeadAnalytics } from '@/modules/crm/hooks/use-lead-analytics';

const COLORS = ['#00a76f', '#ffd666', '#006c9c', '#ff5630', '#47a7ff'];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 rounded-lg shadow-md dark:bg-gray-700">
        <p className="text-sm font-normal">{`${payload[0].name}: ${payload[0].value}%`}</p>
      </div>
    );
  }
  return null;
};

const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) / 2;
  const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
  const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      className="text-xs font-bold"
    >
      {`${(percent * 100).toFixed(1)}%`}
    </text>
  );
};

export default function LeadByIndustry() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [chartRef] = useElementSize();
  
  const onPieEnter = (_: unknown, index: number) => {
    setActiveIndex(index);
  };

  const { data: output }: any = useIndustryLeadAnalytics() || {};
  const leads = output?.data || [];

  const chartData = leads.map((lead: any, index: number) => ({
    name: lead.industry,
    value: lead.percentage,
    color: COLORS[index % COLORS.length],
  }));

  return (
    <div ref={chartRef} className="w-full flex flex-col items-center">
      <div className="h-60 w-full flex justify-center items-center mt-6">
        <ResponsiveContainer width="100%" height={500}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
              nameKey="name"
              label={renderCustomLabel}
              labelLine={false}
              onMouseEnter={onPieEnter}
              activeIndex={activeIndex}
            >
              {chartData.map((entry: any, index: number) => (
                <Cell key={`cell-${index}`} fill={entry.color} stroke={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      
      <div className="w-full border-t border-gray-300 border-dashed mt-16 pt-5 flex flex-wrap justify-center gap-4 dark:border-gray-700">
        {chartData.map((item:any, index:number) => (
          <div key={index} className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
            <span className="text-sm font-medium">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}