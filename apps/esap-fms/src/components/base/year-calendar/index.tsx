"use client"

import { PiCaretLeftBold, PiCaretRightBold } from "react-icons/pi"

import CalendarMonth from "@/components/base/year-calendar/calendar-month"
import { Button } from "@/components/ui"
import { LeaveStats } from "@/types/hrms/attendance-and-leave/common.types"
import { cn } from "@/utils/cn"

import { useYearCalendar } from "./use-calendar"

type Props = {
  leaveData: LeaveStats[]
}

const YearCalendar = ({ leaveData }: Props) => {
  const { yearData, currentYear, nextYear, prevYear } = useYearCalendar()

  if (!yearData) return null

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button onClick={prevYear} variant="text">
            <PiCaretLeftBold size={24} />
          </Button>
          <span className="typography-primary text-lg font-semibold">
            {currentYear}
          </span>
          <Button onClick={nextYear} variant="text">
            <PiCaretRightBold size={24} />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {yearData.map((month, index) => {
          const isLastRow = index >= yearData.length - 3
          const isLastColumn = (index + 1) % 3 === 0

          return (
            <CalendarMonth
              key={index}
              month={month}
              leaveData={leaveData}
              className={cn("divider-color pb-4", {
                "lg:border-b": !isLastRow,
                "lg:border-r": !isLastColumn,
              })}
            />
          )
        })}
      </div>
    </div>
  )
}

export default YearCalendar
