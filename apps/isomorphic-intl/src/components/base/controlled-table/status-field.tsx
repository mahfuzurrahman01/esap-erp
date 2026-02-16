import cn from "@core/utils/class-names"
import { Select, type SelectOption, type SelectProps } from "rizzui"

export default function StatusField({
  placeholder = "Select status",
  dropdownClassName,
  ...props
}: SelectProps<SelectOption>) {
  return (
    <Select
      inPortal={false}
      placeholder={placeholder}
      selectClassName="h-10 border-gray-500/20 ring-0 placeholder:text-gray-500 dark:placeholder:text-gray-600 min-w-[150px]"
      dropdownClassName={cn(
        "p-1.5 !z-0 dark:bg-paper border-gray-500/20",
        dropdownClassName
      )}
      optionClassName="h-10 hover:bg-gray-500/[8%] data-[selected]:bg-gray-500/[8%]"
      {...props}
    />
  )
}
