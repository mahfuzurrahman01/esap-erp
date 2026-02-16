"use client"

import { keepPreviousData, useQuery } from "@tanstack/react-query"

import { salesReport } from "@/modules/crm/service/sales-report.service"
import { createQueryKeys } from "@/server/service/query-config"

import {
  SalesReportPaginator,
  SalesReportQueryOptions,
} from "../types/sales-report"

export const SALESREPORT_KEYS = createQueryKeys("SalesReport")

export function useSalesReportList(options?: Partial<SalesReportQueryOptions>) {
  const queryKey = [SALESREPORT_KEYS.all, options]

  return useQuery<SalesReportPaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return salesReport.all(Object.assign({}, queryKey[1], pageParam))
    },
    placeholderData: keepPreviousData,
    throwOnError: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}
