"use client"

import { Flex } from "rizzui/flex"
import { Text, Title } from "rizzui/typography"

import AmountIcon from "@/components/icons/scm/dashboard/amount-icon"
import DownArrowIcon from "@/components/icons/scm/dashboard/down-arrow"
import IndustryIcon from "@/components/icons/scm/dashboard/industry-icon"
import UpArrowIcon from "@/components/icons/scm/dashboard/up-arrow"
import UpcomingIcon from "@/components/icons/scm/dashboard/upcoming-icon"
import Box from "@/components/ui/box"
import { cn } from "@/utils/cn"

export type StatCardProps = {
  className?: string
  statItem: any
  iconClassName?: string
}

export default function ReportCardAnalytics({
  className,
  statItem,
  iconClassName,
}: StatCardProps) {
  const { title, quantity, increased, percentage } = statItem

  return (
    <Box className={cn(`relative space-y-4 !rounded-2xl p-5 !shadow-xl`, className)}>
      <div className={cn("size-4", iconClassName)}>
        {title === "Products" ? (
          <AmountIcon />
        ) : title === "Requisitions" ? (
          <IndustryIcon />
        ) : title === "Return Orders" ? (
          <UpcomingIcon />
        ) : null}
      </div>
      <Flex justify="between" align="center" className="pb-2">
        <Text className="font-semibold text-title">{title}</Text>
      </Flex>

      <Flex align="center" gap="2" className="pb-2">
        <Title className="text-3xl">{quantity}</Title>

        {increased ? (
          <UpArrowIcon className="size-3" />
        ) : (
          <DownArrowIcon className="size-3" />
        )}
      </Flex>
      <div className="pb-2">
        <strong className="text-title">{percentage}%</strong>
      </div>
    </Box>
  )
}
