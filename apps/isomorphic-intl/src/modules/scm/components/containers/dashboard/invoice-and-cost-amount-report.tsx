"use client";

import React from "react"



import { PiTrendDownBold, PiTrendUpBold } from "react-icons/pi";
import { Flex, Text, Title } from "rizzui";



import { SaleIcon } from "@/components/icons/scm/dashboard/sale-icon";
import SmallChartIcon from "@/components/icons/scm/dashboard/small-chart";
import { UserIcon } from "@/components/icons/scm/dashboard/user-icon";
import Box from "@/components/ui/box";
import { cn } from "@/utils/cn";





export type StatCardProps = {
  className?: string
  statItem: any
}
export default function InvoiceAndCostAmountReport({
  className,
  data,
}: {
  className?: string
  data?: any
}) {
  return (
    <div className={className}>
      <div className="flex flex-col gap-4">
        {data.map((item: any) => (
          <StatCard key={item.sl} statItem={item} />
        ))}
      </div>
    </div>
  )
}

function StatCard({ className, statItem }: StatCardProps) {
  const { title, totalAmount, increased, percentage } = statItem

  return (
    <Box
      className={cn(
        'relative space-y-4 rounded-md p-5',
        title === "Invoice Amount"
          ? 'gradient-lame-light dark:gradient-lame-dark'
          : 'gradient-purple-light-dark dark:gradient-purple-dark',
        className
      )}>
      {title === "Invoice Amount" ? (
        <div className="flex items-center justify-between">
          <SaleIcon />
          <div
            className={`flex items-center font-semibold ${title === "Invoice Amount" ? "text-emerald-900" : "text-purple-900"}`}>
            {increased ? (
              <PiTrendUpBold className="size-3" />
            ) : (
              <PiTrendDownBold className="size-3" />
            )}
            <span className="ml-2 pe-1">{percentage}%</span>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <UserIcon />
          <div
            className={`flex items-center font-semibold ${title === "Invoice Amount" ? "text-emerald-900" : "text-purple-900"}`}>
            {increased ? (
              <PiTrendUpBold className="size-3" />
            ) : (
              <PiTrendDownBold className="size-3" />
            )}
            <span className="ml-2 pe-1">{percentage}%</span>
          </div>
        </div>
      )}
      <Flex justify="between" align="center">
        <Text
          className={`text-lg font-bold ${title === "Invoice Amount" ? "text-emerald-900" : "text-purple-900"}`}>
          {title}
        </Text>
      </Flex>

      <Flex align="end" gap="2" className="pb-5">
        <Title
          className={`text-3xl font-normal leading-none ${title === "Invoice Amount" ? "text-emerald-900" : "text-purple-900"}`}>
          {totalAmount}
        </Title>
        <SmallChartIcon className={`size-14 ${title === "Invoice Amount" ? "text-emerald-900" : "text-purple-900"}`} />
      </Flex>
    </Box>
  )
}