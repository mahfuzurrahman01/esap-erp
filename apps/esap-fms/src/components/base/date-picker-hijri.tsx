"use client"

import { useState } from "react"

import arabic from "react-date-object/calendars/arabic"
import arabic_ar from "react-date-object/locales/arabic_ar"
import DatePicker from "react-multi-date-picker"
import "react-multi-date-picker/styles/backgrounds/bg-dark.css"
import { InputProps } from "rizzui"
import { tv } from "tailwind-variants"

import { CalendarIcon } from "@/components/icons"
import { Input } from "@/components/ui"
import { cn } from "@/utils/cn"

const datePickerStyles = tv({
  slots: {
    wrapper: "flex relative",
    calendar: [
      // Calendar container
      "!shadow-lg !border !border-gray-100 !rounded-md !bg-white",
      // Custom styles for the calendar
      "[&_.rmdp-wrapper]:!bg-white",
      "[&_.rmdp-header-values]:!text-gray-800",
      "[&_.rmdp-week-day]:!text-gray-500",
      "[&_.rmdp-day]:!text-gray-700",
      "[&_.rmdp-day.rmdp-selected]:!bg-primary",
      "[&_.rmdp-day.rmdp-selected]:!text-white",
      "[&_.rmdp-day:not(.rmdp-disabled):hover]:!bg-gray-100",
      "[&_.rmdp-arrow-container]:!bg-gray-100/50",
      "[&_.rmdp-arrow-container]:!hover:bg-gray-200",
    ],
    input: "shadow-none border-gray-500/20 text-title ring-0 rounded-lg",
    label: "text-title",
    icon: "h-5 w-5 text-gray-500",
  },
  variants: {
    disabled: {
      true: {
        input:
          "!border-transparent !bg-gray-500/10 cursor-not-allowed hover:!border-transparent",
        icon: "text-gray-400",
        wrapper: "opacity-75 cursor-not-allowed",
      },
    },
  },
})

export type HijriDatePickerProps = {
  inputProps?: InputProps
  defaultDate?: Date
  selected?: Date | null
  onChange?: (date: Date | null) => void
  disabled?: boolean
  className?: string
}

export const DatePickerHijri = ({
  inputProps,
  selected,
  onChange,
  disabled = false,
  className,
}: HijriDatePickerProps) => {
  const [, setIsOpen] = useState(false)
  const styles = datePickerStyles({ disabled })

  const handleChange = (date: any) => {
    if (onChange) {
      // Convert to standard JavaScript Date
      const gregorianDate = date?.convert?.()?.toDate?.() || null
      onChange(gregorianDate)
    }
    setIsOpen(false)
  }

  const formatInputValue = (date: any) => {
    if (!date) return ""
    return `${date.day} ${date.month.name} ${date.year}`
  }

  return (
    <div className={cn(styles.wrapper(), className)}>
      <DatePicker
        value={selected}
        onChange={handleChange}
        calendar={arabic}
        locale={arabic_ar}
        disabled={disabled}
        format="DD MMMM YYYY"
        inputClass={cn(
          styles.input(),
          "w-full h-10 px-3 py-2 text-sm focus:outline-none"
        )}
        containerClassName="w-full"
        render={(value, openCalendar) => (
          <Input
            labelClassName={styles.label()}
            inputClassName={styles.input()}
            suffix={<CalendarIcon className={styles.icon()} />}
            value={value}
            placeholder={inputProps?.placeholder || "اختر التاريخ"}
            readOnly
            onClick={() => !disabled && openCalendar()}
            disabled={disabled}
            {...inputProps}
          />
        )}
        calendarPosition="bottom-left"
        className="bg-red-500"
        onOpen={() => setIsOpen(true)}
        onClose={() => setIsOpen(false)}
      />
    </div>
  )
}
