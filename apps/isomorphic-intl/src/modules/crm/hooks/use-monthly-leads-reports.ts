"use client"

import { keepPreviousData, useQuery } from "@tanstack/react-query"

import { createQueryKeys } from "@/server/service/query-config"

import { monthlyLeadsReport } from "../service/monthly-leads-report.service"
import {
  MonthlyLeadsReportPaginator,
  MonthlyLeadsReportQueryOptions,
} from "../types/monthly-leads-report"

export const MONTHLY_LEADS_REPORT_KEYS = createQueryKeys("monthlyLeadsReport")

export function useMonthlyLeadsList(
  options?: Partial<MonthlyLeadsReportQueryOptions>
) {
  const queryKey = [MONTHLY_LEADS_REPORT_KEYS.all, options]

  return useQuery<MonthlyLeadsReportPaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return monthlyLeadsReport.all(Object.assign({}, queryKey[1], pageParam))
    },
    placeholderData: keepPreviousData,
    throwOnError: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}
