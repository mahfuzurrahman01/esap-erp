"use client"

import { useQuery } from "@tanstack/react-query"

import { createQueryKeys } from "@/server/service/query-config"

import { CashFlowService } from "../service/cash-flow.service"
import { CashFlowQueryOptions, CashFlowResponse } from "../types/cash-flow"

const CASH_FLOW_KEYS = createQueryKeys("cash-flow")

export function useCashFlow(options: CashFlowQueryOptions) {
  const { data, isLoading, isError, isFetching, refetch, error } = useQuery<
    CashFlowResponse,
    Error
  >({
    queryKey: [CASH_FLOW_KEYS.all, options],
    queryFn: () => CashFlowService.get(options),
    enabled: Boolean(options.companyId),
  })

  return {
    data: data?.cashFlow,
    isLoading,
    isError,
    isFetching,
    refetch,
    error,
  }
}
