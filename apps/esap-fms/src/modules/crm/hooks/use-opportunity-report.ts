"use client"

import { keepPreviousData, useQuery } from "@tanstack/react-query"

import { createQueryKeys } from "@/server/service/query-config"
import { OpportunityReportPaginator, OpportunityReportQueryOptions } from "../types/opportunity-report"
import { opportunityReport } from "../service/opportunity-report.service"

export const OPPORTUNITY_REPORT_KEYS = createQueryKeys("OpportunityReport")

export function useOpportunityReport(options?: Partial<OpportunityReportQueryOptions>) {
  const queryKey = [OPPORTUNITY_REPORT_KEYS.all, options]

  return useQuery<OpportunityReportPaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return opportunityReport.all(Object.assign({}, queryKey[1], pageParam))
    },
    placeholderData: keepPreviousData,
    throwOnError: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}
