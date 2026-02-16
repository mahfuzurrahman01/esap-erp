import { SelectOptionType } from "../types/common.types"

/**
 * Applies menu list styles for scrolling if needed
 * @param optionsLength Number of options
 * @param maxVisible Maximum number of visible options before scrolling
 * @returns Style object for react-select
 */
export function GetMenuListStyles(
  optionsLength: number,
  maxVisible: number = 4
) {
  return optionsLength > maxVisible
    ? {
        menuList: (base: any) => ({
          ...base,
          maxHeight: "160px",
          overflow: "auto",
        }),
      }
    : {}
}

export function WithAddNewOption(
  options: SelectOptionType[],
  addNewLabel?: string
): SelectOptionType[] {
  return [...options, { label: addNewLabel || "Add New", value: 0 }]
}

/**
 * Finds a select option by value
 * @param options Array of select options
 * @param value Value to find
 * @returns Matching select option or formatted option object
 */
export function FindSelectOption(
  options: SelectOptionType[],
  value: any
): SelectOptionType | null {
  // If value is already an option object, return it
  if (
    value &&
    typeof value === "object" &&
    "label" in value &&
    "value" in value
  ) {
    return value
  }

  // If value is a primitive (number/string), find matching option
  const foundOption = options.find((option) => option.value === value)
  if (foundOption) {
    return foundOption
  }

  // Return null if no match found
  return null
}
