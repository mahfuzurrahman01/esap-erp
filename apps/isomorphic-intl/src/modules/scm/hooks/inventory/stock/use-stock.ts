"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";



import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";



import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "@/config/constants";
import { routes } from "@/config/routes";
import { StockService } from "@/modules/scm/service/inventory/stock/stock.service";
import { Stock, StockAdjustment, StockPaginator, StockQueryOptions } from "@/modules/scm/types/inventory/stock-overview/stock-overview-types";
import { DEFAULT_QUERY_OPTIONS, createQueryKeys } from "@/server/service/query-config";





const STOCK_KEYS = createQueryKeys("stock")

export function useStockList(options?: Partial<StockQueryOptions>) {
  const queryKey = [STOCK_KEYS.all, options]

  return useQuery<StockPaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return StockService.all(Object.assign({}, queryKey[1], pageParam))
    },
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}

export function useStockDropdown() {
  const { data, isLoading, isError, isFetching, refetch } = useQuery<
    Stock[],
    Error
  >({
    queryKey: [STOCK_KEYS.list],
    queryFn: () => StockService.getDropdown(),
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

export function useStockById(id: number) {
  return useQuery({
    queryKey: [STOCK_KEYS.detail(id)],
    queryFn: () => StockService.get(id),
    enabled: !!id,
    ...DEFAULT_QUERY_OPTIONS,
  })
}

export function useCreateStock() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")
  return useMutation({
    mutationFn: (data: Stock): Promise<Stock> => StockService.create(data),
    onMutate: async (newStock) => {
      await queryClient.cancelQueries({
        queryKey: [STOCK_KEYS.all],
        exact: false,
      })
      const queryKey = [
        STOCK_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]
      const previousStock = queryClient.getQueryData<StockPaginator>(queryKey)
      queryClient.setQueryData<StockPaginator>(queryKey, (old) => {
        if (!old)
          return {
            data: [newStock],
            count: 1,
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          }
        return {
          ...old,
          data: [...old.data, { ...newStock, id: Date.now() }],
          count: old.count + 1,
        }
      })
      return { previousStock }
    },
    onSuccess: () => {
      router.push(routes.scm.inventory.stock.stockOverview)
      toast.success(t("form-successfully-created"))
    },
    onError: (err: any, newStock, context) => {
      if (context?.previousStock) {
        const queryKey = [
          STOCK_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousStock)
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
        queryKey: [STOCK_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useUpdateStock() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")
  const router = useRouter()

  return useMutation({
    mutationFn: ({ data }: { data: Stock }) => StockService.update(data),
    onMutate: async ({ data }) => {
      await queryClient.cancelQueries({
        queryKey: [STOCK_KEYS.all],
        exact: false,
      })
      await queryClient.cancelQueries({
        queryKey: [STOCK_KEYS.detail(data.id!)],
      })
      const queryKey = [
        STOCK_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]
      const previousStock = queryClient.getQueryData<StockPaginator>(queryKey)
      const previousStockDetail = queryClient.getQueryData<Stock>(
        STOCK_KEYS.detail(data.id!)
      )
      queryClient.setQueryData<StockPaginator>(queryKey, (old) => {
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
      queryClient.setQueryData(STOCK_KEYS.detail(data.id!), data)
      return { previousStock, previousStockDetail }
    },
    onError: (err: any, variables, context) => {
      if (context?.previousStock) {
        const queryKey = [
          STOCK_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousStock)
      }
      if (context?.previousStockDetail) {
        queryClient.setQueryData(
          STOCK_KEYS.detail(variables.data.id!),
          context.previousStockDetail
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
        queryKey: [STOCK_KEYS.all],
        exact: false,
      })
      if (data?.id) {
        queryClient.invalidateQueries({
          queryKey: [STOCK_KEYS.detail(data.id!)],
        })
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: STOCK_KEYS.all })
      queryClient.invalidateQueries({
        queryKey: [STOCK_KEYS.detail(data.id!)],
      })
      toast.success(t("form-successfully-updated"))
      router.push(routes.scm.inventory.stock.stockOverview)
    },
  })
}

export function usePatchStockReceived() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: StockAdjustment[]) => StockService.patch(data),
    onSuccess: () => {},
    onError: (err: AxiosError) => {
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
        toast.error(t("form-unknown-error"))
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [STOCK_KEYS.all],
        exact: false,
      })
    },
  })
}

export function usePatchStockUpdate() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: StockAdjustment) => StockService.updateStock(data),
    onSuccess: () => {toast.success(t("form-successfully-updated"))},
    onError: (err: AxiosError) => {
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
        toast.error(t("form-not-found-in-inventory"))
      } else if (err.response?.status === 502) {
        toast.error(t("form-bad-gateway"))
      } else if (err.response?.status === 503) {
        toast.error(t("form-service-unavailable"))
      } else if (err.response?.status === 504) {
        toast.error(t("form-gateway-timeout"))
      } else {
        toast.error(t("form-unknown-error"))
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [STOCK_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useDeleteStock() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (id: number) => StockService.delete(id),
    onMutate: async (id) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [STOCK_KEYS.all],
        exact: false,
      })

      const queryKey = [
        STOCK_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      // Snapshot the previous value
      const previousStocks = queryClient.getQueryData<StockPaginator>(queryKey)

      // Optimistically remove the COA from the list
      queryClient.setQueryData<StockPaginator>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => item.id !== id),
          count: old.count - 1,
        }
      })

      return { previousStocks }
    },

    onSuccess: () => {
      toast.success(t("form-successfully-deleted"))
    },

    onError: (err: any, variables, context) => {
      toast.error(t("form-error-delete-dependency"))
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousStocks) {
        const queryKey = [
          STOCK_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousStocks)
      }
    },

    onSettled: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [STOCK_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useBulkDeleteStock() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    // Change mutationFn to accept an array of IDs
    mutationFn: (ids: number[]) => StockService.bulkDelete(ids),
    onMutate: async (ids) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [STOCK_KEYS.all],
        exact: false,
      })

      const queryKey = [
        STOCK_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      // Snapshot the previous value
      const previousStocks = queryClient.getQueryData<StockPaginator>(queryKey)

      // Optimistically remove multiple items from the list
      queryClient.setQueryData<StockPaginator>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => !ids.includes(item.id!)),
          count: old.count - ids.length,
        }
      })

      return { previousStocks }
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
      toast.error(t("form-error-delete-dependency"))
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousStocks) {
        const queryKey = [
          STOCK_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousStocks)
      }
    },

    onSettled: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [STOCK_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useStockOperations() {
  const queryClient = useQueryClient()

  const invalidateStockQueries = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ["stock-list"] })
  }, [queryClient])

  return {
    invalidateStockQueries,
  }
}

export function useSearchStock(
  searchTerm: string,
  filters: Partial<StockQueryOptions>
) {
  return useQuery<StockPaginator, AxiosError>({
    queryKey: ["stock-search", searchTerm, filters],
    queryFn: () =>
      StockService.search({
        pageIndex: filters.pageIndex ?? 1,
        pageSize: filters.pageSize ?? 10,
        searchTerm,
      }),
    enabled: !!searchTerm || Object.keys(filters).length > 0,
  })
}

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