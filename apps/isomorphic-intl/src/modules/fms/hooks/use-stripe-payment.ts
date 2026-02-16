"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"

import { createQueryKeys } from "@/server/service/query-config"

import { useTranslations } from "next-intl"
import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "@/config/constants"
import { useRouter } from "next/navigation"
import { StripePayment, StripePaymentPaginator } from "../types/stripe-payment"
import { StripePaymentService } from "../service/stripe-payment.service"
import toast from "react-hot-toast"

const STRIPE_PAYMENT_KEYS = createQueryKeys("stripe-payment")

export function useCreateStripePayment() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: StripePayment): Promise<StripePayment> =>
      StripePaymentService.create(data),
    onMutate: async (newPayment) => {
      await queryClient.cancelQueries({
        queryKey: [STRIPE_PAYMENT_KEYS.all],
        exact: false,
      })

      const queryKey = [
        STRIPE_PAYMENT_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousPayments =
        queryClient.getQueryData<StripePaymentPaginator>(queryKey)

      queryClient.setQueryData<StripePaymentPaginator>(queryKey, (old) => {
        if (!old)
          return {
            data: [newPayment],
            count: 1,
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          }
        return {
          ...old,
          data: [...old.data, { ...newPayment, id: Date.now() }],
          count: old.count + 1,
        }
      })

      return { previousPayments }
    },
    onSuccess: async (response) => {
      if (response) {
        // @ts-ignore
        router.push(response)
      }
    },
    onError: (err, newPayment, context) => {
      toast.error(err.message)
      if (context?.previousPayments) {
        const queryKey = [
          STRIPE_PAYMENT_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousPayments)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [STRIPE_PAYMENT_KEYS.all],
        exact: false,
      })
    },
  })
}