import { MonthData } from "@/components/base/year-calendar/utils"
import { LeaveStats } from "@/types/hrms/attendance-and-leave/common.types"
import { cn } from "@/utils/cn"

type Props = {
  month: MonthData
  hideOtherMonths?: boolean
  className?: string
  leaveData?: LeaveStats[]
}

const CalendarMonth = ({
  month,
  hideOtherMonths = false,
  className,
  leaveData,
}: Props) => {
  const getDayClassName = (day: any) => {
    const isLeaveDay = leaveData?.some((leave) => {
      const leaveStart = new Date(leave.dateFrom)
      const leaveEnd = new Date(leave.dateTo)

      // Set hours to 0 for accurate date comparison
      const currentDate = new Date(day.date)
      currentDate.setHours(0, 0, 0, 0)
      leaveStart.setHours(0, 0, 0, 0)
      leaveEnd.setHours(0, 0, 0, 0)

      // Include both start and end dates in comparison
      return currentDate >= leaveStart && currentDate <= leaveEnd
    })

    return cn(
      "aspect-square h-8 w-8 flex items-center justify-center text-center text-slate-500 dark:text-slate-300 opacity-100 visible",
      {
        "text-red dark:text-red": day.isWeekend,
        "text-slate-300 dark:text-slate-700":
          !day.isCurrentMonth && !hideOtherMonths,
        "rounded-full border-2 border-primary":
          day.isToday && day.isCurrentMonth,
        "opacity-0 invisible": hideOtherMonths && !day.isCurrentMonth,
        "bg-primary/20": isLeaveDay && day.isCurrentMonth,
      }
    )
  }
  return (
    <div className={cn("p-4", className)}>
      <h3 className="mb-5 text-center font-semibold">{month.monthName}</h3>
      <div className="grid grid-cols-7">
        {/* Week day headers */}
        {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((day) => (
          <div
            key={day}
            className="text-center text-sm font-semibold text-slate-800 dark:text-slate-200">
            {day}
          </div>
        ))}

        {/* Calendar days */}
        {month.data.map((day, dayIndex) => (
          <div key={dayIndex} className="flex items-center justify-center">
            <span
              className={getDayClassName(day)}
              data-day={day.date.getUTCDate()}
              data-month={day.date.getUTCMonth()}
              data-year={day.date.getUTCFullYear()}>
              {day.date.getUTCDate()}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CalendarMonth
