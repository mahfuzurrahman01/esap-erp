"use client"

import { keepPreviousData, useQuery } from "@tanstack/react-query"

import { createQueryKeys } from "@/server/service/query-config"

import { GeneralLedgerService } from "../service/general-ledger.service"
import {
  GeneralLedgerQueryOptions,
  GeneralLedgerResponse,
} from "../types/general-ledger"

const GENERAL_LEDGER_KEYS = createQueryKeys("general-ledger")

export function useGeneralLedgerList(
  options?: Partial<GeneralLedgerQueryOptions>
) {
  const queryKey = [GENERAL_LEDGER_KEYS.all, options]

  return useQuery<GeneralLedgerResponse>({
    queryKey,
    queryFn: ({ queryKey }) => {
      return GeneralLedgerService.all(Object.assign({}, queryKey[1]))
    },
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}
