"use client"

import { DatePicker, DatePickerProps } from "../date-picker"

export default function DateFiled({
  placeholderText = "Select date",
  inputProps,
  ...props
}: DatePickerProps & { onClear?: () => void }) {
  return (
    <div>
      <DatePicker
        // monthsShown={1}
       dateFormat="yyyy-MM-dd"
        placeholderText={placeholderText}
        inputProps={{
          inputClassName:
            "h-10 border-gray-500/20 placeholder:text-gray-500 dark:placeholder:text-gray-600 [&_input]:text-ellipsis",
          ...inputProps,
        }}
        className="w-72"
        {...props}
      />
    </div>
  )
}
