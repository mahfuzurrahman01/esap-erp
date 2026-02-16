"use client"

import { keepPreviousData, useQuery } from "@tanstack/react-query"

import { createQueryKeys } from "@/server/service/query-config"

import { ProfitAndLossService } from "../service/profit-and-loss.service"
import { ProfitAndLossQueryOptions, ProfitAndLossResponse } from "../types"

const PROFIT_AND_LOSS_KEYS = createQueryKeys("profit-and-loss")

export function useProfitAndLoss(options?: Partial<ProfitAndLossQueryOptions>) {
  const queryKey = [PROFIT_AND_LOSS_KEYS.all, options]

  return useQuery<ProfitAndLossResponse, Error>({
    queryKey,
    queryFn: () => ProfitAndLossService.all(options || {}),
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}
