"use client"

import cn from "@core/utils/class-names"
import { formatNumberWithCommas } from "@core/utils/format-number"
import { Box, Flex, Progressbar, Text } from "rizzui"

import {
  CrmStatType,
} from "@/data/crm/crm-dashboard-data"
import { useDashboardSummaryList } from "@/modules/crm/hooks/use-dashboard-reports"

import AppList from "./used-software"
import UserList from "./user-card-list"
import { useTranslations } from "next-intl"

export type StatCardProps = {
  className?: string
  statItem: CrmStatType
  summaryData: any
}

export const crmStatData: any[] = [
  {
    title: "Total Sales",
    customerKey: "totalSalesInTable",
    previousMonthKey: "totalSalesPreviousMonth",
    thisMonthKey: "totalSalesThisMonth",
  },
  {
    title: "Total Tickets",
    customerKey: "totalTicketsInTable",
    previousMonthKey: "totalTicketsPreviousMonth",
    thisMonthKey: "totalTicketsThisMonth",
  },
]

export default function RightSidebar({ className }: { className?: string }) {
  const t = useTranslations("crm")
  const { data: output }: any = useDashboardSummaryList()
  const summaryData = output?.data || {}

  const progressStatData = [
    {
      title: t("text-total-customers"),
      count: summaryData.totalCustomersInTable,
      previousMonthKey: summaryData.totalCustomersPreviousMonth,
      thisMonthKey: summaryData.totalCustomersThisMonth,
    },
    {
      title: t("text-total-leads"),
      count: summaryData.totalLeadsInTable,
      previousMonthKey: summaryData.totalLeadsPreviousMonth,
      thisMonthKey: summaryData.totalLeadsThisMonth,
    },
    {
      title: t("text-total-campaigns"),
      count: summaryData.totalCampaignsInTable,
      previousMonthKey: summaryData.totalCampaignsPreviousMonth,
      thisMonthKey: summaryData.totalCampaignsThisMonth,
    },
  ]

  const calculatePercentageChange = (previous: number, current: number) => {
    if (previous === 0) {
      return current > 0 ? 100 : 0
    }
    return ((current - previous) / previous) * 100
  }

  return (
    <>
      <Box className={cn("container", className)}>
        <Box className="grid grid-cols-2 gap-6">
          {crmStatData.map((stat, index) => {
            return (
              <StatCard
                key={`stat-card-${index}`}
                statItem={stat}
                summaryData={summaryData}
              />
            )
          })}
        </Box>
      </Box>

      <div className="block container @3xl/crm:col-span-full">
        {progressStatData.map((stat) => {
          const percentageChange = calculatePercentageChange(
            stat.previousMonthKey,
            stat.thisMonthKey
          )
          return (
            <div key={stat.title} className="py-3">
              <div className="flex justify-between pb-3">
                <Text className="font-medium text-title">{stat.title}</Text>
                <div className="flex">
                  <p className="text-title mr-1">{stat.count}</p> ({percentageChange > 0 ? percentageChange.toFixed(2) : 0}%)
                </div>
              </div>
              <Progressbar
                value={stat.count}
                barClassName="bg-[#22c55e] text-gray-100"
                className="gap-0"
                trackClassName="crm-dark-progress"
              />
            </div>
          )
        })}
      </div>
      <UserList />
      <AppList />
    </>
  )
}

function StatCard({ className, statItem, summaryData }: any) {
  const t = useTranslations("crm")
  const { title, customerKey, previousMonthKey } = statItem

  const customer = summaryData[customerKey] || 0
  const lastMonth = summaryData[previousMonthKey] || 0

  let percentageChange;
  if (lastMonth === 0) {
    percentageChange = customer > 0 ? "100%" : "N/A";
  } else {
    percentageChange = `${((customer - lastMonth) / lastMonth * 100).toFixed(0)}%`;
  }

  return (
    <div>
      <h5 className="font-medium text-gray-700 pb-5">{title}</h5>
      <Box
        className={cn(
          "space-y-4 rounded-lg bg-[#ffffffc7] p-5 dark:bg-gray-700 dark:border-gray-700",
          className
        )}>
        <Flex align="end" gap="2" className="pt-4">
          <h2 className="font-barlow text-[32px] font-bold leading-none">
            {formatNumberWithCommas(customer)}
          </h2>
        </Flex>

        <Box className="text-title">
          <strong className="text-gray-900 dark:text-gray-100">
            {percentageChange}
          </strong>{" "}
          <span className="text-gray-500">
          {t("text-last-month")}
          </span>
        </Box>
      </Box>
    </div>
  )
}
