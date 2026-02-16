import React from "react"

import MetricCard from "@core/components/cards/metric-card"
import { Text } from "rizzui"

import {
  useTodayLeadAnalytics,
} from "@/modules/crm/hooks/use-lead-analytics"

import JunkLeadSource from "./junk-lead-source"
import { useTranslations } from "next-intl"
import { Bar, BarChart, ResponsiveContainer } from "recharts"
import { conventionRateData } from "@/data/crm/crm-dashboard-data"
import { UpIcon } from "@/components/icons/crm/up"
import { DownIcon } from "@/components/icons/crm/down"

export default function TodayLeads() {
  const t = useTranslations("crm")
  const { data: leads }: any = useTodayLeadAnalytics() || {}
  const analyticLeadSummary = leads?.data
  return (
    <div className="w-full md:col-span-1">
      <MetricCard
        title={t("text-todays-leads")}
        metric={analyticLeadSummary?.leadsToday ?? 0}
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
                    fill={analyticLeadSummary?.growthPercentage > 0 ? '#00a76f' : '#ff5630'}
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
            {analyticLeadSummary?.growthPercentage > 0 ? (
                <UpIcon className="me-1 size-5" />
            ) : (
                <DownIcon className="me-1 size-5 text-orange-400" />
            )}
            <span className="text-gray-700 font-bold dark:text-gray-200">{Number(analyticLeadSummary?.growthPercentage || 0).toFixed(2)}%</span>
            </Text>
            <span className="mr-2">{t("text-yesterday")}</span>
        </Text>
      </MetricCard>
      <MetricCard
        title={t("text-junk-leads-by-source")}
        metric=""
        metricClassName="3xl:text-[22px] dark:text-gray-300 pt-4 pb-1"
        className="mt-5 w-full max-w-full justify-between border-none text-title rounded-2xl !p-0"
        titleClassName="text-title px-6 pt-7 pb-1">
        <JunkLeadSource />
      </MetricCard>
    </div>
  )
}
