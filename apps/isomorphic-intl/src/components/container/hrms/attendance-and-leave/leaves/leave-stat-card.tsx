import { useState } from "react"

import { useTranslations } from "next-intl"
import { PiCalendarCheck, PiCaretDownBold } from "react-icons/pi"
import { ActionIcon, Popover, Text, Title, cn } from "rizzui"

import Box from "@/components/ui/box"
import { LeaveStats } from "@/types/hrms/attendance-and-leave/common.types"
import { LeaveType } from "@/types/hrms/attendance-and-leave/leave-type.types"

type Props = {
  type: LeaveType
  leaves: LeaveStats[]
}

const LeaveStatisticCard = ({ type, leaves }: Props) => {
  const t = useTranslations("form")
  const [isOpen, setIsOpen] = useState(false)

  // Calculate total days - including both start and end dates
  const totalDays = leaves.reduce((acc, leave) => {
    const days =
      Math.ceil(
        (new Date(leave.dateTo).getTime() -
          new Date(leave.dateFrom).getTime()) /
          (1000 * 60 * 60 * 24)
      ) + 1 // Add 1 to include both start and end dates
    return acc + days
  }, 0)

  const LeaveItem = ({ leave }: { leave: LeaveStats }) => (
    <div className="flex items-center justify-between border-b border-dashed border-gray-200 py-3 last:border-0 dark:border-gray-700">
      <div className="flex flex-col gap-1">
        <Text className="font-medium text-gray-900 dark:text-gray-100">
          {leave.offDayName}
        </Text>
        <Text className="text-xs text-gray-500">
          {new Date(leave.dateFrom).toLocaleDateString()} -{" "}
          {new Date(leave.dateTo).toLocaleDateString()}
        </Text>
      </div>
      <Text className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-400">
        {Math.ceil(
          (new Date(leave.dateTo).getTime() -
            new Date(leave.dateFrom).getTime()) /
            (1000 * 60 * 60 * 24)
        ) + 1}{" "}
        {/* Add 1 here as well */}
        {t("form-days")}
      </Text>
    </div>
  )

  return (
    <Box className="rounded-xl bg-gray-0 p-5 shadow-sm dark:bg-gray-900">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary dark:bg-primary/20">
            <PiCalendarCheck className="h-5 w-5" />
          </div>
          <div>
            <Title as="h3" className="text-base font-semibold">
              {type.leaveTypeName}
            </Title>
            <Text className="mt-0.5 text-sm text-gray-500">
              {totalDays} {t("form-days")} {t("form-total")}
            </Text>
          </div>
        </div>

        <Popover isOpen={isOpen} setIsOpen={setIsOpen} placement="bottom-end">
          <Popover.Trigger>
            <ActionIcon
              variant="outline"
              rounded="full"
              className="h-7 w-7 border-gray-500">
              <PiCaretDownBold
                className={cn(
                  "h-3.5 w-3.5 transition-transform duration-200",
                  isOpen && "rotate-180"
                )}
              />
            </ActionIcon>
          </Popover.Trigger>
          <Popover.Content className="card-shadow relative mt-3 w-1/5 overflow-hidden rounded-lg border-transparent bg-paper before:absolute before:-end-4 before:-top-4 before:size-[80px] before:rounded-full before:bg-blue/50 before:blur-[80px] after:absolute after:-bottom-4 after:-start-4 after:size-[80px] after:rounded-full after:bg-red/50 after:blur-[80px] dark:bg-paper dark:text-title">
            <Title as="h4" className="mb-4 text-sm font-semibold">
              {t("form-leaveDetails")}
            </Title>
            <div className="space-y-1">
              {leaves.map((leave) => (
                <LeaveItem key={leave.id} leave={leave} />
              ))}
            </div>
          </Popover.Content>
        </Popover>
      </div>
    </Box>
  )
}

export default LeaveStatisticCard
