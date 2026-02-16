"use client"

import { useRouter } from "next/navigation"

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
import { createQueryKeys } from "@/server/service/query-config"

import { PaymentRequestService } from "../service/payment-request.service"
import {
  PaymentRequestList,
  PaymentRequestPaginator,
  PaymentRequestQueryOptions,
  CreatePaymentRequest,
} from "../types/payment-request"

const PAYMENT_REQUEST_KEYS = createQueryKeys("payment-request")

export function usePaymentRequestList(
  options?: Partial<PaymentRequestQueryOptions>
) {
  const queryKey = [PAYMENT_REQUEST_KEYS.all, options]

  return useQuery<PaymentRequestPaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return PaymentRequestService.all(Object.assign({}, queryKey[1], pageParam))
    },
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}

export function usePaymentRequestById(id: number) {
  return useQuery<PaymentRequestList, Error>({
    queryKey: PAYMENT_REQUEST_KEYS.detail(id),
    queryFn: () => PaymentRequestService.get(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}

export function useCreatePaymentRequest() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: CreatePaymentRequest): Promise<PaymentRequestList> =>
      PaymentRequestService.create(data),
    onMutate: async (newPaymentRequest) => {
      await queryClient.cancelQueries({
        queryKey: [PAYMENT_REQUEST_KEYS.all],
        exact: false,
      })

      const queryKey = [
        PAYMENT_REQUEST_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousPaymentRequests =
        queryClient.getQueryData<PaymentRequestPaginator>(queryKey)

      return { previousPaymentRequests }
    },
    onSuccess: async () => {
      toast.success(
        <Text as="b">{t("form-payment-request-created-successfully")}</Text>
      )
      router.push(`${routes.fms.paymentRequest}`)
    },
    onError: (err, newPaymentRequest, context) => {
      toast.error(
        <Text as="b">{t("form-payment-request-failed-to-create")}</Text>
      )
      if (context?.previousPaymentRequests) {
        const queryKey = [
          PAYMENT_REQUEST_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousPaymentRequests)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [PAYMENT_REQUEST_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useUpdatePaymentRequest() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: ({ data }: { id: number; data: CreatePaymentRequest }) =>
      PaymentRequestService.update(data),
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({
        queryKey: [PAYMENT_REQUEST_KEYS.all],
        exact: false,
      })
      await queryClient.cancelQueries({
        queryKey: PAYMENT_REQUEST_KEYS.detail(id),
      })

      const queryKey = [
        PAYMENT_REQUEST_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousPaymentRequests =
        queryClient.getQueryData<PaymentRequestPaginator>(queryKey)
      const previousPaymentRequest = queryClient.getQueryData<PaymentRequestList>(
        PAYMENT_REQUEST_KEYS.detail(id)
      )

      queryClient.setQueryData<PaymentRequestPaginator>(queryKey, (old) => {
        if (!old)
          return {
            data: [data as unknown as PaymentRequestList],
            count: 1,
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          }
        return {
          ...old,
          data: old.data.map((item) =>
            item.id === id ? { ...item, ...data } as PaymentRequestList : item
          ),
        }
      })

      queryClient.setQueryData(PAYMENT_REQUEST_KEYS.detail(id), data)

      return { previousPaymentRequests, previousPaymentRequest }
    },
    onSuccess: async (response) => {
      const newPaymentRequestId = response.id
      toast.success(
        <Text as="b">{t("form-payment-request-updated-successfully")}</Text>
      )
      router.push(`${routes.fms.paymentRequest}`)
    },
    onError: (err, variables, context) => {
      toast.error(
        <Text as="b">{t("form-payment-request-failed-to-update")}</Text>
      )
      if (context?.previousPaymentRequests) {
        const queryKey = [
          PAYMENT_REQUEST_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousPaymentRequests)
      }
      if (context?.previousPaymentRequest) {
        queryClient.setQueryData(
          PAYMENT_REQUEST_KEYS.detail(variables.id),
          context.previousPaymentRequest
        )
      }
    },
    onSettled: (data) => {
      queryClient.invalidateQueries({
        queryKey: [PAYMENT_REQUEST_KEYS.all],
        exact: false,
      })
      if (data?.id) {
        queryClient.invalidateQueries({
          queryKey: PAYMENT_REQUEST_KEYS.detail(data.id),
        })
      }
    },
  })
}

export function useDeletePaymentRequest() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (id: number) => PaymentRequestService.delete(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({
        queryKey: [PAYMENT_REQUEST_KEYS.all],
        exact: false,
      })

      const queryKey = [
        PAYMENT_REQUEST_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousPaymentRequests =
        queryClient.getQueryData<PaymentRequestPaginator>(queryKey)

      queryClient.setQueryData<PaymentRequestPaginator>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => item.id !== id),
          count: old.count - 1,
        }
      })

      return { previousPaymentRequests }
    },
    onSuccess: () => {
      toast.success(
        <Text as="b">{t("form-payment-request-successfully-deleted")}</Text>
      )
    },
    onError: (err, variables, context) => {
      toast.error(
        <Text as="b">{t("form-payment-request-failed-to-delete")}</Text>
      )
      if (context?.previousPaymentRequests) {
        const queryKey = [
          PAYMENT_REQUEST_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousPaymentRequests)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [PAYMENT_REQUEST_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useBulkDeletePaymentRequest() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (ids: number[]) => PaymentRequestService.bulk(ids),
    onMutate: async (ids) => {
      await queryClient.cancelQueries({
        queryKey: [PAYMENT_REQUEST_KEYS.all],
        exact: false,
      })

      const queryKey = [
        PAYMENT_REQUEST_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousPaymentRequests =
        queryClient.getQueryData<PaymentRequestPaginator>(queryKey)

      queryClient.setQueryData<PaymentRequestPaginator>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => !ids.includes(item.id as number)),
          count: old.count - ids.length,
        }
      })

      return { previousPaymentRequests }
    },
    onSuccess: () => {
      toast.success(
        <Text as="b">{t("form-multiple-items-deleted-successfully")}</Text>
      )
    },
    onError: (err, variables, context) => {
      toast.error(
        <Text as="b">{t("form-payment-requests-failed-to-delete")}</Text>
      )
      if (context?.previousPaymentRequests) {
        const queryKey = [
          PAYMENT_REQUEST_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousPaymentRequests)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [PAYMENT_REQUEST_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useUpdatePaymentRequestStatus() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: ({ id, status }: { id: number; status: string }) =>
      PaymentRequestService.updateStatus({ id, status }),
    onMutate: async ({ id, status }) => {
      await queryClient.cancelQueries({
        queryKey: [PAYMENT_REQUEST_KEYS.all],
        exact: false,
      })
      await queryClient.cancelQueries({
        queryKey: PAYMENT_REQUEST_KEYS.detail(id),
      })

      const queryKey = [
        PAYMENT_REQUEST_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousPaymentRequests =
        queryClient.getQueryData<PaymentRequestPaginator>(queryKey)
      const previousPaymentRequest = queryClient.getQueryData<PaymentRequestList>(
        PAYMENT_REQUEST_KEYS.detail(id)
      )

      // Update the payment request in the list
      queryClient.setQueryData<PaymentRequestPaginator>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.map((item) =>
            item.id === id ? { ...item, status } as PaymentRequestList : item
          ),
        }
      })

      // Update the individual payment request
      queryClient.setQueryData<PaymentRequestList>(
        PAYMENT_REQUEST_KEYS.detail(id),
        (old) => {
          if (!old) return old
          return {
            ...old,
            status,
          }
        }
      )

      return { previousPaymentRequests, previousPaymentRequest }
    },
    onSuccess: () => {
      toast.success(
        <Text as="b">{t("form-payment-request-status-updated-successfully")}</Text>
      )
    },
    onError: (err, variables, context) => {
      toast.error(
        <Text as="b">{t("form-payment-request-status-failed-to-update")}</Text>
      )
      if (context?.previousPaymentRequests) {
        const queryKey = [
          PAYMENT_REQUEST_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousPaymentRequests)
      }
      if (context?.previousPaymentRequest) {
        queryClient.setQueryData(
          PAYMENT_REQUEST_KEYS.detail(variables.id),
          context.previousPaymentRequest
        )
      }
    },
    onSettled: (data) => {
      queryClient.invalidateQueries({
        queryKey: [PAYMENT_REQUEST_KEYS.all],
        exact: false,
      })
      if (data?.id) {
        queryClient.invalidateQueries({
          queryKey: PAYMENT_REQUEST_KEYS.detail(data.id),
        })
      }
    },
  })
}
