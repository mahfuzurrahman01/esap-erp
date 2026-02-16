"use client"

import { CustomTooltip } from "@core/components/charts/custom-tooltip"
import { useMedia } from "@core/hooks/use-media"
import SimpleBar from "@core/ui/simplebar"
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from "recharts"

export default function BankTransactionChart({
  transactionHistory,
}: {
  transactionHistory: any
}) {
  const isMobile = useMedia("(max-width: 767px)", false)
  
  const monthMap: Record<number, string> = {
    1: "Jan",
    2: "Feb",
    3: "Mar",
    4: "Apr",
    5: "May",
    6: "Jun",
    7: "Jul",
    8: "Aug",
    9: "Sep",
    10: "Oct",
    11: "Nov",
    12: "Dec",
  };
  
  const data = transactionHistory?.map((row: any) => ({
    month: monthMap[row?.month] || "Unknown",
    deposit: row?.depositAmount || 0,
    withdraw: row?.withdrawAmount || 0,
  }));  

  return (
    <SimpleBar className="mt-8">
      <div className="h-36">
        <ResponsiveContainer
          width={isMobile ? 250 : 400}
          height="100%"
          className="[&_.recharts-wrapper]:!min-w-0">
          <BarChart
            data={data}
            stackOffset="none"
            margin={{
              left: 0,
              right: 10,
            }}
            barGap={10}
            className="[&_.recharts-tooltip-cursor]:fill-opacity-20 dark:[&_.recharts-tooltip-cursor]:fill-opacity-10 [&_.recharts-cartesian-axis-tick-value]:fill-gray-500 [&_.recharts-cartesian-axis.yAxis]:-translate-y-3 rtl:[&_.recharts-cartesian-axis.yAxis]:-translate-x-12 [&_.recharts-cartesian-grid-vertical]:opacity-0">
            <XAxis dataKey="month" axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip formattedNumber prefix="$" />} />
            <Bar
              dataKey="deposit"
              stackId="deposit"
              fill="#00A76F"
              barSize={20}
              radius={[10, 10, 10, 10]}
            />
            <Bar
              dataKey="withdraw"
              stackId="withdraw"
              fill="#FF5630"
              barSize={20}
              radius={[10, 10, 10, 10]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </SimpleBar>
  )
}
