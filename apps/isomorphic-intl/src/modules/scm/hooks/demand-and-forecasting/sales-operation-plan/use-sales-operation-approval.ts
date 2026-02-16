"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";



import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";



import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "@/config/constants";
import { routes } from "@/config/routes";
import { SalesOperationApprovalService } from "@/modules/scm/service/demand-and-forecasting/sales-operation-plan/sales-operation-approval.service";
import { SalesOperationApproval, SalesOperationApprovalPaginator, SalesOperationApprovalQueryOptions } from "@/modules/scm/types/demand-and-forecasting/sales-operation-plan/sales-operation-approval-types";
import { SalesOperationPlan, SalesOperationPlanPaginator } from "@/modules/scm/types/demand-and-forecasting/sales-operation-plan/sales-operation-plan-types";
import { DEFAULT_QUERY_OPTIONS, createQueryKeys } from "@/server/service/query-config";





const SALES_OPERATION_PLAN_APPROVAL_KEYS = createQueryKeys(
  "sales-operation-plan-approval"
)
const SALES_OPERATION_PLAN_KEYS = createQueryKeys("sales-operation-plan")
export function useSalesOperationApprovalList(
  options?: Partial<SalesOperationApprovalQueryOptions>
) {
  const queryKey = [SALES_OPERATION_PLAN_APPROVAL_KEYS.all, options]

  return useQuery<SalesOperationApprovalPaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return SalesOperationApprovalService.all(
        Object.assign({}, queryKey[1], pageParam)
      )
    },
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}

export function useSalesOperationApprovalById(id: number) {
  return useQuery({
    queryKey: [SALES_OPERATION_PLAN_APPROVAL_KEYS.detail(id)],
    queryFn: () => SalesOperationApprovalService.get(id),
    enabled: !!id,
    ...DEFAULT_QUERY_OPTIONS,
  })
}

export function useCreateSalesOperationApproval() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")
  return useMutation({
    mutationFn: (
      data: SalesOperationApproval
    ): Promise<SalesOperationApproval> =>
      SalesOperationApprovalService.create(data),
    onMutate: async (newSalesOperationApproval) => {
      await queryClient.cancelQueries({
        queryKey: [SALES_OPERATION_PLAN_KEYS.all],
        exact: false,
      })
      const queryKey = [
        SALES_OPERATION_PLAN_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]
      const previousSalesOperationPlan =
        queryClient.getQueryData<SalesOperationPlanPaginator>(queryKey)
      queryClient.setQueryData<SalesOperationPlanPaginator>(queryKey, (old) => {
        if (!old)
          return {
            data: [newSalesOperationApproval as unknown as SalesOperationPlan],
            count: 1,
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          }
        return {
          ...old,
          data: [
            ...old.data,
            {
              ...newSalesOperationApproval,
              id: Date.now(),
            } as unknown as SalesOperationPlan,
          ],
          count: old.count + 1,
        }
      })
      return { previousSalesOperationPlan }
    },
    onSuccess: () => {
      toast.success(t("form-successfully-created"))
      router.refresh()
      router.push(
        routes.scm.demandForecasting.salesOperationsPlan.salesOperationPlan
      )
    },
    onError: (err: any, newSalesOperationApproval, context) => {
      if (context?.previousSalesOperationPlan) {
        const queryKey = [
          SALES_OPERATION_PLAN_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousSalesOperationPlan)
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
        queryKey: [SALES_OPERATION_PLAN_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useUpdateSalesOperationApproval() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")
  return useMutation({
    mutationFn: ({ data }: { data: SalesOperationApproval }) =>
      SalesOperationApprovalService.update(data),
    onMutate: async ({ data }) => {
      await queryClient.cancelQueries({
        queryKey: [SALES_OPERATION_PLAN_APPROVAL_KEYS.all],
        exact: false,
      })
      await queryClient.cancelQueries({
        queryKey: [SALES_OPERATION_PLAN_KEYS.detail(data.id!)],
      })
      const queryKey = [
        SALES_OPERATION_PLAN_APPROVAL_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]
      const previousSalesOperationApproval =
        queryClient.getQueryData<SalesOperationApprovalPaginator>(queryKey)
      const previousSalesOperationApprovalDetail =
        queryClient.getQueryData<SalesOperationApproval>(
          SALES_OPERATION_PLAN_APPROVAL_KEYS.detail(data.id!)
        )
      queryClient.setQueryData<SalesOperationApprovalPaginator>(
        queryKey,
        (old) => {
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
        }
      )
      queryClient.setQueryData(
        SALES_OPERATION_PLAN_APPROVAL_KEYS.detail(data.id!),
        data
      )
      return {
        previousSalesOperationApproval,
        previousSalesOperationApprovalDetail,
      }
    },
    onError: (err: any, variables, context) => {
      if (context?.previousSalesOperationApproval) {
        const queryKey = [
          SALES_OPERATION_PLAN_APPROVAL_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(
          queryKey,
          context.previousSalesOperationApproval
        )
      }
      if (context?.previousSalesOperationApprovalDetail) {
        queryClient.setQueryData(
          [SALES_OPERATION_PLAN_APPROVAL_KEYS.detail(variables.data.id!)],
          context.previousSalesOperationApprovalDetail
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
        queryKey: [SALES_OPERATION_PLAN_APPROVAL_KEYS.all],
        exact: false,
      })
      if (data?.id) {
        queryClient.invalidateQueries({
          queryKey: [SALES_OPERATION_PLAN_APPROVAL_KEYS.detail(data.id!)],
        })
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [SALES_OPERATION_PLAN_APPROVAL_KEYS.all],
      })
      queryClient.invalidateQueries({
        queryKey: [SALES_OPERATION_PLAN_APPROVAL_KEYS.detail(data.id!)],
      })
      toast.success(t("form-successfully-updated"))
      router.push(routes.scm.demandForecasting.settings.salesOperationApproval)
    },
  })
}

export function useDeleteSalesOperationApproval() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (id: number) => SalesOperationApprovalService.delete(id),
    onMutate: async (id) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [SALES_OPERATION_PLAN_APPROVAL_KEYS.all],
        exact: false,
      })

      const queryKey = [
        SALES_OPERATION_PLAN_APPROVAL_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      // Snapshot the previous value
      const previousSalesOperationApproval =
        queryClient.getQueryData<SalesOperationApprovalPaginator>(queryKey)

      // Optimistically remove the Sales Operation Approval from the list
      queryClient.setQueryData<SalesOperationApprovalPaginator>(
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

      return { previousSalesOperationApproval }
    },

    onSuccess: () => {
      toast.success(t("form-successfully-deleted"))
    },

    onError: (err: any, variables, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousSalesOperationApproval) {
        const queryKey = [
          SALES_OPERATION_PLAN_APPROVAL_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(
          queryKey,
          context.previousSalesOperationApproval
        )
      }
      toast.error(t("form-error-delete"))
      // toast.error(err?.response?.data)
    },

    onSettled: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [SALES_OPERATION_PLAN_APPROVAL_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useBulkDeleteSalesOperationApproval() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    // Change mutationFn to accept an array of IDs
    mutationFn: (ids: number[]) =>
      SalesOperationApprovalService.bulkDelete(ids),
    onMutate: async (ids) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [SALES_OPERATION_PLAN_APPROVAL_KEYS.all],
        exact: false,
      })

      const queryKey = [
        SALES_OPERATION_PLAN_APPROVAL_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      // Snapshot the previous value
      const previousSalesOperationApproval =
        queryClient.getQueryData<SalesOperationApprovalPaginator>(queryKey)

      // Optimistically remove multiple items from the list
      queryClient.setQueryData<SalesOperationApprovalPaginator>(
        queryKey,
        (old) => {
          if (!old) return old
          return {
            ...old,
            data: old.data.filter((item) => !ids.includes(item.id!)),
            count: old.count - ids.length,
          }
        }
      )

      return { previousSalesOperationApproval }
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
      if (context?.previousSalesOperationApproval) {
        const queryKey = [
          SALES_OPERATION_PLAN_APPROVAL_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(
          queryKey,
          context.previousSalesOperationApproval
        )
      }
      toast.error(t("form-error-bulk-delete"))
      // toast.error(err?.response?.data)
    },

    onSettled: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [SALES_OPERATION_PLAN_APPROVAL_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useSalesOperationApprovalOperations() {
  const queryClient = useQueryClient()

  const invalidateSalesOperationApprovalQueries = useCallback(() => {
    queryClient.invalidateQueries({
      queryKey: SALES_OPERATION_PLAN_APPROVAL_KEYS.all,
    })
  }, [queryClient])

  return {
    invalidateSalesOperationApprovalQueries,
  }
}