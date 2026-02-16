"use client"
import {
  keepPreviousData,
  useQuery,
} from "@tanstack/react-query"
import { createQueryKeys } from "@/server/service/query-config"
import { monthlyBankTransactionsService } from "../service/monthly-bank-transactions.service"
import { MonthlyBankTransactionsPaginator, MonthlyBankTransactionsQueryOptions } from "../types/monthly-bank-transactions"

const MONTHLY_BANK_TRANSACTIONS = createQueryKeys("monthlyBankTransactions")

export function useMonthlyBankTransactionsList(options?: Partial<MonthlyBankTransactionsQueryOptions>) {
  const queryKey = [MONTHLY_BANK_TRANSACTIONS.all, options]

  return useQuery<MonthlyBankTransactionsPaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return monthlyBankTransactionsService.all(Object.assign({}, queryKey[1], pageParam))
    },
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}
