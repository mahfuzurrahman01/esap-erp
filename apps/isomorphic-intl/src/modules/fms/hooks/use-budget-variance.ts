"use client"

import { useQuery } from "@tanstack/react-query"

import { createQueryKeys } from "@/server/service/query-config"

import { BudgetVarianceService } from "../service/budget-variance.service"
import {
  BudgetVarianceQueryOptions,
  BudgetVarianceResponse,
} from "../types/budget-variance"

const BUDGET_VARIANCE_KEYS = createQueryKeys("budget-variance")

export function useBudgetVariance(
  params: Partial<BudgetVarianceQueryOptions> = {}
) {
  return useQuery<BudgetVarianceResponse, Error>({
    queryKey: [BUDGET_VARIANCE_KEYS.all, params],
    queryFn: () => BudgetVarianceService.get(params),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}
