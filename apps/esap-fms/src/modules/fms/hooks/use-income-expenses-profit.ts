"use client"

import { keepPreviousData, useQuery } from "@tanstack/react-query"

import { createQueryKeys } from "@/server/service/query-config"

import { IncomeExpensesProfitService } from "../service/income-expenses-profit.service"
import { IncomeExpensesProfitResponse } from "../types/income-expenses-profit"

const INCOME_EXPENSES_PROFIT_KEYS = createQueryKeys("income-expenses-profit")

export function useIncomeExpensesProfit() {
  const queryKey = [INCOME_EXPENSES_PROFIT_KEYS.all]

  return useQuery<IncomeExpensesProfitResponse, Error>({
    queryKey,
    queryFn: async () => {
      const response = await IncomeExpensesProfitService.all()
      return response
    },
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}
