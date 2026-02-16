"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";



import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";



import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "@/config/constants";
import { routes } from "@/config/routes";
import { ForecastService } from "@/modules/scm/service/demand-and-forecasting/forecast/forecast.service";
import { Forecast, ForecastPaginator, ForecastQueryOptions } from "@/modules/scm/types/demand-and-forecasting/forecast/forecast-types";
import { DEFAULT_QUERY_OPTIONS, createQueryKeys } from "@/server/service/query-config";





const FORECAST_KEYS = createQueryKeys("forecast")

export function useForecastList(options?: Partial<ForecastQueryOptions>) {
  const queryKey = [FORECAST_KEYS.all, options]

  return useQuery<ForecastPaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return ForecastService.all(Object.assign({}, queryKey[1], pageParam))
    },
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}

export function useForecastById(id: number) {
  return useQuery({
    queryKey: [FORECAST_KEYS.detail(id)],
    queryFn: () => ForecastService.get(id),
    enabled: !!id,
    ...DEFAULT_QUERY_OPTIONS,
  })
}

export function useCreateForecast() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")
  return useMutation({
    mutationFn: (data: Forecast): Promise<Forecast> =>
      ForecastService.create(data),
    onMutate: async (newForecast) => {
      await queryClient.cancelQueries({
        queryKey: [FORECAST_KEYS.all],
        exact: false,
      })
      const queryKey = [
        FORECAST_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]
      const previousForecast =
        queryClient.getQueryData<ForecastPaginator>(queryKey)
      queryClient.setQueryData<ForecastPaginator>(queryKey, (old) => {
        if (!old)
          return {
            data: [newForecast],
            count: 1,
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          }
        return {
          ...old,
          data: [...old.data, { ...newForecast, id: Date.now() }],
          count: old.count + 1,
        }
      })
      return { previousForecast }
    },
    onSuccess: () => {
      router.push(routes.scm.demandForecasting.forecast.demandForecasting)
      toast.success(t("form-successfully-created"))
    },
    onError: (err: any, newForecast, context) => {
      if (context?.previousForecast) {
        const queryKey = [
          FORECAST_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousForecast)
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
        queryKey: [FORECAST_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useUpdateForecast() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")
  return useMutation({
    mutationFn: ({ data }: { data: Forecast }) => ForecastService.update(data),
    onMutate: async ({ data }) => {
      await queryClient.cancelQueries({
        queryKey: [FORECAST_KEYS.all],
        exact: false,
      })
      await queryClient.cancelQueries({
        queryKey: FORECAST_KEYS.detail(data.id!),
      })
      const queryKey = [
        FORECAST_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]
      const previousForecast =
        queryClient.getQueryData<ForecastPaginator>(queryKey)
      const previousForecastDetail = queryClient.getQueryData<Forecast>(
        FORECAST_KEYS.detail(data.id!)
      )
      queryClient.setQueryData<ForecastPaginator>(queryKey, (old) => {
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
      queryClient.setQueryData(FORECAST_KEYS.detail(data.id!), data)
      return { previousForecast, previousForecastDetail }
    },
    onError: (err: any, variables, context) => {
      if (context?.previousForecast) {
        const queryKey = [
          FORECAST_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousForecast)
      }
      if (context?.previousForecastDetail) {
        queryClient.setQueryData(
          FORECAST_KEYS.detail(variables.data.id!),
          context.previousForecastDetail
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
        queryKey: [FORECAST_KEYS.all],
        exact: false,
      })
      if (data?.id) {
        queryClient.invalidateQueries({
          queryKey: [FORECAST_KEYS.detail(data.id!)],
        })
      }
    },
    onSuccess: (data) => {
      toast.success(t("form-successfully-updated"))
      queryClient.invalidateQueries({ queryKey: FORECAST_KEYS.all })
      queryClient.invalidateQueries({
        queryKey: FORECAST_KEYS.detail(data.id!),
      })
      router.push(routes.scm.demandForecasting.forecast.demandForecasting)
    },
  })
}

export function useDeleteForecast() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (id: number) => ForecastService.delete(id),
    onMutate: async (id) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [FORECAST_KEYS.all],
        exact: false,
      })

      const queryKey = [
        FORECAST_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      // Snapshot the previous value
      const previousForecasts =
        queryClient.getQueryData<ForecastPaginator>(queryKey)

      // Optimistically remove the COA from the list
      queryClient.setQueryData<ForecastPaginator>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => item.id !== id),
          count: old.count - 1,
        }
      })

      return { previousForecasts }
    },

    onSuccess: () => {
      toast.success(t("form-successfully-deleted"))
    },

    onError: (err: any, variables, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousForecasts) {
        const queryKey = [
          FORECAST_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousForecasts)
      }
      toast.error(t("form-error-deleting-dependency"))
    },

    onSettled: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [FORECAST_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useBulkDeleteForecast() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    // Change mutationFn to accept an array of IDs
    mutationFn: (ids: number[]) => ForecastService.bulkDelete(ids),
    onMutate: async (ids) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [FORECAST_KEYS.all],
        exact: false,
      })

      const queryKey = [
        FORECAST_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      // Snapshot the previous value
      const previousForecasts =
        queryClient.getQueryData<ForecastPaginator>(queryKey)

      // Optimistically remove multiple items from the list
      queryClient.setQueryData<ForecastPaginator>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => !ids.includes(item.id!)),
          count: old.count - ids.length,
        }
      })

      return { previousForecasts }
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
      if (context?.previousForecasts) {
        const queryKey = [
          FORECAST_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousForecasts)
      }
      toast.error(t("form-error-deleting-dependency"))
    },

    onSettled: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [FORECAST_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useStockOperations() {
  const queryClient = useQueryClient()

  const invalidateForecastQueries = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ["forecast-list"] })
  }, [queryClient])

  return {
    invalidateForecastQueries,
  }
}