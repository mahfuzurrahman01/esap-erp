"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";



import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";



import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "@/config/constants";
import { routes } from "@/config/routes";
import { WorkOrderService } from "@/modules/scm/service/production-control/work-order-tracking/work-order.service";
import { WorkOrder, WorkOrderPaginator, WorkOrderQueryOptions } from "@/modules/scm/types/production-control/work-order-tracking/work-order-types";
import { DEFAULT_QUERY_OPTIONS, createQueryKeys } from "@/server/service/query-config";





const WORK_ORDER_TRACKING_KEYS = createQueryKeys("work-order-tracking")

export function useWorkOrderTrackingList(
  options?: Partial<WorkOrderQueryOptions>
) {
  const queryKey = [WORK_ORDER_TRACKING_KEYS.all, options]

  return useQuery<WorkOrderPaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return WorkOrderService.all(Object.assign({}, queryKey[1], pageParam))
    },
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}

export function useWorkOrderById(id: number) {
  return useQuery({
    queryKey: [WORK_ORDER_TRACKING_KEYS.detail(id)],
    queryFn: () => WorkOrderService.get(id),
    enabled: !!id,
    ...DEFAULT_QUERY_OPTIONS,
  })
}

export function useCreateWorkOrder() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")
  const router = useRouter()

  return useMutation({
    mutationFn: (data: WorkOrder): Promise<WorkOrder> =>
      WorkOrderService.create(data),
    onMutate: async (newWorkOrder) => {
      await queryClient.cancelQueries({
        queryKey: [WORK_ORDER_TRACKING_KEYS.all],
        exact: false,
      })
      const queryKey = [
        WORK_ORDER_TRACKING_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]
      const previousWorkOrders =
        queryClient.getQueryData<WorkOrderPaginator>(queryKey)
      queryClient.setQueryData<WorkOrderPaginator>(queryKey, (old) => {
        if (!old)
          return {
            data: [newWorkOrder],
            count: 1,
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          }
        return {
          ...old,
          data: [...old.data, { ...newWorkOrder, id: Date.now() }],
          count: old.count + 1,
        }
      })
      return { previousWorkOrders }
    },
    onSuccess: () => {
      toast.success(t("form-created-successfully"))
      router.push(routes.scm.productionControl.workOrderTracking.workOrderTracking)
    },
    onError: (err: any, newWorkOrder, context) => {
      if (context?.previousWorkOrders) {
        const queryKey = [
          WORK_ORDER_TRACKING_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousWorkOrders)
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
        queryKey: [WORK_ORDER_TRACKING_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useUpdateWorkOrder() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")
  const router = useRouter()
  return useMutation({
    mutationFn: ({ data }: { data: WorkOrder }) =>
      WorkOrderService.update(data),
    onMutate: async ({ data }) => {
      await queryClient.cancelQueries({
        queryKey: [WORK_ORDER_TRACKING_KEYS.all],
        exact: false,
      })
      await queryClient.cancelQueries({
        queryKey: [WORK_ORDER_TRACKING_KEYS.detail(data.id!)],
      })
      const queryKey = [
        WORK_ORDER_TRACKING_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]
      const previousWorkOrders =
        queryClient.getQueryData<WorkOrderPaginator>(queryKey)
      const previousWorkOrder = queryClient.getQueryData<WorkOrder>(
        WORK_ORDER_TRACKING_KEYS.detail(data.id!)
      )
      queryClient.setQueryData<WorkOrderPaginator>(queryKey, (old) => {
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
      queryClient.setQueryData(WORK_ORDER_TRACKING_KEYS.detail(data.id!), data)
      return { previousWorkOrders, previousWorkOrder }
    },
    onError: (err: any, variables, context) => {
      if (context?.previousWorkOrders) {
        const queryKey = [
          WORK_ORDER_TRACKING_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousWorkOrders)
      }
      if (context?.previousWorkOrder) {
        queryClient.setQueryData(
          WORK_ORDER_TRACKING_KEYS.detail(variables.data.id!),
          context.previousWorkOrder
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
        queryKey: [WORK_ORDER_TRACKING_KEYS.all],
        exact: false,
      })
      if (data?.id) {
        queryClient.invalidateQueries({
          queryKey: [WORK_ORDER_TRACKING_KEYS.detail(data.id!)],
        })
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [WORK_ORDER_TRACKING_KEYS.all],
      })
      queryClient.invalidateQueries({
        queryKey: [WORK_ORDER_TRACKING_KEYS.detail(data.id!)],
      })
      toast.success(t("form-updated-successfully"))
      router.push(routes.scm.productionControl.workOrderTracking.workOrderTracking)
    },
  })
}

export function useDeleteWorkOrder() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (id: number) => WorkOrderService.delete(id),
    onMutate: async (id) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [WORK_ORDER_TRACKING_KEYS.all],
        exact: false,
      })

      const queryKey = [
        WORK_ORDER_TRACKING_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      // Snapshot the previous value
      const previousWorkOrders =
        queryClient.getQueryData<WorkOrderPaginator>(queryKey)

      // Optimistically remove the stock transfer from the list
      queryClient.setQueryData<WorkOrderPaginator>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => item.id !== id),
          count: old.count - 1,
        }
      })

      return { previousWorkOrders }
    },

    onSuccess: () => {
      toast.success(t("form-successfully-deleted"))
    },

    onError: (err: any, variables, context) => {
      if (context?.previousWorkOrders) {
        const queryKey = [
          WORK_ORDER_TRACKING_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousWorkOrders)
      }
      toast.error(t("form-error-delete"))
      // toast.error(err?.response?.data)
    },

    onSettled: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [WORK_ORDER_TRACKING_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useBulkDeleteWorkOrder() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    // Change mutationFn to accept an array of IDs
    mutationFn: (ids: number[]) => WorkOrderService.bulkDelete(ids),
    onMutate: async (ids) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [WORK_ORDER_TRACKING_KEYS.all],
        exact: false,
      })

      const queryKey = [
        WORK_ORDER_TRACKING_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      // Snapshot the previous value
      const previousWorkOrders =
        queryClient.getQueryData<WorkOrderPaginator>(queryKey)

      // Optimistically remove multiple items from the list
      queryClient.setQueryData<WorkOrderPaginator>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => !ids.includes(item.id!)),
          count: old.count - ids.length,
        }
      })

      return { previousWorkOrders }
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
      if (context?.previousWorkOrders) {
        const queryKey = [
          WORK_ORDER_TRACKING_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousWorkOrders)
      }
      toast.error(t("form-error-bulk-delete"))
      // toast.error(err?.response?.data)
    },

    onSettled: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [WORK_ORDER_TRACKING_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useWorkOrderOperations() {
  const queryClient = useQueryClient()

  const invalidateWorkOrdersQueries = useCallback(() => {
    queryClient.invalidateQueries({
      queryKey: ["work-orders-list"],
    })
  }, [queryClient])

  return {
    invalidateWorkOrdersQueries,
  }
}