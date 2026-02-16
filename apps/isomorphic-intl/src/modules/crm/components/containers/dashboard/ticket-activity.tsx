"use client"

import WidgetCard from "@core/components/cards/widget-card"
import { CustomTooltip } from "@core/components/charts/custom-tooltip"
import { CustomYAxisTick } from "@core/components/charts/custom-yaxis-tick"
import { useMedia } from "@core/hooks/use-media"
import SimpleBar from "@core/ui/simplebar"
import cn from "@core/utils/class-names"
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import { useTicketsReportList } from "@/modules/crm/hooks/use-tickets-report"
import { useTranslations } from "next-intl"

const ticketStatus = [{ name: "numberOfTask" }, { name: "numberOfTicket" }]
const COLORS = ["#7928ca", "#10b981", "#eab308"]

export default function TicketActivity({ className }: { className?: string }) {
  const t = useTranslations("crm")
  const isTablet = useMedia("(max-width: 800px)", false)
  const { data: output } = useTicketsReportList()
  const data =
    output?.data &&
    output?.data?.map((report) => ({
      label: report.month,
      numberOfTask: report.numberOfTask,
      numberOfTicket: report.numberOfTicket,
    }))
    
  return (
    <WidgetCard
      title={t("text-monthly-support-activity")}
      headerClassName="items-center"
      className={cn("min-h-[28rem]", className)}>
      <div className="mt-1.5 flex flex-wrap items-start gap-3 lg:gap-7">
        {ticketStatus.map((item, index) => (
          <div key={item.name} className="flex items-center gap-1.5">
            <span
              className="h-4 w-4 rounded-[2px]"
              style={{ backgroundColor: COLORS[index] }}
            />
            <span>{item.name}</span>
          </div>
        ))}
      </div>
      <SimpleBar>
        <div className="h-[28rem] w-full pt-6 @lg:pt-8">
          <ResponsiveContainer
            width="100%"
            height="100%"
            {...(isTablet && { minWidth: "1100px" })}>
            <ComposedChart
              data={data}
              margin={{
                left: -25,
              }}
              className="[&_.recharts-tooltip-cursor]:fill-opacity-20 dark:[&_.recharts-tooltip-cursor]:fill-opacity-10 [&_.recharts-cartesian-axis-tick-value]:fill-gray-500 [&_.recharts-cartesian-axis.yAxis]:-translate-y-3 rtl:[&_.recharts-cartesian-axis.yAxis]:-translate-x-12">
              <CartesianGrid
                vertical={false}
                strokeOpacity={0.435}
                strokeDasharray="8 10"
              />
              <XAxis dataKey="label" axisLine={false} tickLine={false} />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={<CustomYAxisTick />}
              />
              <Tooltip content={<CustomTooltip />} cursor={false} />
              <Bar
                dataKey="numberOfTask"
                fill={COLORS[0]}
                barSize={28}
                radius={[4, 4, 0, 0]}
              />
              <Bar
                type="natural"
                dataKey="numberOfTicket"
                fill={COLORS[1]}
                barSize={28}
                radius={[4, 4, 0, 0]}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </SimpleBar>
    </WidgetCard>
  )
}
