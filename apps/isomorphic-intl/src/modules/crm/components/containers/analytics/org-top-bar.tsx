import { DownIcon } from '@/components/icons/crm/down'
import { UpIcon } from '@/components/icons/crm/up'
import { conventionRateData } from '@/data/crm/crm-dashboard-data'
import MetricCard from '@core/components/cards/metric-card'
import { useTranslations } from 'next-intl'
import React from 'react'
import { Bar, BarChart, ResponsiveContainer } from 'recharts'
import { Text } from "rizzui"

export default function OrgTopBar({analyticLeadSummary, revenueSummary, dealPipelineSummary, customerOverview}:any) {
  const t = useTranslations("crm")
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <MetricCard
        title={t("text-leads-this-month")}
        metric={analyticLeadSummary?.leadsThisMonth}
        metricClassName="crm-card-value dark:text-gray-300 pt-4 pb-1"
        className="w-full max-w-full justify-between border-none text-title rounded-2xl"
        titleClassName="text-title font-semibold"
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
          <span className="mr-2">{t("text-last-month")}</span>
        </Text>
      </MetricCard>
      <MetricCard
        title={t("text-revenue-this-month")}
        metric={revenueSummary?.revenueThisMonth}
        metricClassName="crm-card-value dark:text-gray-300 pt-4 pb-1"
        className="w-full max-w-full justify-between border-none rounded-2xl"
        titleClassName="text-title font-semibold"
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
            {revenueSummary?.growthPercentage > 0 ? (
              <UpIcon className="me-1 size-5" />
            ) : (
              <DownIcon className="me-1 size-5 text-orange-400" />
            )}
            <span className="text-gray-700 font-bold dark:text-gray-200">{Number(revenueSummary?.growthPercentage || 0).toFixed(2)}%</span>
          </Text>
          <span className="mr-2">{t("text-last-month")}</span>
        </Text>
      </MetricCard>
      <MetricCard
        title={t("text-deals-in-pipeline")}
        metric={dealPipelineSummary}
        metricClassName="crm-card-value dark:text-gray-300 pt-4 pb-1"
        className="w-full max-w-full justify-between border-none rounded-2xl"
        titleClassName="text-title font-semibold">
      </MetricCard>
      <MetricCard
        title={t("text-customer-this-month")}
        metric={customerOverview?.customerThisMonth}
        metricClassName="crm-card-value dark:text-gray-300 pt-4 pb-1"
        className="w-full max-w-full justify-between border-none rounded-2xl"
        titleClassName="text-title font-semibold"
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
            {customerOverview?.growthPercentage > 0 ? (
              <UpIcon className="me-1 size-5" />
            ) : (
              <DownIcon className="me-1 size-5 text-orange-400" />
            )}
            <span className="text-gray-700 font-bold dark:text-gray-200">{Number(customerOverview?.growthPercentage || 0).toFixed(2)}%</span>
          </Text>
          <span className="mr-2">{t("text-last-month")}</span>
        </Text>
      </MetricCard>
    </div>
  )
}
