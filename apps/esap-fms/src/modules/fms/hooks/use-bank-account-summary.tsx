"use client"
import {
  keepPreviousData,
  useQuery,
} from "@tanstack/react-query"
import { createQueryKeys } from "@/server/service/query-config"
import { bankAccountSummaryService } from "../service/bank-account-summary.service"
import { BankAccountSummaryPaginator, BankAccountSummaryQueryOptions } from "../types/bank-account-summary"

const BANK_ACCOUNT_SUMMARY = createQueryKeys("bankAccountSummary")

export function useBankAccountSummaryList(options?: Partial<BankAccountSummaryQueryOptions>) {
  const queryKey = [BANK_ACCOUNT_SUMMARY.all, options]

  return useQuery<BankAccountSummaryPaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return bankAccountSummaryService.all(Object.assign({}, queryKey[1], pageParam))
    },
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}
