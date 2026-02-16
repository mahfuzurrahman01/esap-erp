"use client";

import { useRouter } from "next/navigation";



import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";



import { DEFAULT_PAGE_SIZE } from "@/config/constants";
import { DEFAULT_PAGE_INDEX } from "@/config/constants";
import { routes } from "@/config/routes";
import { PurchasedOrderService } from "@/modules/scm/service/procurement/purchased-order/purchased-order.service";
import { PurchasedOrder, PurchasedOrderInput, PurchasedOrderPaginator, PurchasedOrderQueryOptions, PurchasedOrderUpdate } from "@/modules/scm/types/procurement/purchased-order/purchased-order-types";
import { DEFAULT_QUERY_OPTIONS, createQueryKeys } from "@/server/service/query-config";





const PURCHASED_ORDER_KEYS = createQueryKeys("purchased-order")

export function usePurchasedOrderList(
  options?: Partial<PurchasedOrderQueryOptions>
) {
  const queryKey = [PURCHASED_ORDER_KEYS.all, options]

  return useQuery<PurchasedOrderPaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return PurchasedOrderService.all(
        Object.assign({}, queryKey[1], pageParam)
      )
    },
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}

export function usePurchasedOrderById(id: number) {
  return useQuery({
    queryKey: [PURCHASED_ORDER_KEYS.detail(id)],
    queryFn: () => PurchasedOrderService.get(id),
    enabled: !!id,
    ...DEFAULT_QUERY_OPTIONS,
  })
}

export function useCreatePurchasedOrder() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")
  return useMutation({
    mutationFn: (data: PurchasedOrderInput): Promise<PurchasedOrderInput> =>
      PurchasedOrderService.create(data),
    onMutate: async (newPurchasedOrder) => {
      await queryClient.cancelQueries({
        queryKey: [PURCHASED_ORDER_KEYS.all],
        exact: false,
      })
      const queryKey = [
        PURCHASED_ORDER_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]
      const previousPurchasedOrder =
        queryClient.getQueryData<PurchasedOrderPaginator>(queryKey)
      queryClient.setQueryData<PurchasedOrderPaginator>(queryKey, (old) => {
        if (!old)
          return {
            data: [newPurchasedOrder as PurchasedOrder],
            count: 1,
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          }
        return {
          ...old,
          data: [
            ...old.data,
            {
              ...newPurchasedOrder,
              id: Date.now(),
            } as PurchasedOrder,
          ],
          count: old.count + 1,
        }
      })
      return { previousPurchasedOrder }
    },
    onSuccess: () => {
      toast.success(t("form-successfully-created"))
      router.push(routes.scm.procurement.purchaseOrders.purchaseOrders)
    },
    onError: (err: any, newPurchasedOrder, context) => {
      if (context?.previousPurchasedOrder) {
        const queryKey = [
          PURCHASED_ORDER_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousPurchasedOrder)
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
        queryKey: [PURCHASED_ORDER_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useUpdatePurchasedOrder() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")
  return useMutation({
    mutationFn: ({ data }: { data: PurchasedOrderUpdate }) =>
      PurchasedOrderService.update(data),
    onMutate: async ({ data }) => {
      await queryClient.cancelQueries({
        queryKey: [PURCHASED_ORDER_KEYS.all],
        exact: false,
      })
      await queryClient.cancelQueries({
        queryKey: PURCHASED_ORDER_KEYS.detail(data.id!),
      })
      const queryKey = [
        PURCHASED_ORDER_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]
      const previousPurchasedOrder =
        queryClient.getQueryData<PurchasedOrderPaginator>(queryKey)
      const previousPurchasedOrderDetail =
        queryClient.getQueryData<PurchasedOrder>(
          PURCHASED_ORDER_KEYS.detail(data.id!)
        )
      queryClient.setQueryData<PurchasedOrderPaginator>(
        queryKey,
        (old) => {
          if (!old) {
            return {
              data: [data as unknown as PurchasedOrder],
              count: 1,
              pageIndex: DEFAULT_PAGE_INDEX,
              pageSize: DEFAULT_PAGE_SIZE,
            }
          }
          return {
            ...old,
            data: old.data.map((item) =>
              item.id === data.id ? { ...item, ...data } : item
            ),
          }
        }
      )
      queryClient.setQueryData(PURCHASED_ORDER_KEYS.detail(data.id!), data)
      return { previousPurchasedOrder, previousPurchasedOrderDetail }
    },
    onError: (err: any, variables, context) => {
      if (context?.previousPurchasedOrder) {
        const queryKey = [
          PURCHASED_ORDER_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousPurchasedOrder)
      }
      if (context?.previousPurchasedOrderDetail) {
        queryClient.setQueryData(
          PURCHASED_ORDER_KEYS.detail(variables.data.id!),
          context.previousPurchasedOrderDetail
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
        queryKey: [PURCHASED_ORDER_KEYS.all],
        exact: false,
      })
      if (data?.id) {
        queryClient.invalidateQueries({
          queryKey: PURCHASED_ORDER_KEYS.detail(data.id!),
        })
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: PURCHASED_ORDER_KEYS.all })
      queryClient.invalidateQueries({
        queryKey: [PURCHASED_ORDER_KEYS.detail(data.id!)],
      })
      toast.success(t("form-successfully-updated"))
      router.push(routes.scm.procurement.purchaseOrders.purchaseOrders)
    },
  })
}

export function useDeletePurchasedOrder() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (id: number) => PurchasedOrderService.delete(id),
    onMutate: async (id) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [PURCHASED_ORDER_KEYS.all],
        exact: false,
      })

      const queryKey = [
        PURCHASED_ORDER_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      // Snapshot the previous value
      const previousPurchasedOrder =
        queryClient.getQueryData<PurchasedOrderPaginator>(queryKey)

      // Optimistically remove the COA from the list
      queryClient.setQueryData<PurchasedOrderPaginator>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => item.id !== id),
          count: old.count - 1,
        }
      })

      return { previousPurchasedOrder }
    },

    onSuccess: () => {
      toast.success(t("form-successfully-deleted"))
    },

    onError: (err: any, variables, context) => {
      toast.error(t("form-error-deleting-dependency"))
      // toast.error(err.response?.data?.errors)
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousPurchasedOrder) {
        const queryKey = [
          PURCHASED_ORDER_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousPurchasedOrder)
      }
      // toast.error(err.response.data)
    },

    onSettled: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [PURCHASED_ORDER_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useBulkDeletePurchasedOrder() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    // Change mutationFn to accept an array of IDs
    mutationFn: (ids: number[]) => PurchasedOrderService.bulkDelete(ids),
    onMutate: async (ids) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [PURCHASED_ORDER_KEYS.all],
        exact: false,
      })

      const queryKey = [
        PURCHASED_ORDER_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      // Snapshot the previous value
      const previousPurchasedOrder =
        queryClient.getQueryData<PurchasedOrderPaginator>(queryKey)

      // Optimistically remove multiple items from the list
      queryClient.setQueryData<PurchasedOrderPaginator>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => !ids.includes(item.id!)),
          count: old.count - ids.length,
        }
      })

      return { previousPurchasedOrder }
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
      // toast.error(err.response?.data?.errors)
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousPurchasedOrder) {
        const queryKey = [
          PURCHASED_ORDER_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousPurchasedOrder)
      }
    },

    onSettled: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [PURCHASED_ORDER_KEYS.all],
        exact: false,
      })
    },
  })
}