import { useMemo } from "react"

import { TIMEZONE_LIST } from "@/utils/constants"

export const useTimezoneOptions = () => {
  const timezoneOptions: { label: string; value: string }[] = useMemo(
    () =>
      TIMEZONE_LIST.map(({ value, text }) => ({
        label: text,
        value: text,
      })),
    []
  )

  return { timezoneOptions }
}
