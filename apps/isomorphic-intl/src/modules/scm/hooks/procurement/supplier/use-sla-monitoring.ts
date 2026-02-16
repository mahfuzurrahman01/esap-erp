"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";



import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";



import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "@/config/constants";
import { routes } from "@/config/routes";
import { SLAMonitoringService } from "@/modules/scm/service/procurement/supplier/sla-monitoring.service";
import { ServiceLevelAgreementMonitoring, ServiceLevelAgreementMonitoringPaginator, SlaMonitoringInput } from "@/modules/scm/types/procurement/supplier/service-level-agreement-monitoring-types";
import { DEFAULT_QUERY_OPTIONS, createQueryKeys } from "@/server/service/query-config";





const SLA_MONITORING_KEYS = createQueryKeys("sla-monitoring")

export function useSLAMonitoringList(options?: Partial<any>) {
  const { data, isLoading, isError, isFetching, refetch } = useQuery<
    ServiceLevelAgreementMonitoring[],
    Error
  >({
    queryKey: [SLA_MONITORING_KEYS.all, options],
    queryFn: async () => {
      const response = await SLAMonitoringService.all(options ?? {})
      return response
    },
    placeholderData: keepPreviousData,
  })

  return {
    data,
    isLoading,
    isError,
    isFetching,
    refetch,
  }
}

export function useSLAMonitoringById(id: number) {
  return useQuery({
    queryKey: [SLA_MONITORING_KEYS.detail(id)],
    queryFn: () => SLAMonitoringService.get(id),
    enabled: !!id,
    ...DEFAULT_QUERY_OPTIONS,
  })
}

export function useCreateSLAMonitor() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: SlaMonitoringInput): Promise<SlaMonitoringInput> =>
      SLAMonitoringService.create(data),
    onMutate: async (newSLAMonitor) => {
      await queryClient.cancelQueries({
        queryKey: [SLA_MONITORING_KEYS.all],
        exact: false,
      })
      const queryKey = [
        SLA_MONITORING_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]
      const previousSLAMonitor =
        queryClient.getQueryData<ServiceLevelAgreementMonitoringPaginator>(
          queryKey
        )
      queryClient.setQueryData<ServiceLevelAgreementMonitoringPaginator>(
        queryKey,
        (old) => {
          if (!old)
            return {
              data: [
                {
                  ...newSLAMonitor,
                  id: Date.now(),
                } as unknown as SlaMonitoringInput,
              ],
              count: 1,
              pageIndex: DEFAULT_PAGE_INDEX,
              pageSize: DEFAULT_PAGE_SIZE,
            }
          return {
            ...old,
            data: [
              ...old.data,
              {
                ...newSLAMonitor,
                id: Date.now(),
              } as unknown as SlaMonitoringInput,
            ],
            count: old.count + 1,
          }
        }
      )
      return { previousSLAMonitor }
    },
    onSuccess: async () => {
      // const newSupplierId = response.supplierContractInfoId
      toast.success(t("form-successfully-created"))
      router.push(`${routes.scm.procurement.suppliers.suppliers}`)
    },
    onError: (err: any, newSLAMonitor, context) => {
      if (context?.previousSLAMonitor) {
        const queryKey = [
          SLA_MONITORING_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousSLAMonitor)
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
        queryKey: [SLA_MONITORING_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useUpdateSLAMonitor() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: ({ data }: { data: SlaMonitoringInput }) =>
      SLAMonitoringService.update(data),
    onMutate: async ({ data }) => {
      await queryClient.cancelQueries({
        queryKey: [SLA_MONITORING_KEYS.all],
        exact: false,
      })
      await queryClient.cancelQueries({
        queryKey: [SLA_MONITORING_KEYS.detail(data.id!)],
      })
      const queryKey = [
        SLA_MONITORING_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]
      const previousSLAMonitor =
        queryClient.getQueryData<ServiceLevelAgreementMonitoringPaginator>(
          queryKey
        )
      const previousSLAMonitorDetail =
        queryClient.getQueryData<SlaMonitoringInput>([
          SLA_MONITORING_KEYS.detail(data.id!),
        ])
      queryClient.setQueryData<ServiceLevelAgreementMonitoringPaginator>(
        queryKey,
        (old) => {
          if (!old)
            return {
              data: [data as unknown as SlaMonitoringInput],
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
        }
      )
      queryClient.setQueryData([SLA_MONITORING_KEYS.detail(data.id!)], data)
      return { previousSLAMonitor, previousSLAMonitorDetail }
    },
    onError: (err: any, variables, context) => {
      if (context?.previousSLAMonitor) {
        const queryKey = [
          SLA_MONITORING_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousSLAMonitor)
      }
      if (context?.previousSLAMonitorDetail) {
        queryClient.setQueryData(
          SLA_MONITORING_KEYS.detail(variables.data.id!),
          context.previousSLAMonitorDetail
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
        queryKey: [SLA_MONITORING_KEYS.all],
        exact: false,
      })
      if (data?.id) {
        queryClient.invalidateQueries({
          queryKey: [SLA_MONITORING_KEYS.detail(data.id!)],
        })
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: SLA_MONITORING_KEYS.all })
      queryClient.invalidateQueries({
        queryKey: SLA_MONITORING_KEYS.detail(data.id!),
      })
      toast.success(t("form-successfully-update"))
      router.push(routes.scm.procurement.suppliers.suppliers)
    },
  })
}

export function useDeleteSLAMonitor() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (id: number) => SLAMonitoringService.delete(id),
    onMutate: async (id) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [SLA_MONITORING_KEYS.all],
        exact: false,
      })

      const queryKey = [SLA_MONITORING_KEYS.all]

      // Snapshot the previous value
      const previousSLAMonitor =
        queryClient.getQueryData<ServiceLevelAgreementMonitoring[]>(queryKey)

      // Optimistically remove the COA from the list
      queryClient.setQueryData<ServiceLevelAgreementMonitoringPaginator>(
        queryKey,
        (old) => {
          if (!old) return old
          return {
            ...old,
            data: old.data.filter((item) => item.id !== id),
            count: old.count - 1,
          }
        }
      )

      if (previousSLAMonitor) {
        queryClient.setQueryData<ServiceLevelAgreementMonitoring[]>(
          queryKey,
          previousSLAMonitor.filter((item) => item.id !== id)
        )
      }

      return { previousSLAMonitor }
    },

    onSuccess: () => {
      toast.success(t("form-successfully-deleted"))
    },

    onError: (err: any, variables, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousSLAMonitor) {
        const queryKey = [
          SLA_MONITORING_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousSLAMonitor)
      }
      toast.error(t("form-error-deleting"))
      // toast.error(err.response.data)
    },

    onSettled: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [SLA_MONITORING_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useSLAMonitorOperations() {
  const queryClient = useQueryClient()

  const invalidateSLAMonitorQueries = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ["sla-monitor-list"] })
  }, [queryClient])

  return {
    invalidateSLAMonitorQueries,
  }
}