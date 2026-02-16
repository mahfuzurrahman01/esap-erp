"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";



import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";



import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "@/config/constants";
import { routes } from "@/config/routes";
import { ShipmentService } from "@/modules/scm/service/logistic-and-transport/shipment/shipment.service";
import { Shipment, ShipmentPaginator, ShipmentQueryOptions } from "@/modules/scm/types/logistics-and-transport/shipment/shipment-types";
import { DEFAULT_QUERY_OPTIONS, createQueryKeys } from "@/server/service/query-config";





const SHIPMENT_KEYS = createQueryKeys("shipment")

export function useShipmentList(options?: Partial<ShipmentQueryOptions>) {
  const queryKey = [SHIPMENT_KEYS.all, options]

  return useQuery<ShipmentPaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return ShipmentService.all(Object.assign({}, queryKey[1], pageParam))
    },
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}

export function useShipmentById(id: number) {
  return useQuery({
    queryKey: [SHIPMENT_KEYS.detail(id)],
    queryFn: () => ShipmentService.get(id),
    enabled: !!id,
    ...DEFAULT_QUERY_OPTIONS,
  })
}

export function useCreateShipment() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")
  return useMutation({
    mutationFn: (data: Shipment): Promise<Shipment> =>
      ShipmentService.create(data),
    onMutate: async (newShipment) => {
      await queryClient.cancelQueries({
        queryKey: [SHIPMENT_KEYS.all],
        exact: false,
      })
      const queryKey = [
        SHIPMENT_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]
      const previousShipment =
        queryClient.getQueryData<ShipmentPaginator>(queryKey)
      queryClient.setQueryData<ShipmentPaginator>(queryKey, (old) => {
        if (!old)
          return {
            data: [newShipment],
            count: 1,
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          }
        return {
          ...old,
          data: [...old.data, { ...newShipment, id: Date.now() }],
          count: old.count + 1,
        }
      })
      return { previousShipment }
    },
    onSuccess: () => {
      toast.success(t("form-successfully-created"))
      router.push(routes.scm.logisticsAndTransport.shipment.shipment)
    },
    onError: (err: any, newShipment, context) => {
      if (context?.previousShipment) {
        const queryKey = [
          SHIPMENT_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousShipment)
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
        queryKey: [SHIPMENT_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useUpdateShipment() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")
  return useMutation({
    mutationFn: ({ data }: { data: Shipment }) => ShipmentService.update(data),
    onMutate: async ({ data }) => {
      await queryClient.cancelQueries({
        queryKey: [SHIPMENT_KEYS.all],
        exact: false,
      })
      await queryClient.cancelQueries({
        queryKey: [SHIPMENT_KEYS.detail(data.id!)],
      })
      const queryKey = [
        SHIPMENT_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]
      const previousShipment =
        queryClient.getQueryData<ShipmentPaginator>(queryKey)
      const previousShipmentDetail = queryClient.getQueryData<Shipment>(
        SHIPMENT_KEYS.detail(data.id!)
      )
      queryClient.setQueryData<ShipmentPaginator>(queryKey, (old) => {
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
      queryClient.setQueryData(SHIPMENT_KEYS.detail(data.id!), data)
      return { previousShipment, previousShipmentDetail }
    },
    onError: (err: any, variables, context) => {
      if (context?.previousShipment) {
        const queryKey = [
          SHIPMENT_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousShipment)
      }
      if (context?.previousShipmentDetail) {
        queryClient.setQueryData(
          SHIPMENT_KEYS.detail(variables.data.id!),
          context.previousShipmentDetail
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
        queryKey: [SHIPMENT_KEYS.all],
        exact: false,
      })
      if (data?.id) {
        queryClient.invalidateQueries({
          queryKey: [SHIPMENT_KEYS.detail(data.id!)],
        })
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [SHIPMENT_KEYS.all] })
      queryClient.invalidateQueries({
        queryKey: [SHIPMENT_KEYS.detail(data.id!)],
      })
      toast.success(t("form-successfully-updated"))
      router.push(routes.scm.logisticsAndTransport.shipment.shipment)
    },
  })
}

export function usePatchShipmentReceived() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")
  return useMutation({
    mutationFn: ({ data }: { data: Shipment }) => ShipmentService.patch(data),
    onMutate: async ({ data }) => {
      await queryClient.cancelQueries({
        queryKey: [SHIPMENT_KEYS.all],
        exact: false,
      })
      await queryClient.cancelQueries({
        queryKey: [SHIPMENT_KEYS.detail(data.id!)],
      })
      const queryKey = [
        SHIPMENT_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]
      const previousShipment =
        queryClient.getQueryData<ShipmentPaginator>(queryKey)
      const previousShipmentDetail = queryClient.getQueryData<Shipment>(
        SHIPMENT_KEYS.detail(data.id!)
      )
      queryClient.setQueryData<ShipmentPaginator>(queryKey, (old) => {
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
      queryClient.setQueryData([SHIPMENT_KEYS.detail(data.id!)], data)
      return { previousShipment, previousShipmentDetail }
    },
    onError: (err: any, variables, context) => {
      if (context?.previousShipment) {
        const queryKey = [
          SHIPMENT_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousShipment)
      }
      if (context?.previousShipmentDetail) {
        queryClient.setQueryData(
          [SHIPMENT_KEYS.detail(variables.data.id!)],
          context.previousShipmentDetail
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
        queryKey: [SHIPMENT_KEYS.all],
        exact: false,
      })
      if (data?.id) {
        queryClient.invalidateQueries({
          queryKey: [SHIPMENT_KEYS.detail(data.id!)],
        })
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [SHIPMENT_KEYS.all] })
      queryClient.invalidateQueries({
        queryKey: [SHIPMENT_KEYS.detail(data.id!)],
      })
      toast.success(t("form-successfully-patched"))
      router.push(routes.scm.logisticsAndTransport.shipment.shipment)
    },
  })
}

export function useDeleteShipment() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (id: number) => ShipmentService.delete(id),
    onMutate: async (id) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [SHIPMENT_KEYS.all],
        exact: false,
      })

      const queryKey = [
        SHIPMENT_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      // Snapshot the previous value
      const previousShipment =
        queryClient.getQueryData<ShipmentPaginator>(queryKey)

      // Optimistically remove the COA from the list
      queryClient.setQueryData<ShipmentPaginator>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => item.id !== id),
          count: old.count - 1,
        }
      })

      return { previousShipment }
    },

    onSuccess: () => {
      toast.success(t("form-successfully-deleted"))
    },

    onError: (err: any, variables, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousShipment) {
        const queryKey = [
          SHIPMENT_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousShipment)
      }
      toast.error(t("form-error-deleting"))
      // toast.error(err.response.data)
    },

    onSettled: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [SHIPMENT_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useBulkDeleteShipment() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    // Change mutationFn to accept an array of IDs
    mutationFn: (ids: number[]) => ShipmentService.bulkDelete(ids),
    onMutate: async (ids) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [SHIPMENT_KEYS.all],
        exact: false,
      })

      const queryKey = [
        SHIPMENT_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      // Snapshot the previous value
      const previousShipment =
        queryClient.getQueryData<ShipmentPaginator>(queryKey)

      // Optimistically remove multiple items from the list
      queryClient.setQueryData<ShipmentPaginator>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => !ids.includes(item.id!)),
          count: old.count - ids.length,
        }
      })

      return { previousShipment }
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
      if (context?.previousShipment) {
        const queryKey = [
          SHIPMENT_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousShipment)
        toast.error(t("form-error-bulk-delete"))
        // toast.error(err.response.data)
      }
    },

    onSettled: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [SHIPMENT_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useShipmentOperations() {
  const queryClient = useQueryClient()

  const invalidateShipmentQueries = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: SHIPMENT_KEYS.all })
  }, [queryClient])

  return {
    invalidateShipmentQueries,
  }
}