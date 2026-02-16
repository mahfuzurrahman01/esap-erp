"use client"

import { useParams, useRouter } from "next/navigation"

import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query"
import { useTranslations } from "next-intl"
import { toast } from "react-hot-toast"
import { Text } from "rizzui"

import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "@/config/constants"
import { routes } from "@/config/routes"
import {
  PaymentList,
  PaymentPaginator,
  PaymentQueryOptions,
} from "@/modules/fms/types/payment"
import { createQueryKeys } from "@/server/service/query-config"

import { PaymentService } from "../service/payment.service"

const PAYMENT_KEYS = createQueryKeys("payment")

export function usePaymentList(options?: Partial<PaymentQueryOptions>) {
  const queryKey = [PAYMENT_KEYS.all, options]

  return useQuery<PaymentPaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return PaymentService.all(Object.assign({}, queryKey[1], pageParam))
    },
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}

export function usePaymentById(id: number) {
  return useQuery<PaymentList, Error>({
    queryKey: PAYMENT_KEYS.detail(id),
    queryFn: () => PaymentService.get(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}

export function useCreatePayment() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: PaymentList): Promise<PaymentList> =>
      PaymentService.create(data),
    onMutate: async (newPayment) => {
      await queryClient.cancelQueries({
        queryKey: [PAYMENT_KEYS.all],
        exact: false,
      })

      const queryKey = [
        PAYMENT_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousPayments =
        queryClient.getQueryData<PaymentPaginator>(queryKey)

      queryClient.setQueryData<PaymentPaginator>(queryKey, (old) => {
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
      const newPaymentId = response.id
      queryClient.setQueryData(PAYMENT_KEYS.detail(newPaymentId!), response)
      toast.success(
        <Text as="b">{t("form-payment-created-successfully")}</Text>
      )
      router.push(`${routes.fms.payments}`)
    },
    onError: (err, newPayment, context) => {
      toast.error(<Text as="b">{t("form-payment-failed-to-create")}</Text>)
      if (context?.previousPayments) {
        const queryKey = [
          PAYMENT_KEYS.all,
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
        queryKey: [PAYMENT_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useUpdatePayments() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")
  const params = useParams()
  const paymentId = params.journalEntryId ?? ""

  return useMutation({
    mutationFn: (data: PaymentList) =>
      PaymentService.update(data),
    onMutate: async (data) => {
      await queryClient.cancelQueries({
        queryKey: [PAYMENT_KEYS.all],
        exact: false,
      })

      // Only cancel queries if id exists
      if (data.id) {
        await queryClient.cancelQueries({
          queryKey: PAYMENT_KEYS.detail(data.id),
        })
      }

      const queryKey = [
        PAYMENT_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousPayments =
        queryClient.getQueryData<PaymentPaginator>(queryKey)

      // Only get previous country data if id exists
      const previousPayment = data.id
        ? queryClient.getQueryData<PaymentList>(PAYMENT_KEYS.detail(data.id))
        : undefined

      queryClient.setQueryData<PaymentPaginator>(queryKey, (old) => {
        if (!old)
          return {
            data: [data],
            count: 1,
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          }
        return {
          ...old,
          data: old.data.map((item) =>
            item.id === data.id ? { ...item, ...data } : item
          ),
        }
      })

      if (data.id) {
        queryClient.setQueryData(PAYMENT_KEYS.detail(data.id), data)
      }

      return { previousPayments, previousPayment }
    },
    onSuccess: () => {
      toast.success(
        <Text as="b">{t("form-payment-successfully-updated")}</Text>
      )
      router.push(`${routes.fms.payments}/${paymentId}`)
    },
    onError: (err, variables, context) => {
      if (context?.previousPayments) {
        const queryKey = [
          PAYMENT_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousPayments)
      }
      if (context?.previousPayment && variables.id) {
        queryClient.setQueryData(
          PAYMENT_KEYS.detail(variables.id),
          context.previousPayment
        )
      }
    },
    onSettled: (data) => {
      queryClient.invalidateQueries({
        queryKey: [PAYMENT_KEYS.all],
        exact: false,
      })
      if (data?.id) {
        queryClient.invalidateQueries({
          queryKey: PAYMENT_KEYS.detail(data.id),
        })
      }
    },
  })
}

export function useDeletePayment() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (id: number) => PaymentService.delete(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({
        queryKey: [PAYMENT_KEYS.all],
        exact: false,
      })

      const queryKey = [
        PAYMENT_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousPayments =
        queryClient.getQueryData<PaymentPaginator>(queryKey)

      queryClient.setQueryData<PaymentPaginator>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => item.id !== id),
          count: old.count - 1,
        }
      })

      return { previousPayments }
    },
    onSuccess: () => {
      toast.success(
        <Text as="b">{t("form-payment-successfully-deleted")}</Text>
      )
    },
    onError: (err, variables, context) => {
      if (context?.previousPayments) {
        const queryKey = [
          PAYMENT_KEYS.all,
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
        queryKey: [PAYMENT_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useBulkDeletePayment() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (ids: number[]) => PaymentService.bulk(ids),
    onMutate: async (ids) => {
      await queryClient.cancelQueries({
        queryKey: [PAYMENT_KEYS.all],
        exact: false,
      })

      const queryKey = [
        PAYMENT_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousPayments =
        queryClient.getQueryData<PaymentPaginator>(queryKey)

      queryClient.setQueryData<PaymentPaginator>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => !ids.includes(item.id as number)),
          count: old.count - ids.length,
        }
      })

      return { previousPayments }
    },
    onSuccess: () => {
      toast.success(
        <Text as="b">{t("form-multiple-items-deleted-successfully")}</Text>
      )
    },
    onError: (err, variables, context) => {
      toast.error(
        <Text as="b">{t("form-payments-failed-to-delete")}</Text>
      )
      if (context?.previousPayments) {
        const queryKey = [
          PAYMENT_KEYS.all,
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
        queryKey: [PAYMENT_KEYS.all],
        exact: false,
      })
    },
  })
}
