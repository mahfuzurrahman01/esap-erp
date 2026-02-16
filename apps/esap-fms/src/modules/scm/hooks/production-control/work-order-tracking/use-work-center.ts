"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";



import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";



import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "@/config/constants";
import { routes } from "@/config/routes";
import { WorkCenterService } from "@/modules/scm/service/production-control/work-order-tracking/work-center.service";
import { WorkCenter, WorkCenterPaginator, WorkCenterQueryOptions } from "@/modules/scm/types/production-control/work-order-tracking/work-center-types";
import { DEFAULT_QUERY_OPTIONS, createQueryKeys } from "@/server/service/query-config";





const WORK_CENTER_KEYS = createQueryKeys("work-center")

export function useWorkCentersList(options?: Partial<WorkCenterQueryOptions>) {
  const queryKey = [WORK_CENTER_KEYS.all, options]

  return useQuery<WorkCenterPaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return WorkCenterService.all(Object.assign({}, queryKey[1], pageParam))
    },
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}

export function useWorkCenterById(id: number) {
  return useQuery({
    queryKey: [WORK_CENTER_KEYS.detail(id)],
    queryFn: () => WorkCenterService.get(id),
    enabled: !!id,
    ...DEFAULT_QUERY_OPTIONS,
  })
}

export function useCreateWorkCenter() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: WorkCenter): Promise<WorkCenter> =>
      WorkCenterService.create(data),
    onMutate: async (newWorkCenter) => {
      await queryClient.cancelQueries({
        queryKey: [WORK_CENTER_KEYS.all],
        exact: false,
      })
      const queryKey = [
        WORK_CENTER_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]
      const previousWorkCenters =
        queryClient.getQueryData<WorkCenterPaginator>(queryKey)
      queryClient.setQueryData<WorkCenterPaginator>(queryKey, (old) => {
        if (!old)
          return {
            data: [newWorkCenter],
            count: 1,
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          }
        return {
          ...old,
          data: [...old.data, { ...newWorkCenter, id: Date.now() }],
          count: old.count + 1,
        }
      })
      return { previousWorkCenters }
    },
    onSuccess: () => {
      toast.success(t("form-created-successfully"))
      router.push(routes.scm.productionControl.settings.workCenter)
    },
    onError: (err: any, newWorkCenter, context) => {
      if (context?.previousWorkCenters) {
        const queryKey = [
          WORK_CENTER_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousWorkCenters)
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
        queryKey: [WORK_CENTER_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useUpdateWorkCenter() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")
  const router = useRouter()
  return useMutation({
    mutationFn: ({ data }: { data: WorkCenter }) =>
      WorkCenterService.update(data),
    onMutate: async ({ data }) => {
      await queryClient.cancelQueries({
        queryKey: [WORK_CENTER_KEYS.all],
        exact: false,
      })
      await queryClient.cancelQueries({
        queryKey: [WORK_CENTER_KEYS.detail(data.id!)],
      })
      const queryKey = [
        WORK_CENTER_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]
      const previousWorkCenters =
        queryClient.getQueryData<WorkCenterPaginator>(queryKey)
      const previousWorkCenter = queryClient.getQueryData<WorkCenter>(
        WORK_CENTER_KEYS.detail(data.id!)
      )
      queryClient.setQueryData<WorkCenterPaginator>(queryKey, (old) => {
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
      queryClient.setQueryData(WORK_CENTER_KEYS.detail(data.id!), data)
      return { previousWorkCenters, previousWorkCenter }
    },
    onError: (err: any, variables, context) => {
      if (context?.previousWorkCenters) {
        const queryKey = [
          WORK_CENTER_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousWorkCenters)
      }
      if (context?.previousWorkCenter) {
        queryClient.setQueryData(
          WORK_CENTER_KEYS.detail(variables.data.id!),
          context.previousWorkCenter
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
        queryKey: [WORK_CENTER_KEYS.all],
        exact: false,
      })
      if (data?.id) {
        queryClient.invalidateQueries({
          queryKey: [WORK_CENTER_KEYS.detail(data.id!)],
        })
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [WORK_CENTER_KEYS.all],
      })
      queryClient.invalidateQueries({
        queryKey: [WORK_CENTER_KEYS.detail(data.id!)],
      })
      toast.success(t("form-updated-successfully"))
      router.push(routes.scm.productionControl.settings.workCenter)
    },
  })
}

export function useDeleteWorkCenter() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (id: number) => WorkCenterService.delete(id),
    onMutate: async (id) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [WORK_CENTER_KEYS.all],
        exact: false,
      })

      const queryKey = [
        WORK_CENTER_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      // Snapshot the previous value
      const previousWorkCenters =
        queryClient.getQueryData<WorkCenterPaginator>(queryKey)

      // Optimistically remove the stock transfer from the list
      queryClient.setQueryData<WorkCenterPaginator>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => item.id !== id),
          count: old.count - 1,
        }
      })

      return { previousWorkCenters }
    },

    onSuccess: () => {
      toast.success(t("form-successfully-deleted"))
    },

    onError: (err: any, variables, context) => {
      if (context?.previousWorkCenters) {
        const queryKey = [
          WORK_CENTER_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousWorkCenters)
      }
      toast.error(t("form-error-delete"))
      // toast.error(err?.response?.data)
    },

    onSettled: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [WORK_CENTER_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useBulkDeleteWorkCenter() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    // Change mutationFn to accept an array of IDs
    mutationFn: (ids: number[]) => WorkCenterService.bulkDelete(ids),
    onMutate: async (ids) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [WORK_CENTER_KEYS.all],
        exact: false,
      })

      const queryKey = [
        WORK_CENTER_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      // Snapshot the previous value
      const previousWorkCenters =
        queryClient.getQueryData<WorkCenterPaginator>(queryKey)

      // Optimistically remove multiple items from the list
      queryClient.setQueryData<WorkCenterPaginator>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => !ids.includes(item.id!)),
          count: old.count - ids.length,
        }
      })

      return { previousWorkCenters }
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
      if (context?.previousWorkCenters) {
        const queryKey = [
          WORK_CENTER_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousWorkCenters)
      }
      toast.error(t("form-error-bulk-delete"))
      // toast.error(err?.response?.data)
    },

    onSettled: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [WORK_CENTER_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useWorkCentersOperations() {
  const queryClient = useQueryClient()

  const invalidateWorkCentersQueries = useCallback(() => {
    queryClient.invalidateQueries({
      queryKey: ["work-centers-list"],
    })
  }, [queryClient])

  return {
    invalidateWorkCentersQueries,
  }
}