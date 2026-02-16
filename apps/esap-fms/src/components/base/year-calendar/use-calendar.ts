import { useEffect, useState } from "react"

import CalendarGenerator, { Day, YearData } from "./utils"

export type CalendarView = "year" | "month"

export const useYearCalendar = (
  initialYear: number = new Date().getFullYear(),
  firstDayOfWeek: Day = "Monday"
) => {
  const [yearData, setYearData] = useState<YearData | null>(null)
  const [currentYear, setCurrentYear] = useState(initialYear)
  const [view, setView] = useState<CalendarView>("year")

  useEffect(() => {
    const yearData = CalendarGenerator.generateYearData({
      year: currentYear,
      firstDayOfWeek,
    })
    setYearData(yearData)
  }, [currentYear, firstDayOfWeek])

  const nextYear = () => setCurrentYear((prev) => prev + 1)
  const prevYear = () => setCurrentYear((prev) => prev - 1)

  return {
    yearData,
    currentYear,
    nextYear,
    prevYear,
    view,
    setView,
  }
}
