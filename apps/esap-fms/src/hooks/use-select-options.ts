"use client"

import { useMemo } from "react"

type SelectOption = {
  value: number | string
  label: string
  code?: string
  startDate?: string
  endDate?: string
}

type DataItem = {
  id?: number | string | undefined
  [key: string]: any
}

export function useSelectOptions<T extends DataItem>(
  data: T[] | undefined,
  labelKey: keyof T
): SelectOption[] {
  return useMemo(() => {
    return (
      data?.map((item) => ({
        value: item.id ?? 0,
        label: String(item[labelKey] ?? ""),
        code: String(item?.countryCode ?? ""),
        startDate: String(item?.startDate ?? ""),
        endDate: String(item?.endDate ?? ""),
      })) ?? []
    )
  }, [data, labelKey])
}

export function useSelectOptionsWithApproval<T extends DataItem>(
  data: T[] | undefined,
  labelKey: keyof T
): SelectOption[] {
  return useMemo(() => {
    return (
      data
        ?.filter((item) => item.approvalStatus === " approved")
        ?.map((item) => ({
          value: item.id ?? 0,
          label: String(item[labelKey] ?? ""),
        })) ?? []
    )
  }, [data, labelKey])
}
