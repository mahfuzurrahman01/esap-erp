"use client"

import { cn } from "@/utils/cn"

import { Select } from "../ui"

type Options = {
  value: string
  label: string
}

type DropdownActionProps = {
  options: Options[]
  onChange: (data: string) => void
  className?: string
  dropdownClassName?: string
}

export default function DropdownAction({
  options,
  onChange,
  className,
  dropdownClassName,
}: DropdownActionProps) {
  return (
    <Select
      options={options}
      value={options[0]}
      onChange={(newValue: unknown) => {
        const value = (newValue as Options)?.value
        if (value) onChange(value)
      }}
      className={cn("w-auto", className)}
      containerClassName={cn("p-2 gap-1 grid", dropdownClassName)}
    />
  )
}
