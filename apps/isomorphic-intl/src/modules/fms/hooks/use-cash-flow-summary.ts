"use client"

import { useQuery } from "@tanstack/react-query"

import { createQueryKeys } from "@/server/service/query-config"

import { CashFlowSummaryService } from "../service/cash-flow-summary.service"
import { CashFlowResponse } from "../types/cash-flow-summary"
import { CashFlowQueryOptions } from "../types/cash-flow"

const CASH_FLOW_SUMMARY_KEYS = createQueryKeys("cash-flow-summary")

export function useCashFlowSummary(options?: Partial<CashFlowQueryOptions>) {
  const queryKey = [CASH_FLOW_SUMMARY_KEYS.all, options]

  return useQuery<CashFlowResponse, Error>({
    queryKey,
    queryFn: ({ queryKey }) => {
      return CashFlowSummaryService.all(
        queryKey[1] as Partial<CashFlowQueryOptions>
      )
    },
    enabled: Boolean(options?.companyId),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}