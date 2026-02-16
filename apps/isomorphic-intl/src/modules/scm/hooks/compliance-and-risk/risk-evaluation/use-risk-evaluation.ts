"use client";

import { useRouter } from "next/navigation";



import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";



import { DEFAULT_PAGE_SIZE } from "@/config/constants";
import { DEFAULT_PAGE_INDEX } from "@/config/constants";
import { routes } from "@/config/routes";
import { RiskEvaluationService } from "@/modules/scm/service/compliance-and-risk/risk-evaluation/risk-evaluation.service";
import { RiskEvaluation, RiskEvaluationPaginator, RiskEvaluationQueryOptions } from "@/modules/scm/types/compliance-and-risk/risk-evaluation";
import { DEFAULT_QUERY_OPTIONS, createQueryKeys } from "@/server/service/query-config";





const RISK_EVALUATION_KEYS = createQueryKeys("risk-evaluation")

export function useRiskEvaluationList(
  options?: Partial<RiskEvaluationQueryOptions>
) {
  const queryKey = [RISK_EVALUATION_KEYS.all, options]

  return useQuery<RiskEvaluationPaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return RiskEvaluationService.all(
        Object.assign({}, queryKey[1], pageParam)
      )
    },
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}

export function useRiskEvaluationById(id: number) {
  return useQuery({
    queryKey: [RISK_EVALUATION_KEYS.detail(id)],
    queryFn: () => RiskEvaluationService.get(id),
    enabled: !!id,
    ...DEFAULT_QUERY_OPTIONS,
  })
}

export function useCreateRiskEvaluation() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")
  return useMutation({
    mutationFn: (data: RiskEvaluation): Promise<RiskEvaluation> =>
      RiskEvaluationService.create(data),
    onMutate: async (newRiskEvaluation) => {
      await queryClient.cancelQueries({
        queryKey: [RISK_EVALUATION_KEYS.all],
        exact: false,
      })
      const queryKey = [
        RISK_EVALUATION_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]
      const previousRiskEvaluation =
        queryClient.getQueryData<RiskEvaluationPaginator>(queryKey)
      queryClient.setQueryData<RiskEvaluationPaginator>(queryKey, (old) => {
        if (!old)
          return {
            data: [newRiskEvaluation as RiskEvaluation],
            count: 1,
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          }
        return {
          ...old,
          data: [
            ...old.data,
            {
              ...newRiskEvaluation,
              id: Date.now(),
            } as RiskEvaluation,
          ],
          count: old.count + 1,
        }
      })
      return { previousRiskEvaluation }
    },
    onSuccess: () => {
      toast.success(t("form-successfully-created"))
      router.push(routes.scm.complianceAndRisk.riskEvaluation.riskEvaluation)
    },
    onError: (err: any, newRiskEvaluation, context) => {
      if (context?.previousRiskEvaluation) {
        const queryKey = [
          RISK_EVALUATION_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousRiskEvaluation)
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
        queryKey: [RISK_EVALUATION_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useUpdateRiskEvaluation() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")
  return useMutation({
    mutationFn: ({ data }: { data: RiskEvaluation }) =>
      RiskEvaluationService.update(data),
    onMutate: async ({ data }) => {
      await queryClient.cancelQueries({
        queryKey: [RISK_EVALUATION_KEYS.all],
        exact: false,
      })
      await queryClient.cancelQueries({
        queryKey: RISK_EVALUATION_KEYS.detail(data.id!),
      })
      const queryKey = [
        RISK_EVALUATION_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]
      const previousRiskEvaluation =
        queryClient.getQueryData<RiskEvaluationPaginator>(queryKey)
      const previousRiskEvaluationDetail =
        queryClient.getQueryData<RiskEvaluation>(
          RISK_EVALUATION_KEYS.detail(data.id!)
        )
      queryClient.setQueryData<RiskEvaluationPaginator>(queryKey, (old) => {
        if (!old) {
          return {
            data: [data as unknown as RiskEvaluation],
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
      })
      queryClient.setQueryData(RISK_EVALUATION_KEYS.detail(data.id!), data)
      return { previousRiskEvaluation, previousRiskEvaluationDetail }
    },
    onError: (err: any, variables, context) => {
      if (context?.previousRiskEvaluation) {
        const queryKey = [
          RISK_EVALUATION_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousRiskEvaluation)
      }
      if (context?.previousRiskEvaluationDetail) {
        queryClient.setQueryData(
          RISK_EVALUATION_KEYS.detail(variables.data.id!),
          context.previousRiskEvaluationDetail
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
        queryKey: [RISK_EVALUATION_KEYS.all],
        exact: false,
      })
      if (data?.id) {
        queryClient.invalidateQueries({
          queryKey: RISK_EVALUATION_KEYS.detail(data.id!),
        })
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: RISK_EVALUATION_KEYS.all })
      queryClient.invalidateQueries({
        queryKey: [RISK_EVALUATION_KEYS.detail(data.id!)],
      })
      toast.success(t("form-successfully-updated"))
      router.push(routes.scm.complianceAndRisk.riskEvaluation.riskEvaluation)
    },
  })
}

export function useDeleteRiskEvaluation() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (id: number) => RiskEvaluationService.delete(id),
    onMutate: async (id) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [RISK_EVALUATION_KEYS.all],
        exact: false,
      })

      const queryKey = [
        RISK_EVALUATION_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      // Snapshot the previous value
      const previousRiskEvaluation =
        queryClient.getQueryData<RiskEvaluationPaginator>(queryKey)

      // Optimistically remove the COA from the list
      queryClient.setQueryData<RiskEvaluationPaginator>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => item.id !== id),
          count: old.count - 1,
        }
      })

      return { previousRiskEvaluation }
    },

    onSuccess: () => {
      toast.success(t("form-successfully-deleted"))
    },

    onError: (err: any, variables, context) => {
      toast.error(t("form-error-deleting-dependency"))
      // toast.error(err.response?.data?.errors)
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousRiskEvaluation) {
        const queryKey = [
          RISK_EVALUATION_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousRiskEvaluation)
      }
      // toast.error(err.response.data)
    },

    onSettled: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [RISK_EVALUATION_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useBulkDeleteRiskEvaluation() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    // Change mutationFn to accept an array of IDs
    mutationFn: (ids: number[]) => RiskEvaluationService.bulkDelete(ids),
    onMutate: async (ids) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [RISK_EVALUATION_KEYS.all],
        exact: false,
      })

      const queryKey = [
        RISK_EVALUATION_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      // Snapshot the previous value
      const previousRiskEvaluation =
        queryClient.getQueryData<RiskEvaluationPaginator>(queryKey)

      // Optimistically remove multiple items from the list
      queryClient.setQueryData<RiskEvaluationPaginator>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => !ids.includes(item.id!)),
          count: old.count - ids.length,
        }
      })

      return { previousRiskEvaluation }
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
      if (context?.previousRiskEvaluation) {
        const queryKey = [
          RISK_EVALUATION_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousRiskEvaluation)
      }
    },

    onSettled: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [RISK_EVALUATION_KEYS.all],
        exact: false,
      })
    },
  })
}