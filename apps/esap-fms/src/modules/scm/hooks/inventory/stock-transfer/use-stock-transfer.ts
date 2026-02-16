"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";



import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";



import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "@/config/constants";
import { routes } from "@/config/routes";
import { StockTransferService } from "@/modules/scm/service/inventory/stock-transfer/stock-transfer.service";
import { StockTransfer, StockTransferPaginator, StockTransferQueryOptions } from "@/modules/scm/types/inventory/stock-transfer/stock-transfer-types";
import { DEFAULT_QUERY_OPTIONS, createQueryKeys } from "@/server/service/query-config";





const STOCK_TRANSFER_KEYS = createQueryKeys("stock-transfer")

export function useStockTransferList(
  options?: Partial<StockTransferQueryOptions>
) {
  const queryKey = [STOCK_TRANSFER_KEYS.all, options]

  return useQuery<StockTransferPaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return StockTransferService.all(Object.assign({}, queryKey[1], pageParam))
    },
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}

export function useStockTransferDropdown(options?: Partial<any>) {
  const { data, isLoading, isError, isFetching, refetch } = useQuery<
    StockTransfer[],
    Error
  >({
    queryKey: ["stock-transfer-dropdown", options],
    queryFn: async () => {
      const response = await StockTransferService.getDropdown()
      return response
    },
    placeholderData: keepPreviousData,
  })

  return {
    data,
    isLoading,
    isError,
    isFetching,
    refetch,
  }
}

export function useStockTransferById(id: number) {
  return useQuery({
    queryKey: [STOCK_TRANSFER_KEYS.detail(id)],
    queryFn: () => StockTransferService.get(id),
    enabled: !!id,
    ...DEFAULT_QUERY_OPTIONS,
  })
}

export function useCreateStockTransfer() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: StockTransfer): Promise<StockTransfer> =>
      StockTransferService.create(data),
    onMutate: async (newStockTransfer) => {
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
      const previousStockTransfers =
        queryClient.getQueryData<StockTransferPaginator>(queryKey)
      queryClient.setQueryData<StockTransferPaginator>(queryKey, (old) => {
        if (!old)
          return {
            data: [newStockTransfer],
            count: 1,
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          }
        return {
          ...old,
          data: [...old.data, { ...newStockTransfer, id: Date.now() }],
          count: old.count + 1,
        }
      })
      return { previousStockTransfers }
    },
    onSuccess: () => {
      toast.success(t("form-created-successfully"))
      router.push(routes.scm.inventory.stockTransfer.stockTransfer)
    },
    onError: (err: any, newStockTransfer, context) => {
      if (context?.previousStockTransfers) {
        const queryKey = [
          STOCK_TRANSFER_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousStockTransfers)
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

export function useUpdateStockTransfer() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")
  const router = useRouter()
  return useMutation({
    mutationFn: ({ data }: { data: StockTransfer }) =>
      StockTransferService.update(data),
    onMutate: async ({ data }) => {
      await queryClient.cancelQueries({
        queryKey: [STOCK_TRANSFER_KEYS.all],
        exact: false,
      })
      await queryClient.cancelQueries({
        queryKey: [STOCK_TRANSFER_KEYS.detail(data.id!)],
      })
      const queryKey = [
        STOCK_TRANSFER_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]
      const previousStockReplenishments =
        queryClient.getQueryData<StockTransferPaginator>(queryKey)
      const previousStockTransfer = queryClient.getQueryData<StockTransfer>(
        STOCK_TRANSFER_KEYS.detail(data.id!)
      )
      queryClient.setQueryData<StockTransferPaginator>(queryKey, (old) => {
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
      queryClient.setQueryData(STOCK_TRANSFER_KEYS.detail(data.id!), data)
      return { previousStockReplenishments, previousStockTransfer }
    },
    onError: (err: any, variables, context) => {
      if (context?.previousStockReplenishments) {
        const queryKey = [
          STOCK_TRANSFER_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousStockReplenishments)
      }
      if (context?.previousStockTransfer) {
        queryClient.setQueryData(
          STOCK_TRANSFER_KEYS.detail(variables.data.id!),
          context.previousStockTransfer
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
        queryKey: [STOCK_TRANSFER_KEYS.all],
        exact: false,
      })
      if (data?.id) {
        queryClient.invalidateQueries({
          queryKey: [STOCK_TRANSFER_KEYS.detail(data.id!)],
        })
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: STOCK_TRANSFER_KEYS.all })
      queryClient.invalidateQueries({
        queryKey: [STOCK_TRANSFER_KEYS.detail(data.id!)],
      })
      toast.success(t("form-updated-successfully"))
      router.push(routes.scm.inventory.stockTransfer.stockTransfer)
    },
  })
}

export function useDeleteStockTransfer() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (id: number) => StockTransferService.delete(id),
    onMutate: async (id) => {
      // Cancel any outgoing refetches
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

      // Snapshot the previous value
      const previousStockTransfers =
        queryClient.getQueryData<StockTransferPaginator>(queryKey)

      // Optimistically remove the stock transfer from the list
      queryClient.setQueryData<StockTransferPaginator>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => item.id !== id),
          count: old.count - 1,
        }
      })

      return { previousStockTransfers }
    },

    onSuccess: () => {
      toast.success(t("form-successfully-deleted"))
    },

    onError: (err: any, variables, context) => {
      toast.error(t("form-error-deleting-dependency"))
      if (context?.previousStockTransfers) {
        const queryKey = [
          STOCK_TRANSFER_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousStockTransfers)
      }
    },

    onSettled: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [STOCK_TRANSFER_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useBulkDeleteStockTransfer() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    // Change mutationFn to accept an array of IDs
    mutationFn: (ids: number[]) => StockTransferService.bulkDelete(ids),
    onMutate: async (ids) => {
      // Cancel any outgoing refetches
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

      // Snapshot the previous value
      const previousStockTransfers =
        queryClient.getQueryData<StockTransferPaginator>(queryKey)

      // Optimistically remove multiple items from the list
      queryClient.setQueryData<StockTransferPaginator>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => !ids.includes(item.id!)),
          count: old.count - ids.length,
        }
      })

      return { previousStockTransfers }
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
      toast.error(t("form-error-deleting-dependency"))
      if (context?.previousStockTransfers) {
        const queryKey = [
          STOCK_TRANSFER_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousStockTransfers)
      }
    },

    onSettled: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [STOCK_TRANSFER_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useStockTransferOperations() {
  const queryClient = useQueryClient()

  const invalidateStockQueries = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ["stock-transfer-list"] })
  }, [queryClient])

  return {
    invalidateStockQueries,
  }
}

export function useSearchStockTransfer(
  searchTerm: string,
  filters: Partial<StockTransferQueryOptions>
) {
  return useQuery<StockTransferPaginator, AxiosError>({
    queryKey: ["stock-transfer-search", searchTerm, filters],
    queryFn: () =>
      StockTransferService.search({
        pageIndex: filters.pageIndex ?? 1,
        pageSize: filters.pageSize ?? 10,
        searchTerm,
      }),
    enabled: !!searchTerm || Object.keys(filters).length > 0,
  })
}