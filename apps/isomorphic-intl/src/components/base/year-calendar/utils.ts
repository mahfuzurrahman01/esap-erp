interface DateData {
  date: Date // UTC date
  localDate: string // Formatted local date string
  dayName: string // Localized day name
  monthName: string // Localized month name
  isDisabled: boolean
  isWeekend: boolean
  isToday: boolean
  isSelected: boolean
  isCurrentMonth: boolean
  weekNumber: number // ISO week number
}

interface CalendarOptions {
  year?: number
  month?: number
  selectedDate?: Date
  firstDayOfWeek?: Day
  weekends?: string[]
  locale?: string // e.g., 'en-US', 'fr-FR', 'ja-JP'
  timezone?: string // e.g., 'America/New_York', 'Asia/Tokyo'
}

export type Day =
  | "Monday"
  | "Sunday"
  | "Saturday"
  | "Friday"
  | "Thursday"
  | "Wednesday"
  | "Tuesday"

export type Month =
  | "January"
  | "February"
  | "March"
  | "April"
  | "May"
  | "June"
  | "July"
  | "August"
  | "September"
  | "October"
  | "November"
  | "December"

export type YearData = MonthData[]

export type MonthData = {
  monthName: string
  data: DateData[]
}

class CalendarGenerator {
  private static readonly MONTHS_IN_YEAR = 12

  static generateMonthData(options: CalendarOptions = {}): MonthData {
    const {
      locale = Intl.DateTimeFormat().resolvedOptions().locale,
      timezone = Intl.DateTimeFormat().resolvedOptions().timeZone,
      firstDayOfWeek = "Monday",
      weekends = ["Saturday", "Sunday"],
    } = options

    // Get current date in UTC
    const now = new Date()
    const utcNow = new Date(
      Date.UTC(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate(),
        now.getUTCHours(),
        now.getUTCMinutes(),
        now.getUTCSeconds()
      )
    )

    // Set up year and month (default to current UTC date if not provided)
    const year = options.year ?? utcNow.getUTCFullYear()
    const month = options.month ?? utcNow.getUTCMonth()

    // Create UTC dates for first and last day of month
    const firstDayOfMonth = new Date(Date.UTC(year, month, 1))

    const result: DateData[] = []
    let start = new Date(firstDayOfMonth)
    start.setUTCDate(
      start.getUTCDate() -
        this.getFirstDayOffset(firstDayOfMonth.getUTCDay(), firstDayOfWeek)
    )

    // Date formatting options
    const dateFormatter = new Intl.DateTimeFormat(locale, {
      timeZone: timezone,
      year: "numeric",
      month: "long",
      day: "numeric",
    })

    const dayFormatter = new Intl.DateTimeFormat(locale, {
      timeZone: timezone,
      weekday: "long",
    })

    const monthFormatter = new Intl.DateTimeFormat(locale, {
      timeZone: timezone,
      month: "long",
    })

    // Generate 6 weeks of dates
    for (let i = 0; i < 42; i++) {
      const currentDate = new Date(
        Date.UTC(
          start.getUTCFullYear(),
          start.getUTCMonth(),
          start.getUTCDate() + i
        )
      )

      const dateData: DateData = {
        date: currentDate,
        localDate: dateFormatter.format(currentDate),
        dayName: dayFormatter.format(currentDate),
        monthName: monthFormatter.format(currentDate),
        isDisabled: currentDate.getUTCMonth() !== month,
        isWeekend: this.isWeekend(currentDate, weekends, locale, timezone),
        isToday: this.isSameDate(currentDate, utcNow),
        isSelected: options.selectedDate
          ? this.isSameDate(currentDate, this.toUTCDate(options.selectedDate))
          : false,
        isCurrentMonth: currentDate.getUTCMonth() === month,
        weekNumber: this.getISOWeek(currentDate),
      }

      result.push(dateData)
    }

    // Get month name for the current month
    const monthName = monthFormatter.format(firstDayOfMonth)

    return {
      monthName,
      data: result,
    }
  }

  static generateYearData(options: CalendarOptions = {}): YearData {
    const {
      locale = Intl.DateTimeFormat().resolvedOptions().locale,
      timezone = Intl.DateTimeFormat().resolvedOptions().timeZone,
    } = options

    const monthFormatter = new Intl.DateTimeFormat(locale, {
      timeZone: timezone,
      month: "long",
    })

    const yearData: MonthData[] = []
    const baseOptions = { ...options }

    for (let month = 0; month < this.MONTHS_IN_YEAR; month++) {
      const monthDate = new Date(
        Date.UTC(options.year ?? new Date().getUTCFullYear(), month, 1)
      )
      yearData.push({
        monthName: monthFormatter.format(monthDate),
        data: this.generateMonthData({
          ...baseOptions,
          month,
        }).data,
      })
    }

    return yearData
  }

  private static getFirstDayOffset(
    dayIndex: number,
    firstDayOfWeek: string
  ): number {
    const mondayOffset = firstDayOfWeek === "Monday" ? -1 : 0
    return (dayIndex + mondayOffset + 7) % 7
  }

  private static isWeekend(
    date: Date,
    weekends: string[],
    locale: string,
    timezone: string
  ): boolean {
    const dayName = new Intl.DateTimeFormat(locale, {
      timeZone: timezone,
      weekday: "long",
    }).format(date)
    return weekends.includes(dayName)
  }

  private static isSameDate(date1: Date, date2: Date): boolean {
    return (
      date1.getUTCDate() === date2.getUTCDate() &&
      date1.getUTCMonth() === date2.getUTCMonth() &&
      date1.getUTCFullYear() === date2.getUTCFullYear()
    )
  }

  private static toUTCDate(date: Date): Date {
    return new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
    )
  }

  private static getISOWeek(date: Date): number {
    const target = new Date(date.valueOf())
    const dayNr = (date.getUTCDay() + 6) % 7
    target.setUTCDate(target.getUTCDate() - dayNr + 3)
    const firstThursday = target.valueOf()
    target.setUTCMonth(0, 1)
    if (target.getUTCDay() !== 4) {
      target.setUTCMonth(0, 1 + ((4 - target.getUTCDay() + 7) % 7))
    }
    return 1 + Math.ceil((firstThursday - target.valueOf()) / 604800000)
  }
}

export default CalendarGenerator
