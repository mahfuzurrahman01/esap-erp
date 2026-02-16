"use client"

import { useQuery } from "@tanstack/react-query"

import { createQueryKeys } from "@/server/service/query-config"

import { BudgetSummaryService } from "../service/budget-summary.service"
import {
  BudgetSummaryQueryOptions,
  BudgetSummaryResponse,
} from "../types/budget-summary"

const BUDGET_SUMMARY_KEYS = createQueryKeys("budget-summary")

export function useBudgetSummaryList(
  options?: Partial<BudgetSummaryQueryOptions>
) {
  const queryKey = [BUDGET_SUMMARY_KEYS.all, options]

  return useQuery<BudgetSummaryResponse, Error>({
    queryKey,
    queryFn: ({ queryKey }) => {
      return BudgetSummaryService.all(
        queryKey[1] as Partial<BudgetSummaryQueryOptions>
      )
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}
