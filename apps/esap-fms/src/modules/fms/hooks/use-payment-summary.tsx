"use client"
import {
  keepPreviousData,
  useQuery,
} from "@tanstack/react-query"
import { createQueryKeys } from "@/server/service/query-config"
import { PaymentSummaryPaginator, PaymentSummaryQueryOptions } from "../types/payment-summary"
import { paymentSummaryService } from "../service/payment-summary.service"

const PAYMENT_SUMMARY_KEY = createQueryKeys("PaymenySummary")

export function usePaymentSummaryList(options?: Partial<PaymentSummaryQueryOptions>) {
  const queryKey = [PAYMENT_SUMMARY_KEY.all, options]

  return useQuery<PaymentSummaryPaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return paymentSummaryService.all(Object.assign({}, queryKey[1], pageParam))
    },
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}
