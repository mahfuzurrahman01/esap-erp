"use client"

import { keepPreviousData, useQuery } from "@tanstack/react-query"

import { createQueryKeys } from "@/server/service/query-config"

import { TrialBalanceService } from "../service/trial-balance.service"
import {
  TrialBalanceQueryOptions,
  TrialBalanceResponse,
} from "../types/trial-balance"

const TRIAL_BALANCE_KEYS = createQueryKeys("trial-balance")

export function useTrialBalance(options?: Partial<TrialBalanceQueryOptions>) {
  const queryKey = [TRIAL_BALANCE_KEYS.all, options]

  return useQuery<TrialBalanceResponse, Error>({
    queryKey,
    queryFn: () => TrialBalanceService.all(options || {}),
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}