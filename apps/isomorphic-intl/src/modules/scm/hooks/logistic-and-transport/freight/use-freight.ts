"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";



import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";



import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "@/config/constants";
import { routes } from "@/config/routes";
import { FreightService } from "@/modules/scm/service/logistic-and-transport/freight/freight.service";
import { Freight, FreightPaginator, FreightQueryOptions } from "@/modules/scm/types/logistics-and-transport/freight/freight-types";
import { DEFAULT_QUERY_OPTIONS, createQueryKeys } from "@/server/service/query-config";





const FREIGHT_KEYS = createQueryKeys("freight")

export function useFreightList(options?: Partial<FreightQueryOptions>) {
  const queryKey = [FREIGHT_KEYS.all, options]

  return useQuery<FreightPaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return FreightService.all(Object.assign({}, queryKey[1], pageParam))
    },
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}

export function useFreightById(id: number) {
  return useQuery({
    queryKey: [FREIGHT_KEYS.detail(id)],
    queryFn: () => FreightService.get(id),
    enabled: !!id,
    ...DEFAULT_QUERY_OPTIONS,
  })
}

export function useCreateFreight() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")
  return useMutation({
    mutationFn: (data: Freight): Promise<Freight> =>
      FreightService.create(data),
    onMutate: async (newFreight) => {
      await queryClient.cancelQueries({
        queryKey: [FREIGHT_KEYS.all],
        exact: false,
      })
      const queryKey = [
        FREIGHT_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]
      const previousFreight =
        queryClient.getQueryData<FreightPaginator>(queryKey)
      queryClient.setQueryData<FreightPaginator>(queryKey, (old) => {
        if (!old)
          return {
            data: [newFreight],
            count: 1,
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          }
        return {
          ...old,
          data: [...old.data, { ...newFreight, id: Date.now() }],
          count: old.count + 1,
        }
      })
      return { previousFreight }
    },
    onSuccess: () => {
      toast.success(t("form-successfully-created"))
      router.push(routes.scm.logisticsAndTransport.freight.freight)
    },
    onError: (err: any, newFreight, context) => {
      if (context?.previousFreight) {
        const queryKey = [
          FREIGHT_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousFreight)
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
        queryKey: [FREIGHT_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useUpdateFreight() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")
  return useMutation({
    mutationFn: ({ data }: { data: Freight }) => FreightService.update(data),
    onMutate: async ({ data }) => {
      await queryClient.cancelQueries({
        queryKey: [FREIGHT_KEYS.all],
        exact: false,
      })
      await queryClient.cancelQueries({
        queryKey: [FREIGHT_KEYS.detail(data.id!)],
      })
      const queryKey = [
        FREIGHT_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]
      const previousFreight =
        queryClient.getQueryData<FreightPaginator>(queryKey)
      const previousFreightDetail = queryClient.getQueryData<Freight>(
        FREIGHT_KEYS.detail(data.id!)
      )
      queryClient.setQueryData<FreightPaginator>(queryKey, (old) => {
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
      queryClient.setQueryData(FREIGHT_KEYS.detail(data.id!), data)
      return { previousFreight, previousFreightDetail }
    },
    onError: (err: any, variables, context) => {
      if (context?.previousFreight) {
        const queryKey = [
          FREIGHT_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousFreight)
      }
      if (context?.previousFreightDetail) {
        queryClient.setQueryData(
          FREIGHT_KEYS.detail(variables.data.id!),
          context.previousFreightDetail
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
        queryKey: [FREIGHT_KEYS.all],
        exact: false,
      })
      if (data?.id) {
        queryClient.invalidateQueries({
          queryKey: [FREIGHT_KEYS.detail(data.id!)],
        })
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: FREIGHT_KEYS.all })
      queryClient.invalidateQueries({
        queryKey: [FREIGHT_KEYS.detail(data.id!)],
      })
      toast.success(t("form-successfully-updated"))
      router.push(routes.scm.logisticsAndTransport.freight.freight)
    },
  })
}

export function useDeleteFreight() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (id: number) => FreightService.delete(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({
        queryKey: [FREIGHT_KEYS.all],
        exact: false,
      })

      const queryKey = [
        FREIGHT_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      // Snapshot the previous value
      const previousFreight =
        queryClient.getQueryData<FreightPaginator>(queryKey)

      // Optimistically remove the COA from the list
      queryClient.setQueryData<FreightPaginator>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => item.id !== id),
          count: old.count - 1,
        }
      })

      return { previousFreight }
    },

    onSuccess: () => {
      toast.success(t("form-successfully-deleted"))
    },

    onError: (err: any, variables, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousFreight) {
        const queryKey = [
          FREIGHT_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousFreight)
      }
      toast.error(t("form-error-delete-dependency"))
      // toast.error(err.response.data)
    },

    onSettled: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [FREIGHT_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useBulkDeleteFreight() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (ids: number[]) => FreightService.bulkDelete(ids),
    onMutate: async (ids) => {
      await queryClient.cancelQueries({
        queryKey: [FREIGHT_KEYS.all],
        exact: false,
      })

      const queryKey = [
        FREIGHT_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      // Snapshot the previous value
      const previousFreight =
        queryClient.getQueryData<FreightPaginator>(queryKey)

      // Optimistically remove multiple items from the list
      queryClient.setQueryData<FreightPaginator>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => !ids.includes(item.id!)),
          count: old.count - ids.length,
        }
      })

      return { previousFreight }
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
      if (context?.previousFreight) {
        const queryKey = [
          FREIGHT_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousFreight)
      }
      toast.error(t("form-error-bulk-delete"))
      // toast.error(err.response.data)
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [FREIGHT_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useFreightOperations() {
  const queryClient = useQueryClient()

  const invalidateFreightQueries = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: FREIGHT_KEYS.all })
  }, [queryClient])

  return {
    invalidateFreightQueries,
  }
}