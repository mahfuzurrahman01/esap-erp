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
import { routes } from "@/config/routes"
import { salesOrder } from "@/modules/crm/service/sales-order.service"
import {
  SalesOrderList,
  SalesOrderPaginator,
  SalesOrderQueryOptions,
} from "@/modules/crm/types/sales-order"
import {
  DEFAULT_QUERY_OPTIONS,
  createQueryKeys,
} from "@/server/service/query-config"

export const SALES_ORDER_KEYS = createQueryKeys("SalesOrder")

export function useSalesOrderList(options?: Partial<SalesOrderQueryOptions>) {
  const queryKey = [SALES_ORDER_KEYS.all, options]

  return useQuery<SalesOrderPaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return salesOrder.all(Object.assign({}, queryKey[1], pageParam))
    },
    placeholderData: keepPreviousData,
    throwOnError: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}

export function useSalesOrderById(id: any) {
  return useQuery({
    queryKey: [SALES_ORDER_KEYS.detail(id)],
    queryFn: () => salesOrder.get(id),
    enabled: !!id,
    ...DEFAULT_QUERY_OPTIONS,
  })
}

export function useCreateSalesOrder() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: any): Promise<any> => salesOrder.create(data),
    onMutate: async (newSalesOrder) => {
      await queryClient.cancelQueries({
        queryKey: [SALES_ORDER_KEYS.all],
        exact: false,
      })

      const queryKey = [
        SALES_ORDER_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousCountries =
        queryClient.getQueryData<SalesOrderPaginator>(queryKey)

      queryClient.setQueryData<SalesOrderPaginator>(queryKey, (old: any) => {
        if (!old)
          return {
            data: [newSalesOrder],
            count: 1,
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          }
        return {
          ...old,
          data: [...old.data, { ...newSalesOrder, id: Date.now() }],
          count: old.count + 1,
        }
      })

      return { previousCountries }
    },
    onSuccess: () => {
      router.push(routes.crm.salesOrders)
      toast.success(t("form-sales-order-created-successfully"))
    },
    onError: (err, newSalesOrder, context) => {
      toast.error(t("form-failed-to-create-sales-order"))
      if (context?.previousCountries) {
        const queryKey = [
          SALES_ORDER_KEYS.all,
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
        queryKey: [SALES_ORDER_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useUpdateSalesOrder() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: ({ id, data }: { id: any; data: any }) =>
      salesOrder.update(id, data),
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({
        queryKey: [SALES_ORDER_KEYS.all],
        exact: false,
      })
      await queryClient.cancelQueries({
        queryKey: SALES_ORDER_KEYS.detail(id),
      })

      const queryKey = [
        SALES_ORDER_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousCountries =
        queryClient.getQueryData<SalesOrderPaginator>(queryKey)
      const previousSalesOrder = queryClient.getQueryData<SalesOrderList>(
        SALES_ORDER_KEYS.detail(id)
      )

      queryClient.setQueryData<SalesOrderPaginator>(queryKey, (old: any) => {
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

      queryClient.setQueryData(SALES_ORDER_KEYS.detail(id), data)

      return { previousCountries, previousSalesOrder }
    },
    onSuccess: () => {
      router.push(routes.crm.salesOrders)
      toast.success(t("form-sales-order-updated-successfully"))
    },
    onError: (err, variables, context) => {
      toast.error(t("form-failed-to-update-sales-order"))
      if (context?.previousCountries) {
        const queryKey = [
          SALES_ORDER_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousCountries)
      }
      if (context?.previousSalesOrder) {
        queryClient.setQueryData(
          SALES_ORDER_KEYS.detail(variables.id),
          context.previousSalesOrder
        )
      }
    },
    onSettled: (data: any) => {
      queryClient.invalidateQueries({
        queryKey: [SALES_ORDER_KEYS.all],
        exact: false,
      })
      if (data?.id) {
        queryClient.invalidateQueries({
          queryKey: SALES_ORDER_KEYS.detail(data.id),
        })
      }
    },
  })
}

export function useDeleteSalesOrder() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (id: any) => salesOrder.delete(id),
    onMutate: async (id) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [SALES_ORDER_KEYS.all],
        exact: false,
      })

      const queryKey = [
        SALES_ORDER_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      // Snapshot the previous value
      const previousCountries =
        queryClient.getQueryData<SalesOrderPaginator>(queryKey)

      // Optimistically remove the COA from the list
      queryClient.setQueryData<SalesOrderPaginator>(queryKey, (old) => {
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
      toast.success(t("form-sales-order-deleted-successfully"))
    },

    onError: (err, variables, context) => {
      toast.error(t("form-failed-to-delete-sales-order"))
      if (context?.previousCountries) {
        const queryKey = [
          SALES_ORDER_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousCountries)
      }
    },

    onSettled: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [SALES_ORDER_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useBulkDeleteSalesOrder() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    // Change mutationFn to accept an array of IDs
    mutationFn: (ids: number[]) => salesOrder.bulkDelete(ids),
    onMutate: async (ids) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [SALES_ORDER_KEYS.all],
        exact: false,
      })

      const queryKey = [
        SALES_ORDER_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      // Snapshot the previous value
      const previousItems = queryClient.getQueryData<SalesOrderPaginator>(queryKey)

      // Optimistically remove multiple items from the list
      queryClient.setQueryData<SalesOrderPaginator>(queryKey, (old) => {
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
          SALES_ORDER_KEYS.all,
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
        queryKey: [SALES_ORDER_KEYS.all],
        exact: false,
      })
    },
  })
}
