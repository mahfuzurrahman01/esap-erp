"use client";

import { useCallback } from "react";



import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "react-hot-toast";



import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "@/config/constants";
import { PaymentTermsService } from "@/modules/scm/service/procurement/supplier/payment-terms.service";
import { PaymentTerms, PaymentTermsPaginator, PaymentTermsQueryOptions } from "@/modules/scm/types/procurement/supplier/payment-terms-types";
import { DEFAULT_QUERY_OPTIONS, createQueryKeys } from "@/server/service/query-config";





const PAYMENT_TERMS_KEYS = createQueryKeys("payment-terms")

export function usePaymentTermsList(
  options?: Partial<PaymentTermsQueryOptions>
) {
  const queryKey = [PAYMENT_TERMS_KEYS.all, options]

  return useQuery<PaymentTermsPaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return PaymentTermsService.all(Object.assign({}, queryKey[1], pageParam))
    },
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}

export function usePaymentTermsById(id: number) {
  return useQuery({
    queryKey: [PAYMENT_TERMS_KEYS.detail(id)],
    queryFn: () => PaymentTermsService.get(id),
    enabled: !!id,
    ...DEFAULT_QUERY_OPTIONS,
  })
}

export function useCreatePaymentTerms() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: PaymentTerms): Promise<PaymentTerms> =>
      PaymentTermsService.create(data),
    onMutate: async (newPaymentTerms) => {
      await queryClient.cancelQueries({
        queryKey: [PAYMENT_TERMS_KEYS.all],
        exact: false,
      })
      const queryKey = [
        PAYMENT_TERMS_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]
      const previousPaymentTerms =
        queryClient.getQueryData<PaymentTermsPaginator>(queryKey)
      queryClient.setQueryData<PaymentTermsPaginator>(queryKey, (old) => {
        if (!old)
          return {
            data: [newPaymentTerms],
            count: 1,
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          }
        return {
          ...old,
          data: [...old.data, { ...newPaymentTerms, id: Date.now() }],
          count: old.count + 1,
        }
      })
      return { previousPaymentTerms }
    },
    onSuccess: () => {
      toast.success(t("form-successfully-created"))
    },
    onError: (err: any, newPaymentTerms, context) => {
      if (context?.previousPaymentTerms) {
        const queryKey = [
          PAYMENT_TERMS_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        if (err.response?.status === 400) {
          toast.error(t("form-data-already-exists"))
        } else if (err.response?.status === 404) {
          toast.error(t("form-not-found"))
        } else if (err.response?.status === 403) {
          toast.error(t("form-forbidden"))
        } else if (err.response?.status === 401) {
          toast.error(t("form-unauthorized"))
        } else if (err.response?.status === 409) {
          toast.error(t("form-conflict"))
        } else if (err.response?.status === 422) {
          toast.error(t("form-validation-failed"))
        } else if (err.response?.status === 429) {
          toast.error(t("form-too-many-requests"))
        } else if (err.response?.status === 500) {
          toast.error(t("form-server-error"))
        } else if (err.response?.status === 502) {
          toast.error(t("form-bad-gateway"))
        } else if (err.response?.status === 503) {
          toast.error(t("form-service-unavailable"))
        } else if (err.response?.status === 504) {
          toast.error(t("form-gateway-timeout"))
        } else {
          toast.error(err.response?.data || t("form-unknown-error"))
        }
        queryClient.setQueryData(queryKey, context.previousPaymentTerms)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [PAYMENT_TERMS_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useUpdatePaymentTerms() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: ({ data }: { data: PaymentTerms }) =>
      PaymentTermsService.update(data),
    onMutate: async ({ data }) => {
      await queryClient.cancelQueries({
        queryKey: [PAYMENT_TERMS_KEYS.all],
        exact: false,
      })
      await queryClient.cancelQueries({
        queryKey: [PAYMENT_TERMS_KEYS.detail(data.id!)],
      })
      const queryKey = [
        PAYMENT_TERMS_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]
      const previousPaymentTerms =
        queryClient.getQueryData<PaymentTermsPaginator>(queryKey)
      const previousPaymentTermsDetail = queryClient.getQueryData<PaymentTerms>(
        PAYMENT_TERMS_KEYS.detail(data.id!)
      )
      queryClient.setQueryData<PaymentTermsPaginator>(queryKey, (old) => {
        if (!old)
          return {
            data: [data as unknown as PaymentTerms],
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
      queryClient.setQueryData(PAYMENT_TERMS_KEYS.detail(data.id!), data)
      return { previousPaymentTerms, previousPaymentTermsDetail }
    },
    onError: (err: any, variables, context) => {
      if (context?.previousPaymentTerms) {
        const queryKey = [
          PAYMENT_TERMS_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousPaymentTerms)
      }
      if (context?.previousPaymentTermsDetail) {
        queryClient.setQueryData(
          PAYMENT_TERMS_KEYS.detail(variables.data.id!),
          context.previousPaymentTermsDetail
        )
      }
     if (err.response?.status === 400) {
       toast.error(t("form-data-already-exists"))
     } else if (err.response?.status === 404) {
       toast.error(t("form-not-found"))
     } else if (err.response?.status === 403) {
       toast.error(t("form-forbidden"))
     } else if (err.response?.status === 401) {
       toast.error(t("form-unauthorized"))
     } else if (err.response?.status === 409) {
       toast.error(t("form-conflict"))
     } else if (err.response?.status === 422) {
       toast.error(t("form-validation-failed"))
     } else if (err.response?.status === 429) {
       toast.error(t("form-too-many-requests"))
     } else if (err.response?.status === 500) {
       toast.error(t("form-server-error"))
     } else if (err.response?.status === 502) {
       toast.error(t("form-bad-gateway"))
     } else if (err.response?.status === 503) {
       toast.error(t("form-service-unavailable"))
     } else if (err.response?.status === 504) {
       toast.error(t("form-gateway-timeout"))
     } else {
       toast.error(err.response?.data || t("form-unknown-error"))
     }
    },
    onSettled: (data) => {
      queryClient.invalidateQueries({
        queryKey: [PAYMENT_TERMS_KEYS.all],
        exact: false,
      })
      if (data?.id) {
        queryClient.invalidateQueries({
          queryKey: [PAYMENT_TERMS_KEYS.detail(data.id!)],
        })
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: PAYMENT_TERMS_KEYS.all })
      queryClient.invalidateQueries({
        queryKey: [PAYMENT_TERMS_KEYS.detail(data.id!)],
      })
      toast.success(t("form-successfully-update"))
    },
  })
}

export function useDeletePaymentTerms() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (id: number) => PaymentTermsService.delete(id),
    onMutate: async () => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [PAYMENT_TERMS_KEYS.all],
        exact: false,
      })

      const queryKey = [
        PAYMENT_TERMS_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      // Snapshot the previous value
      const previousPaymentTerms =
        queryClient.getQueryData<PaymentTermsPaginator>(queryKey)

      queryClient.setQueryData<PaymentTermsPaginator>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => item.id !== item.id),
          count: old.count - 1,
        }
      })

      return { previousPaymentTerms }
    },

    onSuccess: () => {
      toast.success(t("form-successfully-deleted"))
    },

    onError: (err: any, variables, context) => {
      toast.error(t("form-error-deleting"))
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousPaymentTerms) {
        const queryKey = [
          PAYMENT_TERMS_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousPaymentTerms)
      }
    },

    onSettled: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [PAYMENT_TERMS_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useBulkDeletePaymentTerms() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    // Change mutationFn to accept an array of IDs
    mutationFn: (ids: number[]) => PaymentTermsService.bulkDelete(ids),
    onMutate: async (ids) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [PAYMENT_TERMS_KEYS.all],
        exact: false,
      })

      const queryKey = [
        PAYMENT_TERMS_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      // Snapshot the previous value
      const previousPaymentTerms =
        queryClient.getQueryData<PaymentTermsPaginator>(queryKey)

      // Optimistically remove multiple items from the list
      queryClient.setQueryData<PaymentTermsPaginator>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => !ids.includes(item.id!)),
          count: old.count - ids.length,
        }
      })

      return { previousPaymentTerms }
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
      toast.error(t("form-error-deleting"))
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousPaymentTerms) {
        const queryKey = [
          PAYMENT_TERMS_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousPaymentTerms)
      }
    },

    onSettled: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [PAYMENT_TERMS_KEYS.all],
        exact: false,
      })
    },
  })
}

export function usePaymentTermsOperations() {
  const queryClient = useQueryClient()

  const invalidatePaymentTermsQueries = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: [PAYMENT_TERMS_KEYS.all] })
  }, [queryClient])

  return {
    invalidatePaymentTermsQueries,
  }
}