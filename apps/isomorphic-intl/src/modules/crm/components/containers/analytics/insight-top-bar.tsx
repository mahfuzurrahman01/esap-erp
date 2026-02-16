import { DownIcon } from '@/components/icons/crm/down'
import { UpIcon } from '@/components/icons/crm/up'
import { conventionRateData } from '@/data/crm/crm-dashboard-data'
import { useDealsAnalytics, useLostRevenueAnalytics, useMonthlyRevenueAnalytics } from '@/modules/crm/hooks/use-opportunity-analytics'
import MetricCard from '@core/components/cards/metric-card'
import CircleProgressBar from '@core/components/charts/circle-progressbar'
import { useTranslations } from 'next-intl'
import React from 'react'
import { Bar, BarChart, ResponsiveContainer } from 'recharts'
import { Text } from "rizzui"


export default function InsightTopBar({dealPipelineSummary}:any) {
  const t = useTranslations("crm")
  const { data: output }:any = useMonthlyRevenueAnalytics() || {};  
  const revenue = output?.data
  const { data: outputData }:any = useDealsAnalytics() || {};
  const deals = outputData?.data
  const { data: outputDataLost }:any = useLostRevenueAnalytics() || {};
  const lostRevenue = outputDataLost?.data
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <MetricCard
        title={t("text-revenue-this-month")}
        metric={revenue?.revenueThisMonth}
        metricClassName="crm-card-value dark:text-gray-300 pt-4 pb-1"
        className="w-full max-w-full justify-between border-none text-title rounded-2xl"
        titleClassName="text-title font-semibold"
        chartClassName="mt-10"
        chart={
            <div className="h-12 w-20 @[16.25rem]:h-12 @[16.25rem]:w-18 @xs:h-12 @xs:w-18">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart barSize={6} barGap={5} data={conventionRateData}>
                  <Bar
                    dataKey="sale"
                    fill={revenue?.growthPercentage > 0 ? '#29ccb1' : 'orange'}
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
            {revenue?.growthPercentage > 0 ? (
                <UpIcon className="me-1 size-5" />
            ) : (
                <DownIcon className="me-1 size-5 text-orange-400" />
            )}
            <span className="text-gray-700 font-bold dark:text-gray-200">{revenue?.growthPercentage > 0 ? revenue?.growthPercentage?.toFixed(0) : revenue?.growthPercentage}%</span>
            </Text>
            <span className="mr-2">{t("text-last-month")}</span>
        </Text>
      </MetricCard>
      <MetricCard
        title={t("text-deals-created")}
        metric={deals?.dealsCreatedThisMonth}
        metricClassName="crm-card-value dark:text-gray-300 pt-4 pb-1"
        className="w-full max-w-full justify-between border-none rounded-2xl"
        titleClassName="text-title font-semibold"
        chartClassName="mt-10"
        chart={
            <div className="h-12 w-20 @[16.25rem]:h-12 @[16.25rem]:w-18 @xs:h-12 @xs:w-18">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart barSize={6} barGap={5} data={conventionRateData}>
                  <Bar
                    dataKey="sale"
                    fill={deals?.growthPercentage > 0 ? '#29ccb1' : 'orange'}
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
            {deals?.growthPercentage > 0 ? (
                <UpIcon className="me-1 size-5" />
            ) : (
                <DownIcon className="me-1 size-5 text-orange-400" />
            )}
            <span className="text-gray-700 font-bold dark:text-gray-200">
              {Number(deals?.growthPercentage || 0).toFixed(2)}%
            </span>  
          </Text>
            <span className="mr-2">{t("text-last-month")}</span>
        </Text>
      </MetricCard>
      <MetricCard
        title={t("text-deals-in-pipeline")}
        metric={dealPipelineSummary}
        metricClassName="crm-card-value dark:text-gray-300 pt-4 pb-1"
        className="w-full max-w-full justify-between border-none rounded-2xl"
        titleClassName="text-title font-semibold"
        chartClassName="mt-10">
      </MetricCard>
      <MetricCard
        title={t("text-revenue-lost")}
        metric={lostRevenue?.revenueLostThisMonth}
        metricClassName="crm-card-value dark:text-gray-300 pt-4 pb-1"
        className="w-full max-w-full justify-between border-none rounded-2xl"
        titleClassName="text-title font-semibold"
        chartClassName="mt-10"
        chart={
            <div className="h-12 w-20 @[16.25rem]:h-12 @[16.25rem]:w-18 @xs:h-12 @xs:w-18">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart barSize={6} barGap={5} data={conventionRateData}>
                  <Bar
                    dataKey="sale"
                    fill={lostRevenue?.growthPercentage > 0 ? '#29ccb1' : 'orange'}
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
            {revenue?.growthPercentage > 0 ? (
                <UpIcon className="me-1 size-5" />
            ) : (
                <DownIcon className="me-1 size-5 text-orange-400" />
            )}
            <span className="text-gray-700 font-bold dark:text-gray-200">{lostRevenue?.growthPercentage}%</span>
            </Text>
            <span className="mr-2">{t("text-last-month")}</span>
        </Text>
      </MetricCard>
    </div>
  )
}
