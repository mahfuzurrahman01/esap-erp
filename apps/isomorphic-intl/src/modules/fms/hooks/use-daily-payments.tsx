"use client"
import {
  keepPreviousData,
  useQuery,
} from "@tanstack/react-query"
import { createQueryKeys } from "@/server/service/query-config"
import { DailyPaymentsPaginator, DailyPaymentsQueryOptions } from "../types/daily-payments"
import { dailyPaymentsService } from "../service/daily-payments.service"

const DAILY_PAYMENT_KEY = createQueryKeys("dailyPayments")

export function useDailyPaymentsList(options?: Partial<DailyPaymentsQueryOptions>) {
  const queryKey = [DAILY_PAYMENT_KEY.all, options]

  return useQuery<DailyPaymentsPaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return dailyPaymentsService.all(Object.assign({}, queryKey[1], pageParam))
    },
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}
