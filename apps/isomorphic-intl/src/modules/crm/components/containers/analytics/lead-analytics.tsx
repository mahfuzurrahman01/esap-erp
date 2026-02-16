import React from "react"

import MetricCard from "@core/components/cards/metric-card"
import { Text } from "rizzui"

import { useThisWeekLeadAnalytics } from "@/modules/crm/hooks/use-lead-analytics"

import SalesFunnel from "./sales-funnel"
import TodayLeads from "./today-leads"
import TopLeadSource from "./top-lead-source"
import MonthlyLeadCreation from "./monthly-lead-creation"
import LeadByIndustry from "./lead-by-industry"
import { useTranslations } from "next-intl"
import { UpIcon } from "@/components/icons/crm/up"
import { DownIcon } from "@/components/icons/crm/down"
import { Bar, BarChart, ResponsiveContainer } from "recharts"
import { conventionRateData } from "@/data/crm/crm-dashboard-data"

export default function LeadAnalyticContainer() {
  const t = useTranslations("crm")
  const { data: output }: any = useThisWeekLeadAnalytics() || {}
  const weeklyleads = output?.data
  return (
    <>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <TodayLeads />
            <div className="w-full md:col-span-1">
                <MetricCard
                title={t("text-this-weeks-lead")}
                metric={weeklyleads?.leadsThisWeek ?? 0}
                metricClassName="crm-card-value dark:text-gray-300 pt-4 pb-1"
                className="w-full max-w-full justify-between border-none text-title rounded-2xl"
                titleClassName="text-title"
                chartClassName="mt-10"
                chart={
                    <div className="h-[40px] w-[70px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart barSize={4.8} barGap={4} data={conventionRateData}>
                          <Bar
                            dataKey="sale"
                            fill={weeklyleads?.growthPercentage > 0 ? '#00a76f' : '#ff5630'}
                            radius={[2, 2, 0, 0]}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                }>
                <Text className="mt-3 flex items-center leading-none text-gray-500">
                    <Text
                    as="span"
                    className="me-2 inline-flex items-center font-medium text-green">
                    {weeklyleads?.growthPercentage > 0 ? (
                        <UpIcon className="me-1 size-5" />
                    ) : (
                        <DownIcon className="me-1 size-5 text-orange-400" />
                    )}
                    <span className="text-gray-700 font-bold dark:text-gray-200">{Number(weeklyleads?.growthPercentage || 0).toFixed(2)}%</span>
                    </Text>
                    <span className="mr-2">{t("text-yesterday")}</span>
                </Text>
                </MetricCard>
                <MetricCard
                title={t("text-top-ten-lead-sources")}
                metric=""
                metricClassName="3xl:text-[22px] dark:text-gray-300 pt-4 pb-1"
                className="w-full max-w-full justify-between border-none text-title mt-5 rounded-2xl !p-0"
                titleClassName="text-title px-6 pt-7 pb-1">
                <TopLeadSource />
                </MetricCard>
            </div>
            <div className="w-full md:col-span-2">
                <MetricCard
                    title={t("text-sales-funnel")}
                    metric=""
                    metricClassName="3xl:text-[22px] dark:text-gray-300 pt-4 pb-1"
                    className="col-span-2 w-full md:col-span-2 max-w-full justify-between border-none text-title rounded-2xl"
                    titleClassName="text-title mb-6">
                    <SalesFunnel />
                </MetricCard>
            </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <MetricCard
                title={t("text-monthly-leads-creation")}
                metric=""
                metricClassName="3xl:text-[22px] dark:text-gray-300 pt-4 pb-1"
                className="w-full max-w-full justify-between border-none text-title mt-5 rounded-2xl"
                titleClassName="text-title mb-6">
                <MonthlyLeadCreation />
            </MetricCard>
            <MetricCard
                title={t("text-leads-by-industry")}
                metric=""
                metricClassName="3xl:text-[22px] dark:text-gray-300 pt-4 pb-1"
                className="w-full max-w-full justify-between border-none text-title md:mt-5 rounded-2xl p-0 lg:p-0"
                titleClassName="text-title p-6">
                <LeadByIndustry />
            </MetricCard>
        </div>
    </>
  )
}
