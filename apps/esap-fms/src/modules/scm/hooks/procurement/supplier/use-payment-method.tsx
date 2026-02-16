"use client"

import { useCallback } from "react"

import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query"
import { useTranslations } from "next-intl"
import toast from "react-hot-toast"

import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "@/config/constants"
import { PaymentMethodService } from "@/modules/scm/service/procurement/supplier/payment-method.service"
import {
  PaymentMethod,
  PaymentMethodPaginator,
  PaymentMethodQueryOptions,
} from "@/modules/scm/types/procurement/supplier/payment-method-types"
import {
  DEFAULT_QUERY_OPTIONS,
  createQueryKeys,
} from "@/server/service/query-config"

const PAYMENT_METHOD_KEYS = createQueryKeys("payment-method")

export function usePaymentMethodList(
  options?: Partial<PaymentMethodQueryOptions>
) {
  const queryKey = [PAYMENT_METHOD_KEYS.all, options]

  return useQuery<PaymentMethodPaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return PaymentMethodService.all(Object.assign({}, queryKey[1], pageParam))
    },
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}

export function usePaymentMethodById(id: number) {
  return useQuery({
    queryKey: [PAYMENT_METHOD_KEYS.detail(id)],
    queryFn: () => PaymentMethodService.get(id),
    enabled: !!id,
    ...DEFAULT_QUERY_OPTIONS,
  })
}

export function useCreatePaymentMethod() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: PaymentMethod): Promise<PaymentMethod> =>
      PaymentMethodService.create(data),
    onMutate: async (newPaymentMethod) => {
      await queryClient.cancelQueries({
        queryKey: [PAYMENT_METHOD_KEYS.all],
        exact: false,
      })
      const queryKey = [
        PAYMENT_METHOD_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]
      const previousPaymentMethod =
        queryClient.getQueryData<PaymentMethodPaginator>(queryKey)
      queryClient.setQueryData<PaymentMethodPaginator>(queryKey, (old) => {
        if (!old)
          return {
            data: [newPaymentMethod],
            count: 1,
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          }
        return {
          ...old,
          data: [
            ...old.data,
            {
              ...newPaymentMethod,
              id: Date.now(),
            },
          ],
          count: old.count + 1,
        }
      })
      return { previousPaymentMethod }
    },
    onSuccess: () => {
      toast.success(t("form-successfully-created"))
    },
    onError: (err: any, newPaymentMethod, context) => {
      if (context?.previousPaymentMethod) {
        const queryKey = [
          PAYMENT_METHOD_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousPaymentMethod)
      }
      toast.error(t("form-error-creating-dependency"))
      // toast.error(err.response.data)
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [PAYMENT_METHOD_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useUpdatePaymentMethod() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: ({ data }: { data: PaymentMethod }) =>
      PaymentMethodService.update(data),
    onMutate: async ({ data }) => {
      await queryClient.cancelQueries({
        queryKey: [PAYMENT_METHOD_KEYS.all],
        exact: false,
      })
      await queryClient.cancelQueries({
        queryKey: [PAYMENT_METHOD_KEYS.detail(data.id!)],
      })
      const queryKey = [
        PAYMENT_METHOD_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]
      const previousPaymentMethod =
        queryClient.getQueryData<PaymentMethodPaginator>(queryKey)
      const previousPaymentMethodDetail =
        queryClient.getQueryData<PaymentMethod>(
          PAYMENT_METHOD_KEYS.detail(data.id!)
        )
      queryClient.setQueryData<PaymentMethodPaginator>(queryKey, (old) => {
        if (!old)
          return {
            data: [data as unknown as PaymentMethod],
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
      queryClient.setQueryData(PAYMENT_METHOD_KEYS.detail(data.id!), data)
      return { previousPaymentMethod, previousPaymentMethodDetail }
    },
    onError: (err: any, variables, context) => {
      if (context?.previousPaymentMethod) {
        const queryKey = [
          PAYMENT_METHOD_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousPaymentMethod)
      }
      if (context?.previousPaymentMethodDetail) {
        queryClient.setQueryData(
          [PAYMENT_METHOD_KEYS.detail(variables.data.id!)],
          context.previousPaymentMethodDetail
        )
      }
      toast.error(t("form-error-creating-dependency"))
      // toast.error(err.response.data)
    },
    onSettled: (data) => {
      queryClient.invalidateQueries({
        queryKey: [PAYMENT_METHOD_KEYS.all],
        exact: false,
      })
      if (data?.id) {
        queryClient.invalidateQueries({
          queryKey: [PAYMENT_METHOD_KEYS.detail(data.id!)],
        })
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: PAYMENT_METHOD_KEYS.all })
      queryClient.invalidateQueries({
        queryKey: PAYMENT_METHOD_KEYS.detail(data.id!),
      })
      toast.success(t("form-successfully-update"))
    },
  })
}

export function useDeletePaymentMethod() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (id: number) => PaymentMethodService.delete(id),
    onMutate: async (id) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [PAYMENT_METHOD_KEYS.all],
        exact: false,
      })

      const queryKey = [
        PAYMENT_METHOD_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      // Snapshot the previous value
      const previousPaymentMethod =
        queryClient.getQueryData<PaymentMethodPaginator>(queryKey)

      // Optimistically remove the COA from the list
      queryClient.setQueryData<PaymentMethodPaginator>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => item.id !== id),
          count: old.count - 1,
        }
      })

      return { previousPaymentMethod }
    },

    onSuccess: () => {
      toast.success(t("form-successfully-deleted"))
    },

    onError: (err: any, variables, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousPaymentMethod) {
        const queryKey = [
          PAYMENT_METHOD_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousPaymentMethod)
      }
      toast.error(t("form-error-creating-dependency"))
      // toast.error(err.response.data)
    },

    onSettled: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [PAYMENT_METHOD_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useBulkDeletePaymentMethod() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    // Change mutationFn to accept an array of IDs
    mutationFn: (ids: number[]) => PaymentMethodService.bulkDelete(ids),
    onMutate: async (ids) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [PAYMENT_METHOD_KEYS.all],
        exact: false,
      })

      const queryKey = [
        PAYMENT_METHOD_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      // Snapshot the previous value
      const previousPaymentMethod =
        queryClient.getQueryData<PaymentMethodPaginator>(queryKey)

      // Optimistically remove multiple items from the list
      queryClient.setQueryData<PaymentMethodPaginator>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => !ids.includes(item.id!)),
          count: old.count - ids.length,
        }
      })

      return { previousPaymentMethod }
    },

    onSuccess: (_, ids) => {
      const count = ids.length
      toast.success(
        count === 1
          ? t("form-successfully-deleted")
          : t("form-successfully-bulk-deleted", { count })
      )
    },

    onError: (err: any, variables, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousPaymentMethod) {
        const queryKey = [
          PAYMENT_METHOD_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousPaymentMethod)
        toast.error(t("form-error-bulk-delete"))
        // toast.error(err.response.data)
      }
    },

    onSettled: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [PAYMENT_METHOD_KEYS.all],
        exact: false,
      })
    },
  })
}

// Utility hook for PaymentMethod operations
export function usePaymentMethodOperations() {
  const queryClient = useQueryClient()

  const invalidatePaymentMethodsQueries = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: [PAYMENT_METHOD_KEYS.all] })
  }, [queryClient])

  return {
    invalidatePaymentMethodsQueries,
  }
}
