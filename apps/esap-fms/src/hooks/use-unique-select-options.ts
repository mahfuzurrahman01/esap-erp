import { useMemo } from "react"

type OptionType = {
  value: string | number | boolean | null
  label: string
}

interface IdBasedField {
  id: string | number
  name: string
}

/**
 * Custom hook to create unique select options from an array of data
 * @param data - Array of data objects
 * @param field - Field name to use for options
 * @param config - Optional configuration for handling fields
 * @returns Array of unique select options
 */
export function useUniqueSelectOptions<T extends Record<string, any>>(
  data: T[] | undefined,
  field: string | { id: string; name: string },
  config?: {
    filterEmpty?: boolean
    isBooleanField?: boolean
    booleanLabels?: {
      true?: string
      false?: string
    }
  }
): OptionType[] {
  return useMemo(() => {
    if (!data) return []

    // Handle ID-based fields (like accountType with id and name)
    if (typeof field === "object") {
      const uniqueOptions = new Map<string | number, OptionType>()

      data.forEach((item) => {
        const id = item[field.id]
        // Handle nested object properties using dot notation
        const name = field.name.includes(".")
          ? field.name.split(".").reduce((obj, key) => obj?.[key], item)
          : item[field.name]

        if (id && name) {
          uniqueOptions.set(id, {
            value: id,
            label: name,
          })
        }
      })

      return Array.from(uniqueOptions.values())
    }

    // Handle boolean fields
    if (config?.isBooleanField) {
      return [
        {
          value: true,
          label: config.booleanLabels?.true || "Active",
        },
        {
          value: false,
          label: config.booleanLabels?.false || "Inactive",
        },
      ]
    }

    // Handle string-based fields (like rootType, reportType)
    const uniqueValues = new Set<string>()

    data.forEach((item) => {
      const value = item[field]

      if (
        value &&
        typeof value === "string" &&
        (!config?.filterEmpty || value.trim() !== "")
      ) {
        uniqueValues.add(value.trim())
      }
    })

    return Array.from(uniqueValues).map((value) => ({
      value,
      label: value,
    }))
  }, [data, field, config])
}
