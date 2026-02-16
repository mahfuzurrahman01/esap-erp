'use client';

import { ResponsiveContainer, FunnelChart, Funnel, Cell, LabelList } from 'recharts';
import MetricCard from '@core/components/cards/metric-card';
import { useDealByStage } from '@/modules/crm/hooks/use-opportunity-analytics';
import { useTranslations } from 'next-intl';

export default function DealByStage() {
  const t = useTranslations("crm");
  const { data: output }: any = useDealByStage() || {};
  const tableData = output?.data || [];

  const colors = ['#3872FA', '#7928ca', '#eab308', '#f1416c', '#c084fc', '#22bca0'];

  const chartData = tableData?.map((item: any, index: number) => ({
    name: item?.stage,
    value: item?.dealCount,
    color: colors[index % colors.length],
  }));

  return (
    <MetricCard
      title={t("text-deals-by-stages")}
      metric=""
      metricClassName="crm-card-value dark:text-gray-300 pt-4 pb-1"
      className="w-full max-w-full justify-between border-none md:mt-6 rounded-2xl lg:p-0"
      titleClassName="text-title p-6"
    >
      <div className="h-80 w-full pt-9 @2xl:mx-auto @2xl:w-[28rem] @6xl:h-[28rem] @7xl:h-80 @7xl:pt-6">
        <ResponsiveContainer width="100%" height="100%">
          <FunnelChart>
            <Funnel dataKey="value" data={chartData} isAnimationActive>
              {chartData.map((entry: any, index: number) => (
                <Cell
                  key={`funnel-cell-${entry.name}`}
                  fill={entry.color}
                  stroke={entry.color}
                  className="dark:[fill-opacity:0.9]"
                />
              ))}
              {/* Labels inside the funnel */}
              <LabelList
                position="inside"
                fill="white"
                fontSize={14}
                fontWeight="bold"
                dataKey="value"
              />
            </Funnel>
          </FunnelChart>
        </ResponsiveContainer>
      </div>

      <div className="w-full border-t border-gray-300 border-dashed mt-10 py-5 flex flex-wrap justify-center gap-4 dark:border-gray-700">
        {chartData.map((item:any, index:number) => (
          <div key={index} className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
            <span className="text-sm font-medium">{item.name}</span>
          </div>
        ))}
      </div>
    </MetricCard>
  );
}