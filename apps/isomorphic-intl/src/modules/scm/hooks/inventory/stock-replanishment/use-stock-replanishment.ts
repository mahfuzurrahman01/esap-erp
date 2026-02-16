"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";



import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";



import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "@/config/constants";
import { routes } from "@/config/routes";
import { StockReplenishmentService } from "@/modules/scm/service/inventory/stock-replanishment/stock-replanishment.service";
import { StockReplenishment, StockReplenishmentPaginator, StockReplenishmentQueryOptions } from "@/modules/scm/types/inventory/stock-replanishment/stock-replanishment-types";
import { DEFAULT_QUERY_OPTIONS, createQueryKeys } from "@/server/service/query-config";





const STOCK_REPLANISHMENT_KEYS = createQueryKeys("stock-replanishment")

export function useStockReplanishmentList(
  options?: Partial<StockReplenishmentQueryOptions>
) {
  const queryKey = [STOCK_REPLANISHMENT_KEYS.all, options]

  return useQuery<StockReplenishmentPaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return StockReplenishmentService.all(
        Object.assign({}, queryKey[1], pageParam)
      )
    },
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}

export function useStockReplenishmentById(id: number) {
  return useQuery({
    queryKey: [STOCK_REPLANISHMENT_KEYS.detail(id)],
    queryFn: () => StockReplenishmentService.get(id),
    enabled: !!id,
    ...DEFAULT_QUERY_OPTIONS,
  })
}

export function useCreateStockReplenishment() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")
  return useMutation({
    mutationFn: (data: StockReplenishment): Promise<StockReplenishment> =>
      StockReplenishmentService.create(data),
    onMutate: async (newStockReplenishment) => {
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
      const previousStockReplenishments =
        queryClient.getQueryData<StockReplenishmentPaginator>(queryKey)
      queryClient.setQueryData<StockReplenishmentPaginator>(queryKey, (old) => {
        if (!old)
          return {
            data: [newStockReplenishment],
            count: 1,
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          }
        return {
          ...old,
          data: [...old.data, { ...newStockReplenishment, id: Date.now() }],
          count: old.count + 1,
        }
      })
      return { previousStockReplenishments }
    },
    onSuccess: () => {
      router.push(routes.scm.inventory.stockReplenishment.stockReplenishment)
      toast.success(t("form-successfully-created"))
    },
    onError: (err: any, newStockReplenishment, context) => {
      if (context?.previousStockReplenishments) {
        const queryKey = [
          STOCK_REPLANISHMENT_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousStockReplenishments)
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

export function useUpdateStockReplenishment() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")
  const router = useRouter()
  return useMutation({
    mutationFn: ({ data }: { data: StockReplenishment }) =>
      StockReplenishmentService.update(data),
    onMutate: async ({ data }) => {
      await queryClient.cancelQueries({
        queryKey: [STOCK_REPLANISHMENT_KEYS.all],
        exact: false,
      })
      await queryClient.cancelQueries({
        queryKey: STOCK_REPLANISHMENT_KEYS.detail(data.id!),
      })
      const queryKey = [
        STOCK_REPLANISHMENT_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]
      const previousStockReplenishments =
        queryClient.getQueryData<StockReplenishmentPaginator>(queryKey)
      const previousStockReplenishment =
        queryClient.getQueryData<StockReplenishment>(
          STOCK_REPLANISHMENT_KEYS.detail(data.id!)
        )
      queryClient.setQueryData<StockReplenishmentPaginator>(queryKey, (old) => {
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
      queryClient.setQueryData(STOCK_REPLANISHMENT_KEYS.detail(data.id!), data)
      return { previousStockReplenishments, previousStockReplenishment }
    },
    onError: (err: any, variables, context) => {
      if (context?.previousStockReplenishments) {
        const queryKey = [
          STOCK_REPLANISHMENT_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousStockReplenishments)
      }
      if (context?.previousStockReplenishment) {
        queryClient.setQueryData(
          STOCK_REPLANISHMENT_KEYS.detail(variables.data.id!),
          context.previousStockReplenishment
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
        queryKey: [STOCK_REPLANISHMENT_KEYS.all],
        exact: false,
      })
      if (data?.id) {
        queryClient.invalidateQueries({
          queryKey: STOCK_REPLANISHMENT_KEYS.detail(data.id!),
        })
      }
    },
    onSuccess: (data) => {
      toast.success(t("form-successfully-updated"))
      queryClient.invalidateQueries({ queryKey: STOCK_REPLANISHMENT_KEYS.all })
      router.push(routes.scm.inventory.stockReplenishment.stockReplenishment)
      queryClient.invalidateQueries({
        queryKey: STOCK_REPLANISHMENT_KEYS.detail(data.id!),
      })
    },
  })
}

export function useDeleteStockReplenishment() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (id: number) => StockReplenishmentService.delete(id),
    onMutate: async (id) => {
      // Cancel any outgoing refetches
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

      // Snapshot the previous value
      const previousStockReplenishments =
        queryClient.getQueryData<StockReplenishmentPaginator>(queryKey)

      // Optimistically remove the COA from the list
      queryClient.setQueryData<StockReplenishmentPaginator>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => item.id !== id),
          count: old.count - 1,
        }
      })

      return { previousStockReplenishments }
    },

    onSuccess: () => {
      toast.success(t("form-successfully-deleted"))
    },

    onError: (err: any, variables, context) => {
       toast.error(t("form-error-delete-dependency"))
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousStockReplenishments) {
        const queryKey = [
          STOCK_REPLANISHMENT_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousStockReplenishments)
      }
    },

    onSettled: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [STOCK_REPLANISHMENT_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useBulkDeleteStockReplenishment() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    // Change mutationFn to accept an array of IDs
    mutationFn: (ids: number[]) => StockReplenishmentService.bulkDelete(ids),
    onMutate: async (ids) => {
      // Cancel any outgoing refetches
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

      // Snapshot the previous value
      const previousStockReplenishments =
        queryClient.getQueryData<StockReplenishmentPaginator>(queryKey)

      // Optimistically remove multiple items from the list
      queryClient.setQueryData<StockReplenishmentPaginator>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => !ids.includes(item.id!)),
          count: old.count - ids.length,
        }
      })

      return { previousStockReplenishments }
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
      if (context?.previousStockReplenishments) {
        const queryKey = [
          STOCK_REPLANISHMENT_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousStockReplenishments)
        toast.error(t("form-error-bulk-delete"))
        // toast.error(err.response.data)
      }
    },

    onSettled: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [STOCK_REPLANISHMENT_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useStockReplenishmentOperations() {
  const queryClient = useQueryClient()

  const invalidateStockQueries = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ["stock-replanishment-list"] })
  }, [queryClient])

  return {
    invalidateStockQueries,
  }
}

export function useSearchStockReplenishment(
  searchTerm: string,
  filters: Partial<StockReplenishmentQueryOptions>
) {
  return useQuery<StockReplenishmentPaginator, AxiosError>({
    queryKey: ["stock-replanishment-search", searchTerm, filters],
    queryFn: () =>
      StockReplenishmentService.search({
        pageIndex: filters.pageIndex ?? 1,
        pageSize: filters.pageSize ?? 10,
        searchTerm,
      }),
    enabled: !!searchTerm || Object.keys(filters).length > 0,
  })
}