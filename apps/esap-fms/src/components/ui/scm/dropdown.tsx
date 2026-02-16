"use client"

import { BsChevronDown } from "react-icons/bs"
import { Dropdown as RizzDropdown } from "rizzui"
import { tv } from "tailwind-variants"

const dropdownStyles = tv({
  slots: {
    wrapper: "relative",
    trigger: [
      "inline-flex items-center justify-between",
      "px-4 py-2 rounded-full",
      "bg-paper dark:bg-paper-dark",
      "text-sm font-medium text-title",
      "shadow-lg hover:bg-paper dark:hover:bg-paper-dark",
      "focus:outline-none focus-visible:ring-2",
      "min-w-[100px]",
    ],
    content: [
      "z-50 w-8 min-w-[8rem]",
      "rounded-lg p-1 mt-1",
      "bg-paper dark:bg-paper-dark dropdown-gr card-shadow",
      "rounded-md border border-transparent",
    ],
    item: [
      "relative flex cursor-pointer",
      "select-none items-center",
      "rounded-md px-2 py-1.5",
      "text-sm text-title outline-none",
      "transition-colors",
      "hover:bg-gray-500/20 dark:hover:bg-gray-800/20",
      "focus:bg-paper",
    ],
    chevron: [
      "ml-2 h-4 w-4",
      "text-title",
      "transition-transform duration-200",
      "group-data-[state=open]:rotate-180",
    ],
  },
})

export interface DropdownProps {
  value: string
  onChange: (value: string) => void
  options: Array<{
    label: string
    value: string
  }>
  className?: string
}

export default function Dropdown({
  value,
  onChange,
  options,
  className,
}: DropdownProps) {
  const styles = dropdownStyles()

  return (
    <RizzDropdown className={styles.wrapper()}>
      <RizzDropdown.Trigger className={`${styles.trigger()} ${className}`}>
        {options.find((option) => option.value === value)?.label || value}
        <BsChevronDown className={styles.chevron()} />
      </RizzDropdown.Trigger>

      <RizzDropdown.Menu className={styles.content()}>
        {options.map((option) => (
          <RizzDropdown.Item
            key={option.value}
            className={styles.item()}
            onClick={() => onChange(option.value)}>
            {option.label}
          </RizzDropdown.Item>
        ))}
      </RizzDropdown.Menu>
    </RizzDropdown>
  )
}
