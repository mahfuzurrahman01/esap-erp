"use client"

import { keepPreviousData, useQuery } from "@tanstack/react-query"

import { createQueryKeys } from "@/server/service/query-config"

import { customerGrowthReport } from "../service/customer-growth-report.service"
import {
  CustomerGrowthReportPaginator,
  CustomerGrowthReportQueryOptions,
} from "../types/customer-growth-report"

export const CUSTOMER_GROWTH_REPORT_KEYS = createQueryKeys("customerGrowth")

export function useCustomerGrowthList(
  options?: Partial<CustomerGrowthReportQueryOptions>
) {
  const queryKey = [CUSTOMER_GROWTH_REPORT_KEYS.all, options]

  return useQuery<CustomerGrowthReportPaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return customerGrowthReport.all(Object.assign({}, queryKey[1], pageParam))
    },
    placeholderData: keepPreviousData,
    throwOnError: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}
