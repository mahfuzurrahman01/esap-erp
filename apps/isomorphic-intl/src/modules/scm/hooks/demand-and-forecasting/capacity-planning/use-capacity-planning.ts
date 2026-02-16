"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";



import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";



import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "@/config/constants";
import { routes } from "@/config/routes";
import { CapacityPlanningService } from "@/modules/scm/service/demand-and-forecasting/capacity-planning/capacity-planning.service";
import { CapacityPlanning, CapacityPlanningPaginator, CapacityPlanningQueryOptions } from "@/modules/scm/types/demand-and-forecasting/capacity-planning/capacity-planning-types";
import { DEFAULT_QUERY_OPTIONS, createQueryKeys } from "@/server/service/query-config";

const CAPACITY_PLANNING_KEYS = createQueryKeys("capacity-planning")

export function useCapacityPlanningList(
  options?: Partial<CapacityPlanningQueryOptions>
) {
  const queryKey = [CAPACITY_PLANNING_KEYS.all, options]

  return useQuery<CapacityPlanningPaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return CapacityPlanningService.all(
        Object.assign({}, queryKey[1], pageParam)
      )
    },
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}

export function useCapacityPlanningById(id: number) {
  return useQuery({
    queryKey: [CAPACITY_PLANNING_KEYS.detail(id)],
    queryFn: () => CapacityPlanningService.get(id),
    enabled: !!id,
    ...DEFAULT_QUERY_OPTIONS,
  })
}

export function useCreateCapacityPlanning() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: CapacityPlanning): Promise<CapacityPlanning> =>
      CapacityPlanningService.create(data),
    onMutate: async (newCapacityPlanning) => {
      await queryClient.cancelQueries({
        queryKey: [CAPACITY_PLANNING_KEYS.all],
        exact: false,
      })
      const queryKey = [
        CAPACITY_PLANNING_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]
      const previousCapacityPlanning =
        queryClient.getQueryData<CapacityPlanningPaginator>(queryKey)
      queryClient.setQueryData<CapacityPlanningPaginator>(queryKey, (old) => {
        if (!old)
          return {
            data: [newCapacityPlanning],
            count: 1,
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          }
        return {
          ...old,
          data: [...old.data, { ...newCapacityPlanning, id: Date.now() }],
          count: old.count + 1,
        }
      })
      return { previousCapacityPlanning }
    },
    onSuccess: () => {
      router.push(
        routes.scm.demandForecasting.capacityPlanning.capacityPlanning
      )
      toast.success(t("form-successfully-created"))
    },
    onError: (err: any, newCapacityPlanning, context) => {
      if (context?.previousCapacityPlanning) {
        const queryKey = [
          CAPACITY_PLANNING_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousCapacityPlanning)
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
        queryKey: [CAPACITY_PLANNING_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useUpdateCapacityPlanning() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")
  return useMutation({
    mutationFn: ({ data }: { data: CapacityPlanning }) =>
      CapacityPlanningService.update(data),
    onMutate: async ({ data }) => {
      await queryClient.cancelQueries({
        queryKey: [CAPACITY_PLANNING_KEYS.all],
        exact: false,
      })
      await queryClient.cancelQueries({
        queryKey: CAPACITY_PLANNING_KEYS.detail(data.id!),
      })
      const queryKey = [
        CAPACITY_PLANNING_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]
      const previousCapacityPlanning =
        queryClient.getQueryData<CapacityPlanningPaginator>(queryKey)
      const previousCapacityPlanningDetail =
        queryClient.getQueryData<CapacityPlanning>(
          CAPACITY_PLANNING_KEYS.detail(data.id!)
        )
      queryClient.setQueryData<CapacityPlanningPaginator>(queryKey, (old) => {
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
      queryClient.setQueryData(CAPACITY_PLANNING_KEYS.detail(data.id!), data)
      return { previousCapacityPlanning, previousCapacityPlanningDetail }
    },
    onError: (err: any, variables, context) => {
      if (context?.previousCapacityPlanning) {
        const queryKey = [
          CAPACITY_PLANNING_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousCapacityPlanning)
      }
      if (context?.previousCapacityPlanningDetail) {
        queryClient.setQueryData(
          CAPACITY_PLANNING_KEYS.detail(variables.data.id!),
          context.previousCapacityPlanningDetail
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
        queryKey: [CAPACITY_PLANNING_KEYS.all],
        exact: false,
      })
      if (data?.id) {
        queryClient.invalidateQueries({
          queryKey: CAPACITY_PLANNING_KEYS.detail(data.id!),
        })
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: CAPACITY_PLANNING_KEYS.all })
      queryClient.invalidateQueries({
        queryKey: CAPACITY_PLANNING_KEYS.detail(data.id!),
      })
      router.push(
        routes.scm.demandForecasting.capacityPlanning.capacityPlanning
      )
      toast.success(t("form-successfully-updated"))
    },
  })
}

export function useDeleteCapacityPlanning() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (id: number) => CapacityPlanningService.delete(id),
    onMutate: async (id) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [CAPACITY_PLANNING_KEYS.all],
        exact: false,
      })

      const queryKey = [
        CAPACITY_PLANNING_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      // Snapshot the previous value
      const previousCapacityPlanning =
        queryClient.getQueryData<CapacityPlanningPaginator>(queryKey)

      // Optimistically remove the COA from the list
      queryClient.setQueryData<CapacityPlanningPaginator>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => item.id !== id),
          count: old.count - 1,
        }
      })

      return { previousCapacityPlanning }
    },

    onSuccess: () => {
      toast.success(t("form-successfully-deleted"))
    },

    onError: (err: any, variables, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousCapacityPlanning) {
        const queryKey = [
          CAPACITY_PLANNING_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousCapacityPlanning)
      }
      toast.error(t("form-error-delete"))
    },

    onSettled: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [CAPACITY_PLANNING_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useBulkDeleteCapacityPlanning() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    // Change mutationFn to accept an array of IDs
    mutationFn: (ids: number[]) => CapacityPlanningService.bulkDelete(ids),
    onMutate: async (ids) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [CAPACITY_PLANNING_KEYS.all],
        exact: false,
      })

      const queryKey = [
        CAPACITY_PLANNING_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      // Snapshot the previous value
      const previousCapacityPlanning =
        queryClient.getQueryData<CapacityPlanningPaginator>(queryKey)

      // Optimistically remove multiple items from the list
      queryClient.setQueryData<CapacityPlanningPaginator>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => !ids.includes(item.id!)),
          count: old.count - ids.length,
        }
      })

      return { previousCapacityPlanning }
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
      if (context?.previousCapacityPlanning) {
        const queryKey = [
          CAPACITY_PLANNING_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousCapacityPlanning)
      }
      toast.error(t("form-error-bulk-delete"))
    },

    onSettled: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [CAPACITY_PLANNING_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useCapacityPlanningOperations() {
  const queryClient = useQueryClient()

  const invalidateCapacityPlanningQueries = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: [CAPACITY_PLANNING_KEYS.all] })
  }, [queryClient])

  return {
    invalidateCapacityPlanningQueries,
  }
}