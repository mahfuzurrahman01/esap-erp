"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";



import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";



import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "@/config/constants";
import { routes } from "@/config/routes";
import { StockReplanishmentApprovalService } from "@/modules/scm/service/inventory/stock-replanishment/stock-replanishment-approval.service";
import { StockReplanishmentApproval, StockReplanishmentApprovalPaginator, StockReplanishmentApprovalQueryOptions } from "@/modules/scm/types/inventory/stock-replanishment/stock-replanishment-approval-types";
import { StockReplenishmentPaginator } from "@/modules/scm/types/inventory/stock-replanishment/stock-replanishment-types";
import { DEFAULT_QUERY_OPTIONS, createQueryKeys } from "@/server/service/query-config";





const STOCK_REPLANISHMENT_APPROVAL_KEYS = createQueryKeys(
  "stock-replanishment-approval"
)

const STOCK_REPLANISHMENT_KEYS = createQueryKeys("stock-replanishment")

export function useStockReplanishmentApprovalList(
  options?: Partial<StockReplanishmentApprovalQueryOptions>
) {
  const queryKey = [STOCK_REPLANISHMENT_APPROVAL_KEYS.all, options]

  return useQuery<StockReplanishmentApprovalPaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return StockReplanishmentApprovalService.all(
        Object.assign({}, queryKey[1], pageParam)
      )
    },
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}

export function useStockReplanishmentApprovalById(id: number) {
  return useQuery({
    queryKey: [STOCK_REPLANISHMENT_APPROVAL_KEYS.detail(id)],
    queryFn: () => StockReplanishmentApprovalService.get(id),
    enabled: !!id,
    ...DEFAULT_QUERY_OPTIONS,
  })
}

export function useCreateStockReplanishmentApproval() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")
  return useMutation({
    mutationFn: (
      data: StockReplanishmentApproval
    ): Promise<StockReplanishmentApproval> =>
      StockReplanishmentApprovalService.create(data),
    onMutate: async (newStockReplanishmentApproval) => {
      await queryClient.cancelQueries({
        queryKey: [STOCK_REPLANISHMENT_KEYS.all],
        exact: false,
      })
      const queryKey = [
        STOCK_REPLANISHMENT_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]
      const previousStockReplanishmentApproval =
        queryClient.getQueryData<StockReplenishmentPaginator>(queryKey)
      queryClient.setQueryData<StockReplenishmentPaginator>(queryKey, (old) => {
        if (!old)
          return {
            data: [newStockReplanishmentApproval],
            count: 1,
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          }
        return {
          ...old,
          data: [
            ...old.data,
            { ...newStockReplanishmentApproval, id: Date.now() },
          ],
          count: old.count + 1,
        }
      })
      return { previousStockReplanishmentApproval }
    },
    onSuccess: () => {
      toast.success(t("form-successfully-created"))
      router.push(routes.scm.inventory.stockReplenishment.stockReplenishment)
    },
    onError: (err: any, newStockReplanishmentApproval, context) => {
      if (context?.previousStockReplanishmentApproval) {
        const queryKey = [
          STOCK_REPLANISHMENT_APPROVAL_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(
          queryKey,
          context.previousStockReplanishmentApproval
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
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [STOCK_REPLANISHMENT_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useUpdateStockReplanishmentApproval() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")
  return useMutation({
    mutationFn: ({ data }: { data: StockReplanishmentApproval }) =>
      StockReplanishmentApprovalService.update(data),
    onMutate: async ({ data }) => {
      await queryClient.cancelQueries({
        queryKey: [STOCK_REPLANISHMENT_APPROVAL_KEYS.all],
        exact: false,
      })
      await queryClient.cancelQueries({
        queryKey: [STOCK_REPLANISHMENT_APPROVAL_KEYS.detail(data.id!)],
      })
      const queryKey = [
        STOCK_REPLANISHMENT_APPROVAL_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]
      const previousStockReplanishmentApproval =
        queryClient.getQueryData<StockReplanishmentApprovalPaginator>(queryKey)
      const previousStockReplanishmentApprovalDetail =
        queryClient.getQueryData<StockReplanishmentApproval>(
          STOCK_REPLANISHMENT_APPROVAL_KEYS.detail(data.id!)
        )
      queryClient.setQueryData<StockReplanishmentApprovalPaginator>(
        queryKey,
        (old) => {
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
        }
      )
      queryClient.setQueryData(
        STOCK_REPLANISHMENT_APPROVAL_KEYS.detail(data.id!),
        data
      )
      return {
        previousStockReplanishmentApproval,
        previousStockReplanishmentApprovalDetail,
      }
    },
    onError: (err: any, variables, context) => {
      if (context?.previousStockReplanishmentApproval) {
        const queryKey = [
          STOCK_REPLANISHMENT_APPROVAL_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(
          queryKey,
          context.previousStockReplanishmentApproval
        )
      }
      if (context?.previousStockReplanishmentApprovalDetail) {
        queryClient.setQueryData(
          STOCK_REPLANISHMENT_APPROVAL_KEYS.detail(variables.data.id!),
          context.previousStockReplanishmentApprovalDetail
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
        queryKey: [STOCK_REPLANISHMENT_APPROVAL_KEYS.all],
        exact: false,
      })
      if (data?.id) {
        queryClient.invalidateQueries({
          queryKey: [STOCK_REPLANISHMENT_APPROVAL_KEYS.detail(data.id!)],
        })
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [STOCK_REPLANISHMENT_APPROVAL_KEYS.all],
      })
      queryClient.invalidateQueries({
        queryKey: [STOCK_REPLANISHMENT_APPROVAL_KEYS.detail(data.id!)],
      })
      toast.success(t("form-successfully-updated"))
      router.push(routes.scm.inventory.settings.stockReplenishmentApproval)
    },
  })
}

export function useDeleteStockReplanishmentApproval() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (id: number) => StockReplanishmentApprovalService.delete(id),
    onMutate: async (id) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [STOCK_REPLANISHMENT_APPROVAL_KEYS.all],
        exact: false,
      })

      const queryKey = [
        STOCK_REPLANISHMENT_APPROVAL_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      // Snapshot the previous value
      const previousStockReplanishmentApproval =
        queryClient.getQueryData<StockReplanishmentApprovalPaginator>(queryKey)

      // Optimistically remove the COA from the list
      queryClient.setQueryData<StockReplanishmentApprovalPaginator>(
        queryKey,
        (old) => {
          if (!old) return old
          return {
            ...old,
            data: old.data.filter((item) => item.id !== id),
            count: old.count - 1,
          }
        }
      )

      return { previousStockReplanishmentApproval }
    },

    onSuccess: () => {
      toast.success(t("form-successfully-deleted"))
    },

    onError: (err: any, variables, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousStockReplanishmentApproval) {
        const queryKey = [
          STOCK_REPLANISHMENT_APPROVAL_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(
          queryKey,
          context.previousStockReplanishmentApproval
        )
      }
      toast.error(t("form-error-delete"))
      // toast.error(err.response.data)
    },

    onSettled: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [STOCK_REPLANISHMENT_APPROVAL_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useBulkDeleteStockReplanishmentApproval() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    // Change mutationFn to accept an array of IDs
    mutationFn: (ids: number[]) =>
      StockReplanishmentApprovalService.bulkDelete(ids),
    onMutate: async (ids) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [STOCK_REPLANISHMENT_APPROVAL_KEYS.all],
        exact: false,
      })

      const queryKey = [
        STOCK_REPLANISHMENT_APPROVAL_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      // Snapshot the previous value
      const previousStockReplanishmentApproval =
        queryClient.getQueryData<StockReplanishmentApprovalPaginator>(queryKey)

      // Optimistically remove multiple items from the list
      queryClient.setQueryData<StockReplanishmentApprovalPaginator>(
        queryKey,
        (old) => {
          if (!old) return old
          return {
            ...old,
            data: old.data.filter((item) => !ids.includes(item.id!)),
            count: old.count - ids.length,
          }
        }
      )

      return { previousStockReplanishmentApproval }
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
      if (context?.previousStockReplanishmentApproval) {
        const queryKey = [
          STOCK_REPLANISHMENT_APPROVAL_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(
          queryKey,
          context.previousStockReplanishmentApproval
        )
      }
      toast.error(t("form-error-bulk-delete"))
      // toast.error(err.response.data)
    },

    onSettled: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [STOCK_REPLANISHMENT_APPROVAL_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useStockReplanishmentApprovalOperations() {
  const queryClient = useQueryClient()

  const invalidateStockReplanishmentApprovalQueries = useCallback(() => {
    queryClient.invalidateQueries({
      queryKey: STOCK_REPLANISHMENT_APPROVAL_KEYS.all,
    })
  }, [queryClient])

  return {
    invalidateStockReplanishmentApprovalQueries,
  }
}