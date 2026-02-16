"use client"

import { useState } from "react"

import cn from "@core/utils/class-names"
import { Box, Flex, Title } from "rizzui"

import { useDashboardTopUserReport } from "@/modules/crm/hooks/use-dashboard-reports"
import UserInfo from "./user-info"
import { useTranslations } from "next-intl"
import Image from "next/image"
import strokeGreen from "@public/auth/stroke-green.svg"
import strokePurple from "@public/auth/stroke-purple.svg"
import strokeYellow from "@public/auth/stroke-yellow.svg"
import Select from "./select"
import { Skeleton } from "@/components/ui"

const options = [
  { label: "Daily", value: "Daily" },
  { label: "Monthly", value: "Monthly" },
  { label: "Yearly", value: "Yearly" },
]

const timePeriodMapping: any = {
  Daily: { current: "countToday", previous: "countYesterday", label: "yesterday" },
  Monthly: { current: "countThisMonth", previous: "countPreviousMonth", label: "last month" },
  Yearly: { current: "countThisYear", previous: "countPreviousYear", label: "last Year" },
}
const cardImages = [strokeGreen, strokePurple, strokeYellow]
export default function CRMStats({ className }: { className?: string }) {
  const t = useTranslations("crm")
  const { data: userReport, isLoading }: any = useDashboardTopUserReport()
  const leadReports = userReport?.data?.leadReports || []

  const [value, setValue] = useState("Daily")
  const timePeriod = timePeriodMapping[value]

  const calculateProgress = (current: number, previous: number) => {
    if (!previous) return 0
    return ((current - previous) / previous) * 100
  }


  const renderCard = (report: any, index: number) => {
    if (!report) return null

    const currentCount = report[timePeriod.current] || 0
    const previousCount = report[timePeriod.previous] || 0
    const progressPercentage = calculateProgress(currentCount, previousCount)
    const progressPercentageValue = progressPercentage > 0 ? progressPercentage : currentCount

    return (
      <Box
        key={index}
        className={cn(
          "space-y-4 rounded-lg bg-white p-5 dark:bg-gray-700 dark:border-gray-700",
          className
        )}
      >
        <UserInfo id={leadReports[index]?.userId} />
        {/* {leadReports[index].userId}  */}
        <div
          className="relative w-full"
          style={{
            clipPath: `inset(0 ${100 - progressPercentageValue}% 0 0)`,
          }}
        >
          <Image
          src={cardImages[index]}
          alt="Logo"
          height={96}
          priority
          className="items-center object-cover text-center"
        />
        </div>

        <Flex align="end" gap="2">
          <Title className="font-barlow text-3xl font-bold leading-none">
            {currentCount}
          </Title>
        </Flex>

        <Box>
          <span className="font-semibold text-title">{progressPercentage.toFixed(0)}%</span> <span className="font-normal text-gray-500">{timePeriod.label}</span>
        </Box>
      </Box>
    )
  }

  const renderSkeletonLoader = () => {
    return Array.from({ length: 3 }).map((_, index) => (
      <Box
        key={index}
        className="space-y-4 rounded-lg bg-white p-5 dark:bg-gray-700 dark:border-gray-700"
      >
        <Skeleton className="h-6 w-32 rounded dark:bg-gray-600" />
        <Skeleton className="h-20 w-full rounded dark:bg-gray-600" />
        <Skeleton className="h-8 w-16 rounded dark:bg-gray-600" />
        <Skeleton className="h-4 w-24 rounded dark:bg-gray-600" />
      </Box>
    ));
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <h4 className="py-7 ml-5">{t("text-overview")}</h4>
        <div className="my-4 flex h-10 items-center rounded-md border border-gray-300 bg-white p-2 text-sm dark:bg-gray-700 dark:border-gray-700">
          <label className="mr-1 text-sm font-medium text-gray-500">{t("text-lead-by-owner")}:</label>
          <Select
            value={options.find((option) => option.value === value) || null}
            options={options}
            className="dropdown-border-none flex rounded-lg text-xs"
            styles={{
              control: (baseStyles) => ({
                ...baseStyles,
                padding: "0px",
              }),
              menu: (baseStyles) => ({
                ...baseStyles,
                minWidth: "3.8rem"
              }),
              option: (baseStyles) => ({
                ...baseStyles,
                paddingLeft: "6px",
              }),
            }}
            onChange={(e: any) => setValue(e.value)}
          />
        </div>
      </div>
      <Box className={cn("container", className)}>
        <Box className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {isLoading ? renderSkeletonLoader() : leadReports.map((report: any, index: number) => renderCard(report, index))}
        </Box>
      </Box>
    </>
  )
}