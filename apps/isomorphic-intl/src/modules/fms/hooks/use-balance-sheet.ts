"use client"

import { keepPreviousData, useQuery } from "@tanstack/react-query"

import { createQueryKeys } from "@/server/service/query-config"

import { BalanceSheetService } from "../service/balance-sheet.service"
import {
  BalanceSheetQueryOptions,
  BalanceSheetResponse,
} from "../types/balance-sheet"

const BALANCE_SHEET_KEYS = createQueryKeys("balance-sheet")

export function useBalanceSheet(options?: Partial<BalanceSheetQueryOptions>) {
  const queryKey = [BALANCE_SHEET_KEYS.all, options]

  return useQuery<BalanceSheetResponse, Error>({
    queryKey,
    queryFn: () => BalanceSheetService.all(options || {}),
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}
