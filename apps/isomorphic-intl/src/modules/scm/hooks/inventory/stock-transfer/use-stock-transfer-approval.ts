"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";



import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";



import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "@/config/constants";
import { routes } from "@/config/routes";
import { StockTransferApprovalService } from "@/modules/scm/service/inventory/stock-transfer/stock-transfer-approval.service";
import { StockTransferApproval, StockTransferApprovalPaginator, StockTransferApprovalQueryOptions } from "@/modules/scm/types/inventory/stock-transfer/stock-transfer-approval";
import { StockTransfer, StockTransferPaginator } from "@/modules/scm/types/inventory/stock-transfer/stock-transfer-types";
import { DEFAULT_QUERY_OPTIONS, createQueryKeys } from "@/server/service/query-config";





const STOCK_TRANSFER_APPROVAL_KEYS = createQueryKeys("stock-transfer-approval")
const STOCK_TRANSFER_KEYS = createQueryKeys("stock-transfer")
export function useStockTransferApprovalList(
  options?: Partial<StockTransferApprovalQueryOptions>
) {
  const queryKey = [STOCK_TRANSFER_APPROVAL_KEYS.all, options]

  return useQuery<StockTransferApprovalPaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return StockTransferApprovalService.all(
        Object.assign({}, queryKey[1], pageParam)
      )
    },
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}

export function useStockTransferApprovalById(id: number) {
  return useQuery({
    queryKey: [STOCK_TRANSFER_APPROVAL_KEYS.detail(id)],
    queryFn: () => StockTransferApprovalService.get(id),
    enabled: !!id,
    ...DEFAULT_QUERY_OPTIONS,
  })
}

export function useCreateStockTransferApproval() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")
  return useMutation({
    mutationFn: (data: StockTransferApproval): Promise<StockTransferApproval> =>
      StockTransferApprovalService.create(data),
    onMutate: async (newStockTransferApproval) => {
      await queryClient.cancelQueries({
        queryKey: [STOCK_TRANSFER_KEYS.all],
        exact: false,
      })
      const queryKey = [
        STOCK_TRANSFER_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]
      const previousStockTransfer =
        queryClient.getQueryData<StockTransferPaginator>(queryKey)
      queryClient.setQueryData<StockTransferPaginator>(queryKey, (old) => {
        if (!old)
          return {
            data: [newStockTransferApproval as unknown as StockTransfer],
            count: 1,
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          }
        return {
          ...old,
          data: [
            ...old.data,
            {
              ...newStockTransferApproval,
              id: Date.now(),
            } as unknown as StockTransfer,
          ],
          count: old.count + 1,
        }
      })
      return { previousStockTransfer }
    },
    onSuccess: () => {
      toast.success(t("form-successfully-created"))
      router.refresh()
      router.push(routes.scm.inventory.stockTransfer.stockTransfer)
    },
    onError: (err: any, newStockTransferApproval, context) => {
      if (context?.previousStockTransfer) {
        const queryKey = [
          STOCK_TRANSFER_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousStockTransfer)
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
        queryKey: [STOCK_TRANSFER_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useUpdateStockTransferApproval() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")
  return useMutation({
    mutationFn: ({ data }: { data: StockTransferApproval }) =>
      StockTransferApprovalService.update(data),
    onMutate: async ({ data }) => {
      await queryClient.cancelQueries({
        queryKey: [STOCK_TRANSFER_APPROVAL_KEYS.all],
        exact: false,
      })
      await queryClient.cancelQueries({
        queryKey: [STOCK_TRANSFER_APPROVAL_KEYS.detail(data.id!)],
      })
      const queryKey = [
        STOCK_TRANSFER_APPROVAL_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]
      const previousStockTransferApproval =
        queryClient.getQueryData<StockTransferApprovalPaginator>(queryKey)
      const previousStockTransferApprovalDetail =
        queryClient.getQueryData<StockTransferApproval>(
          STOCK_TRANSFER_APPROVAL_KEYS.detail(data.id!)
        )
      queryClient.setQueryData<StockTransferApprovalPaginator>(
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
        STOCK_TRANSFER_APPROVAL_KEYS.detail(data.id!),
        data
      )
      return {
        previousStockTransferApproval,
        previousStockTransferApprovalDetail,
      }
    },
    onError: (err: any, variables, context) => {
      if (context?.previousStockTransferApproval) {
        const queryKey = [
          STOCK_TRANSFER_APPROVAL_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(
          queryKey,
          context.previousStockTransferApproval
        )
      }
      if (context?.previousStockTransferApprovalDetail) {
        queryClient.setQueryData(
          STOCK_TRANSFER_APPROVAL_KEYS.detail(variables.data.id!),
          context.previousStockTransferApprovalDetail
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
        queryKey: [STOCK_TRANSFER_APPROVAL_KEYS.all],
        exact: false,
      })
      if (data?.id) {
        queryClient.invalidateQueries({
          queryKey: [STOCK_TRANSFER_APPROVAL_KEYS.detail(data.id!)],
        })
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [STOCK_TRANSFER_APPROVAL_KEYS.all],
      })
      queryClient.invalidateQueries({
        queryKey: [STOCK_TRANSFER_APPROVAL_KEYS.detail(data.id!)],
      })
      toast.success(t("form-successfully-updated"))
      router.push(routes.scm.inventory.settings.stockTransferApproval)
    },
  })
}

export function useDeleteStockTransferApproval() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (id: number) => StockTransferApprovalService.delete(id),
    onMutate: async (id) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [STOCK_TRANSFER_APPROVAL_KEYS.all],
        exact: false,
      })

      const queryKey = [
        STOCK_TRANSFER_APPROVAL_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      // Snapshot the previous value
      const previousStockTransferApproval =
        queryClient.getQueryData<StockTransferApprovalPaginator>(queryKey)

      // Optimistically remove the COA from the list
      queryClient.setQueryData<StockTransferApprovalPaginator>(
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

      return { previousStockTransferApproval }
    },

    onSuccess: () => {
      toast.success(t("form-successfully-deleted"))
    },

    onError: (err: any, variables, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousStockTransferApproval) {
        const queryKey = [
          STOCK_TRANSFER_APPROVAL_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(
          queryKey,
          context.previousStockTransferApproval
        )
      }
      toast.error(t("form-error-delete"))
      // toast.error(err?.response?.data)
    },

    onSettled: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [STOCK_TRANSFER_APPROVAL_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useBulkDeleteStockTransferApproval() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    // Change mutationFn to accept an array of IDs
    mutationFn: (ids: number[]) => StockTransferApprovalService.bulkDelete(ids),
    onMutate: async (ids) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [STOCK_TRANSFER_APPROVAL_KEYS.all],
        exact: false,
      })

      const queryKey = [
        STOCK_TRANSFER_APPROVAL_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      // Snapshot the previous value
      const previousStockTransferApproval =
        queryClient.getQueryData<StockTransferApprovalPaginator>(queryKey)

      // Optimistically remove multiple items from the list
      queryClient.setQueryData<StockTransferApprovalPaginator>(
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

      return { previousStockTransferApproval }
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
      if (context?.previousStockTransferApproval) {
        const queryKey = [
          STOCK_TRANSFER_APPROVAL_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(
          queryKey,
          context.previousStockTransferApproval
        )
      }
      toast.error(t("form-error-bulk-delete"))
      // toast.error(err.response.data)
    },

    onSettled: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [STOCK_TRANSFER_APPROVAL_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useStockTransferApprovalOperations() {
  const queryClient = useQueryClient()

  const invalidateStockTransferApprovalQueries = useCallback(() => {
    queryClient.invalidateQueries({
      queryKey: STOCK_TRANSFER_APPROVAL_KEYS.all,
    })
  }, [queryClient])

  return {
    invalidateStockTransferApprovalQueries,
  }
}