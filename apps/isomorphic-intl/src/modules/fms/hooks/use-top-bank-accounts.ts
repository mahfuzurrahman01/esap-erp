"use client"

import { keepPreviousData, useQuery } from "@tanstack/react-query"

import { createQueryKeys } from "@/server/service/query-config"

import { TopBankAccountService } from "../service/top-bank-account.service"
import { TopBankAccountList, TopBankAccountQueryOptions } from "../types"

const TOP_BANK_ACCOUNTS_KEYS = createQueryKeys("top-bank-accounts")

export function useTopBankAccounts(
  options?: Partial<TopBankAccountQueryOptions>
) {
  const queryKey = [TOP_BANK_ACCOUNTS_KEYS.all, options]

  return useQuery<TopBankAccountList, Error>({
    queryKey,
    queryFn: async ({ queryKey }) => {
      const [, params] = queryKey
      const response = await TopBankAccountService.all(
        params as Partial<TopBankAccountQueryOptions>
      )
      return response
    },
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}
