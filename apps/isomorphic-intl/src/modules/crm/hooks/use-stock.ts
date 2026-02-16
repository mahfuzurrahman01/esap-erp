"use client"

import { useRouter } from "next/navigation"

import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query"
import { useTranslations } from "next-intl"
import toast from "react-hot-toast"

import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "@/config/constants"
import { stock } from "@/modules/crm/service/stock.service"
import {
  StockList,
  StockPaginator,
  StockQueryOptions,
} from "@/modules/crm/types/stock"
import {
  DEFAULT_QUERY_OPTIONS,
  createQueryKeys,
} from "@/server/service/query-config"

export const STOCK_KEYS = createQueryKeys("Stock")

export function useStockList(options?: Partial<StockQueryOptions>) {
  const queryKey = [STOCK_KEYS.all, options]

  return useQuery<StockPaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return stock.all(Object.assign({}, queryKey[1], pageParam))
    },
    placeholderData: keepPreviousData,
    throwOnError: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}

export function useStockById(id: any) {
  return useQuery({
    queryKey: [STOCK_KEYS.detail(id)],
    queryFn: () => stock.get(id),
    enabled: !!id,
    ...DEFAULT_QUERY_OPTIONS,
  })
}

export function useCreateStock() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: any): Promise<any> => stock.create(data),
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

      const previousCountries =
        queryClient.getQueryData<StockPaginator>(queryKey)

      queryClient.setQueryData<StockPaginator>(queryKey, (old: any) => {
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

      return { previousCountries }
    },
    onSuccess: () => {
      toast.success(t("form-stock-created-successfully"))
      router.refresh()
    },
    onError: (err, newStock, context) => {
      toast.error(t("form-failed-to-create-stock"))
      if (context?.previousCountries) {
        const queryKey = [
          STOCK_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousCountries)
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
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: ({ id, data }: { id: any; data: any }) =>
      stock.update(id, data),
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({
        queryKey: [STOCK_KEYS.all],
        exact: false,
      })
      await queryClient.cancelQueries({
        queryKey: STOCK_KEYS.detail(id),
      })

      const queryKey = [
        STOCK_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousCountries =
        queryClient.getQueryData<StockPaginator>(queryKey)
      const previousStock = queryClient.getQueryData<StockList>(
        STOCK_KEYS.detail(id)
      )

      queryClient.setQueryData<StockPaginator>(queryKey, (old: any) => {
        if (!old)
          return {
            data: [data],
            count: 1,
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          }
        return {
          ...old,
          data: old.data.map((item: any) =>
            item.id === id ? { ...item, ...data } : item
          ),
        }
      })

      queryClient.setQueryData(STOCK_KEYS.detail(id), data)

      return { previousCountries, previousStock }
    },
    onSuccess: () => {
      toast.success(t("form-stock-updated-successfully"))
      router.refresh()
    },
    onError: (err, variables, context) => {
      toast.error(t("form-failed-to-update-stock"))
      if (context?.previousCountries) {
        const queryKey = [
          STOCK_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousCountries)
      }
      if (context?.previousStock) {
        queryClient.setQueryData(
          STOCK_KEYS.detail(variables.id),
          context.previousStock
        )
      }
    },
    onSettled: (data: any) => {
      queryClient.invalidateQueries({
        queryKey: [STOCK_KEYS.all],
        exact: false,
      })
      if (data?.id) {
        queryClient.invalidateQueries({
          queryKey: STOCK_KEYS.detail(data.id),
        })
      }
    },
  })
}

export function useDeleteStock() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (id: any) => stock.delete(id),
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
      const previousCountries =
        queryClient.getQueryData<StockPaginator>(queryKey)

      // Optimistically remove the COA from the list
      queryClient.setQueryData<StockPaginator>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => item.id !== id),
          count: old.count - 1,
        }
      })

      return { previousCountries }
    },

    onSuccess: () => {
      toast.success(t("form-stock-deleted-successfully"))
    },

    onError: (err:any, variables, context) => {
      if (context?.previousCountries) {
        const queryKey = [
          STOCK_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousCountries)
      }
      if(err.response.data.details){
        toast.error(err.response.data.details)
      }else{
        toast.error(t("form-failed-to-delete-stock"))
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
    mutationFn: (ids: number[]) => stock.bulkDelete(ids),
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
      const previousItems = queryClient.getQueryData<StockPaginator>(queryKey)

      // Optimistically remove multiple items from the list
      queryClient.setQueryData<StockPaginator>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => !ids.includes(item.id!)),
          count: old.count - ids.length,
        }
      })

      return { previousItems }
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
      if (context?.previousItems) {
        const queryKey = [
          STOCK_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousItems)
      }
      if(err.response.data.details){
        toast.error(err.response.data.details)
      }else{
        toast.error(t("form-error-bulk-delete"))
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