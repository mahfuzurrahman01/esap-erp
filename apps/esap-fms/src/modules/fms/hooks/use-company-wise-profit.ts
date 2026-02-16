"use client"

import { keepPreviousData, useQuery } from "@tanstack/react-query"

import { createQueryKeys } from "@/server/service/query-config"

import { CompanyWiseProfitService } from "../service/company-wise-profit.service"
import {
  CompanyWiseProfitQueryOptions,
  CompanyWiseProfitResponse,
} from "../types/company-wise-profit"

const COMPANY_WISE_PROFIT_KEYS = createQueryKeys("company-wise-profit")

export function useCompanyWiseProfit(
  query?: Partial<CompanyWiseProfitQueryOptions>
) {
  return useQuery<CompanyWiseProfitResponse, Error>({
    queryKey: [...COMPANY_WISE_PROFIT_KEYS.all, query],
    queryFn: () => CompanyWiseProfitService.all(query),
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}
