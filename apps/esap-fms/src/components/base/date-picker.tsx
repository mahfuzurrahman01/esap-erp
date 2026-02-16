"use client"

import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

import arabic from "react-date-object/calendars/arabic"
import gregorian from "react-date-object/calendars/gregorian"
import arabic_ar from "react-date-object/locales/arabic_ar"
import en from "react-date-object/locales/gregorian_en"
import { type DatePickerProps as ReactDatePickerProps } from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import HijriDatePicker from "react-multi-date-picker"
import AnalogTimePicker from "react-multi-date-picker/plugins/analog_time_picker"
import "react-multi-date-picker/styles/backgrounds/bg-dark.css"
import { InputProps } from "rizzui"
import { tv } from "tailwind-variants"

import { CalendarIcon } from "@/components/icons"
import { Input } from "@/components/ui"
import { cn } from "@/utils/cn"

const datePickerStyles = tv({
  slots: {
    wrapper:
      "flex [&_.react-datepicker-wrapper]:flex [&_.react-datepicker-wrapper]:w-full",
    calendar: [
      // Calendar container
      "[&.react-datepicker]:shadow-lg",
      "[&.react-datepicker]:border-gray-100",
      "[&.react-datepicker]:rounded-md",
      // Month container padding
      "[&.react-datepicker>div]:pt-5",
      "[&.react-datepicker>div]:pb-3",
      // Prev/Next buttons
      "[&.react-datepicker>button]:items-baseline",
      "[&.react-datepicker>button]:top-7",
      "[&.react-datepicker>button]:border",
      "[&.react-datepicker>button]:border-solid",
      "[&.react-datepicker>button]:border-gray-300",
      "[&.react-datepicker>button]:rounded-md",
      "[&.react-datepicker>button]:h-[22px]",
      "[&.react-datepicker>button]:w-[22px]",
      // Button children
      "[&.react-datepicker>button>span]:top-0",
      "[&.react-datepicker>button>span]:before:border-t-[1.5px]",
      "[&.react-datepicker>button>span]:before:border-r-[1.5px]",
      "[&.react-datepicker>button>span]:before:border-gray-400",
      "[&.react-datepicker>button>span]:before:h-[7px]",
      "[&.react-datepicker>button>span]:before:w-[7px]",
      // Time only
      "[&.react-datepicker--time-only>div]:pr-0",
      "[&.react-datepicker--time-only>div]:w-28",
    ],
    popper:
      "[&>svg]:!fill-white dark:[&>svg]:!fill-gray-100 [&>svg]:!stroke-gray-300 dark:[&>svg]:!stroke-muted !z-[90]",
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

export type DatePickerProps = Omit<
  ReactDatePickerProps,
  "onChange" | "value"
> & {
  inputProps?: InputProps
  isRequired?: boolean
  defaultDate?: Date
  minDate?: Date
  maxDate?: Date
  showTimePicker?: boolean
  placeholderText?: string
  portal?: boolean
  portalTarget?: HTMLElement
  multiple?: boolean
  range?: boolean
  dateSeparator?: string
  multipleRangeSeparator?: string
  onChange?: (date: Date | [Date | null, Date | null] | null) => void
  error?: string
  value?: Date | (Date | null)[] | null | string
}

export function DatePicker({
  inputProps,
  onCalendarOpen,
  onCalendarClose,
  disabled = false,
  minDate,
  maxDate,
  placeholderText,
  showTimePicker = false,
  portal,
  portalTarget,
  multiple = false,
  range = false,
  onChange,
  value,
  isRequired,
  error,
}: DatePickerProps) {
  const [isCalenderOpen, setIsCalenderOpen] = useState(false)
  const handleCalenderOpen = () => setIsCalenderOpen(true)
  const handleCalenderClose = () => setIsCalenderOpen(false)
  const pathname = usePathname()

  const [normalizedMinDate, setNormalizedMinDate] = useState<Date | undefined>(
    minDate
  )

  useEffect(() => {
    if (minDate) {
      const today = new Date()
      const isToday =
        minDate.getDate() === today.getDate() &&
        minDate.getMonth() === today.getMonth() &&
        minDate.getFullYear() === today.getFullYear()

      if (isToday) {
        const startOfToday = new Date(today)
        startOfToday.setHours(0, 0, 0, 0)
        setNormalizedMinDate(startOfToday)
      } else {
        setNormalizedMinDate(minDate)
      }
    } else {
      setNormalizedMinDate(undefined)
    }
  }, [minDate])

  const isArabic = pathname.includes("/ar")

  const styles = datePickerStyles({ disabled })

  return (
    <HijriDatePicker
      plugins={showTimePicker ? [<AnalogTimePicker key="analog-time-picker" />] : []}
      value={value}
      onChange={(date: any) => {
        if (range) {
          const startDate = date?.[0]?.convert?.()?.toDate?.() || null
          const endDate = date?.[1]?.convert?.()?.toDate?.() || null
          onChange?.([startDate, endDate] as [Date | null, Date | null])
        } else {
          const gregorianDate = date?.convert?.()?.toDate?.() || null
          onChange?.(gregorianDate)
        }
      }}
      calendar={isArabic ? arabic : gregorian}
      minDate={normalizedMinDate}
      maxDate={maxDate}
      locale={isArabic ? arabic_ar : en}
      disabled={disabled}
      format={showTimePicker ? "DD MMMM YYYY HH:mm" : "DD MMMM YYYY"}
      multiple={multiple}
      range={range}
      dateSeparator=" - "
      inputClass={cn(
        styles.input(),
        "w-full h-10 px-3 py-2 text-sm focus:outline-none"
      )}
      containerClassName="w-full"
      render={
        <CustomInput
          onFocus={handleCalenderOpen}
          value={value as string}
          onChange={onChange}
          disabled={disabled}
          placeholderText={placeholderText!}
          inputProps={inputProps}
          isRequired={isRequired}
          error={error}
        />
      }
      portalTarget={portalTarget}
      portal={portal}
      calendarPosition="bottom-left"
      zIndex={9999}
      className={styles.calendar()}
      onOpen={onCalendarOpen || handleCalenderOpen}
      onClose={onCalendarClose || handleCalenderClose}
    />
  )
}

function CustomInput({
  onFocus,
  value,
  onChange,
  disabled,
  placeholderText,
  inputProps,
  isRequired,
  error,
}: {
  onFocus: () => void
  value: string
  onChange: any
  disabled: boolean
  placeholderText: string
  inputProps?: InputProps
  isRequired?: boolean
  error?: string
}) {
  const styles = datePickerStyles({ disabled })
  return (
    <Input
      labelClassName={styles.label()}
      inputClassName={styles.input()}
      suffix={
        <div className="flex items-center gap-2">
          {value && !disabled && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                onChange?.(null as any)
              }}
              className="p-1 hover:text-red-500"></button>
          )}
          <CalendarIcon className={styles.icon()} />
        </div>
      }
      isRequired={isRequired}
      value={value}
      onFocus={onFocus}
      onChange={onChange}
      placeholder={placeholderText}
      disabled={disabled}
      error={error}
      {...inputProps}
    />
  )
}
