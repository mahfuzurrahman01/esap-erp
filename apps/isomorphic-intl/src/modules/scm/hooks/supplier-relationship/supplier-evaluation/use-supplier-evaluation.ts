"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";



import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";



import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "@/config/constants";
import { routes } from "@/config/routes";
import { SupplierEvaluationService } from "@/modules/scm/service/supplier-relationship/supplier-evaluation/supplier-evaluation.service";
import { CreateSupplierEvaluationInput, SupplierEvaluation, SupplierEvaluationPaginator, SupplierEvaluationQueryOptions, UpdateSupplierEvaluationInput } from "@/modules/scm/types/supplier-relationship/supplier-evaluation/supplier-evaluation-types";
import { DEFAULT_QUERY_OPTIONS, createQueryKeys } from "@/server/service/query-config";





const SUPPLIER_EVALUATION_KEYS = createQueryKeys("supplier-evaluation")

export function useSupplierEvaluationList(
  options?: Partial<SupplierEvaluationQueryOptions>
) {
  const queryKey = [SUPPLIER_EVALUATION_KEYS.all, options]

  return useQuery<SupplierEvaluationPaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return SupplierEvaluationService.all(
        Object.assign({}, queryKey[1], pageParam)
      )
    },
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}

export function useSupplierEvaluationById(id: number) {
  return useQuery({
    queryKey: [SUPPLIER_EVALUATION_KEYS.detail(id)],
    queryFn: () => SupplierEvaluationService.get(id),
    enabled: !!id,
    ...DEFAULT_QUERY_OPTIONS,
  })
}

export function useCreateSupplierEvaluation() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")
  return useMutation({
    mutationFn: (
      data: CreateSupplierEvaluationInput
    ): Promise<SupplierEvaluation> => SupplierEvaluationService.create(data),
    onMutate: async (newSupplierEvaluation) => {
      await queryClient.cancelQueries({
        queryKey: [SUPPLIER_EVALUATION_KEYS.all],
        exact: false,
      })
      const queryKey = [
        SUPPLIER_EVALUATION_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]
      const previousSupplierEvaluation =
        queryClient.getQueryData<SupplierEvaluationPaginator>(queryKey)
      queryClient.setQueryData<SupplierEvaluationPaginator>(queryKey, (old) => {
        if (!old)
          return {
            data: [newSupplierEvaluation],
            count: 1,
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          }
        return {
          ...old,
          data: [...old.data, { ...newSupplierEvaluation, id: Date.now() }],
          count: old.count + 1,
        }
      })
      return { previousSupplierEvaluation }
    },
    onSuccess: () => {
      toast.success(t("form-successfully-created"))
      router.push(
        routes.scm.supplierRelationship.evaluationHistory.evaluationHistory
      )
    },
    onError: (err: any, newSupplierEvaluation, context) => {
      if (context?.previousSupplierEvaluation) {
        const queryKey = [
          SUPPLIER_EVALUATION_KEYS.all,
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
        queryClient.setQueryData(queryKey, context.previousSupplierEvaluation)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [SUPPLIER_EVALUATION_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useUpdateSupplierEvaluation() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")
  return useMutation({
    mutationFn: ({ data }: { data: UpdateSupplierEvaluationInput }) =>
      SupplierEvaluationService.update(data),
    onMutate: async ({ data }) => {
      await queryClient.cancelQueries({
        queryKey: [SUPPLIER_EVALUATION_KEYS.all],
        exact: false,
      })
      await queryClient.cancelQueries({
        queryKey: [SUPPLIER_EVALUATION_KEYS.detail(data.id!)],
      })
      const queryKey = [
        SUPPLIER_EVALUATION_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]
      const previousSupplierEvaluation =
        queryClient.getQueryData<SupplierEvaluationPaginator>(queryKey)
      const previousSupplierEvaluationDetail =
        queryClient.getQueryData<SupplierEvaluation>(
          SUPPLIER_EVALUATION_KEYS.detail(data.id!)
        )
      queryClient.setQueryData<SupplierEvaluationPaginator>(queryKey, (old) => {
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
      queryClient.setQueryData(SUPPLIER_EVALUATION_KEYS.detail(data.id!), data)
      return { previousSupplierEvaluation, previousSupplierEvaluationDetail }
    },
    onError: (err: any, variables, context) => {
      if (context?.previousSupplierEvaluation) {
        const queryKey = [
          SUPPLIER_EVALUATION_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousSupplierEvaluation)
      }
      if (context?.previousSupplierEvaluationDetail) {
        queryClient.setQueryData(
          [SUPPLIER_EVALUATION_KEYS.detail(variables.data.id!)],
          context.previousSupplierEvaluationDetail
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
        queryKey: SUPPLIER_EVALUATION_KEYS.all,
        exact: false,
      })
      if (data?.id) {
        queryClient.invalidateQueries({
          queryKey: SUPPLIER_EVALUATION_KEYS.detail(data.id!),
        })
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [SUPPLIER_EVALUATION_KEYS.all],
      })
      queryClient.invalidateQueries({
        queryKey: [SUPPLIER_EVALUATION_KEYS.detail(data.id!)],
      })
      toast.success(t("form-successfully-updated"))
      router.push(
        routes.scm.supplierRelationship.evaluationHistory.evaluationHistory
      )
    },
  })
}

export function useDeleteSupplierEvaluation() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (id: number) => SupplierEvaluationService.delete(id),
    onMutate: async (id) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [SUPPLIER_EVALUATION_KEYS.all],
        exact: false,
      })

      const queryKey = [
        SUPPLIER_EVALUATION_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      // Snapshot the previous value
      const previousSupplierEvaluation =
        queryClient.getQueryData<SupplierEvaluationPaginator>(queryKey)

      // Optimistically remove the COA from the list
      queryClient.setQueryData<SupplierEvaluationPaginator>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => item.id !== id),
          count: old.count - 1,
        }
      })

      return { previousSupplierEvaluation }
    },

    onSuccess: () => {
      toast.success(t("form-successfully-deleted"))
    },

    onError: (err, variables, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousSupplierEvaluation) {
        const queryKey = [
          SUPPLIER_EVALUATION_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousSupplierEvaluation)
      }
      toast.error(err.message)
    },

    onSettled: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [SUPPLIER_EVALUATION_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useBulkDeleteSupplierEvaluation() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    // Change mutationFn to accept an array of IDs
    mutationFn: (ids: number[]) => SupplierEvaluationService.bulkDelete(ids),
    onMutate: async (ids) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [SUPPLIER_EVALUATION_KEYS.all],
        exact: false,
      })

      const queryKey = [
        SUPPLIER_EVALUATION_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      // Snapshot the previous value
      const previousSupplierEvaluation =
        queryClient.getQueryData<SupplierEvaluationPaginator>(queryKey)

      // Optimistically remove multiple items from the list
      queryClient.setQueryData<SupplierEvaluationPaginator>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => !ids.includes(item.id!)),
          count: old.count - ids.length,
        }
      })

      return { previousSupplierEvaluation }
    },

    onSuccess: (_, ids) => {
      const count = ids.length
      toast.success(
        count === 1
          ? t("form-successfully-deleted")
          : t("form-successfully-bulk-deleted", { count })
      )
    },

    onError: (err, variables, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousSupplierEvaluation) {
        const queryKey = [
          SUPPLIER_EVALUATION_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousSupplierEvaluation)
        toast.error(t("form-error-bulk-delete"))
      }
    },

    onSettled: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [SUPPLIER_EVALUATION_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useSupplierEvaluationOperations() {
  const queryClient = useQueryClient()

  const invalidateSupplierEvaluationQueries = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ["supplier-evaluation-list"] })
  }, [queryClient])

  return {
    invalidateSupplierEvaluationQueries,
  }
}

// export function useSearchForecast(
//   searchTerm: string,
//   filters: Partial<ForecastQueryOptions>
// ) {
//   return useQuery<StockPaginator, AxiosError>({
//     queryKey: ["stock-search", searchTerm, filters],
//     queryFn: () =>
//       ForecastService.search({
//         pageIndex: filters.pageIndex ?? 1,
//         pageSize: filters.pageSize ?? 10,
//         searchTerm,
//       }),
//     enabled: !!searchTerm || Object.keys(filters).length > 0,
//   })
// }

// export function useExportInvoice() {
//   return useMutation<Blob, AxiosError, Partial<InvoiceQueryOptions>>({
//     mutationFn: async (options) => {
//       const response = await InvoiceService.export(options)
//       if (response instanceof Blob) {
//         return response
//       }
//       throw new Error("Export failed: Response is not a Blob")
//     },
//   })
// }