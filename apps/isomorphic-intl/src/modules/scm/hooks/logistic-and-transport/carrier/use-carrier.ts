"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";



import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";



import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "@/config/constants";
import { routes } from "@/config/routes";
import { CarrierService } from "@/modules/scm/service/logistic-and-transport/carrier/carrier.service";
import { Carrier, CarrierPaginator, CarrierQueryOptions } from "@/modules/scm/types/logistics-and-transport/carriers/carriers-types";
import { DEFAULT_QUERY_OPTIONS, createQueryKeys } from "@/server/service/query-config";





const CARRIER_KEYS = createQueryKeys("carrier")

export function useCarrierList(options?: Partial<CarrierQueryOptions>) {
  const queryKey = [CARRIER_KEYS.all, options]

  return useQuery<CarrierPaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return CarrierService.all(Object.assign({}, queryKey[1], pageParam))
    },
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}

export function useCarrierById(id: number) {
  return useQuery({
    queryKey: [CARRIER_KEYS.detail(id)],
    queryFn: () => CarrierService.get(id),
    enabled: !!id,
    ...DEFAULT_QUERY_OPTIONS,
  })
}

export function useCreateCarrier() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")
  return useMutation({
    mutationFn: (data: Carrier): Promise<Carrier> =>
      CarrierService.create(data),
    onMutate: async (newCarrier) => {
      await queryClient.cancelQueries({
        queryKey: [CARRIER_KEYS.all],
        exact: false,
      })
      const queryKey = [
        CARRIER_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]
      const previousCarrier =
        queryClient.getQueryData<CarrierPaginator>(queryKey)
      queryClient.setQueryData<CarrierPaginator>(queryKey, (old) => {
        if (!old)
          return {
            data: [newCarrier],
            count: 1,
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          }
        return {
          ...old,
          data: [...old.data, { ...newCarrier, id: Date.now() }],
          count: old.count + 1,
        }
      })
      return { previousCarrier }
    },
    onSuccess: () => {
      toast.success(t("form-successfully-created"))
      router.push(routes.scm.logisticsAndTransport.settings.carriers)
    },
    onError: (err: any, newCarrier, context) => {
      if (context?.previousCarrier) {
        const queryKey = [
          CARRIER_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousCarrier)
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
        queryKey: [CARRIER_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useUpdateCarrier() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")
  return useMutation({
    mutationFn: ({ data }: { data: Carrier }) => CarrierService.update(data),
    onMutate: async ({ data }) => {
      await queryClient.cancelQueries({
        queryKey: [CARRIER_KEYS.all],
        exact: false,
      })
      await queryClient.cancelQueries({
        queryKey: [CARRIER_KEYS.detail(data.id!)],
      })
      const queryKey = [
        CARRIER_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]
      const previousCarrier =
        queryClient.getQueryData<CarrierPaginator>(queryKey)
      const previousCarrierDetail = queryClient.getQueryData<Carrier>(
        CARRIER_KEYS.detail(data.id!)
      )
      queryClient.setQueryData<CarrierPaginator>(queryKey, (old) => {
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
      queryClient.setQueryData(CARRIER_KEYS.detail(data.id!), data)
      return { previousCarrier, previousCarrierDetail }
    },
    onError: (err: any, variables, context) => {
      if (context?.previousCarrier) {
        const queryKey = [
          CARRIER_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousCarrier)
      }
      if (context?.previousCarrierDetail) {
        queryClient.setQueryData(
          CARRIER_KEYS.detail(variables.data.id!),
          context.previousCarrierDetail
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
        queryKey: [CARRIER_KEYS.all],
        exact: false,
      })
      if (data?.id) {
        queryClient.invalidateQueries({
          queryKey: [CARRIER_KEYS.detail(data.id!)],
        })
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: CARRIER_KEYS.all })
      queryClient.invalidateQueries({
        queryKey: [CARRIER_KEYS.detail(data.id!)],
      })
      toast.success(t("form-successfully-updated"))
      router.push(routes.scm.logisticsAndTransport.settings.carriers)
    },
  })
}

export function useDeleteCarrier() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (id: number) => CarrierService.delete(id),
    onMutate: async (id) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [CARRIER_KEYS.all],
        exact: false,
      })

      const queryKey = [
        CARRIER_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      // Snapshot the previous value
      const previousCarrier =
        queryClient.getQueryData<CarrierPaginator>(queryKey)

      // Optimistically remove the COA from the list
      queryClient.setQueryData<CarrierPaginator>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => item.id !== id),
          count: old.count - 1,
        }
      })

      return { previousCarrier }
    },

    onSuccess: () => {
      toast.success(t("form-successfully-deleted"))
    },

    onError: (err: any, variables, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousCarrier) {
        const queryKey = [
          CARRIER_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousCarrier)
      }
      toast.error(t("form-error-delete-dependency"))
      // toast.error(err.response.data)
    },

    onSettled: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [CARRIER_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useBulkDeleteCarrier() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    // Change mutationFn to accept an array of IDs
    mutationFn: (ids: number[]) => CarrierService.bulkDelete(ids),
    onMutate: async (ids) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [CARRIER_KEYS.all],
        exact: false,
      })

      const queryKey = [
        CARRIER_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      // Snapshot the previous value
      const previousCarrier =
        queryClient.getQueryData<CarrierPaginator>(queryKey)

      // Optimistically remove multiple items from the list
      queryClient.setQueryData<CarrierPaginator>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => !ids.includes(item.id!)),
          count: old.count - ids.length,
        }
      })

      return { previousCarrier }
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
      if (context?.previousCarrier) {
        const queryKey = [
          CARRIER_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousCarrier)
        toast.error(t("form-error-bulk-delete"))
        // toast.error(err.response.data)
      }
    },

    onSettled: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [CARRIER_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useCarrierOperations() {
  const queryClient = useQueryClient()

  const invalidateCarrierQueries = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: CARRIER_KEYS.all })
  }, [queryClient])

  return {
    invalidateCarrierQueries,
  }
}