"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";



import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";



import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "@/config/constants";
import { routes } from "@/config/routes";
import { MaterialRequirementsApprovalPlanService } from "@/modules/scm/service/production-control/material-requirements-planning/material-requirements-approval-planning.service";
import { MaterialRequirementsPlanApproval, MaterialRequirementsPlanApprovalPaginator, MaterialRequirementsPlanApprovalQueryOptions } from "@/modules/scm/types/production-control/materials-requirements-planning/material-requirements-plan-approval-types";
import { MaterialRequirementsPlanning, MaterialRequirementsPlanningPaginator } from "@/modules/scm/types/production-control/materials-requirements-planning/material-requirements-planning-types";
import { DEFAULT_QUERY_OPTIONS, createQueryKeys } from "@/server/service/query-config";





const MATERIAL_REQUIREMENTS_PLANNING_KEYS = createQueryKeys(
  "material-requirements-planning"
)
const MATERIAL_REQUIREMENTS_PLAN_APPROVAL_KEYS = createQueryKeys(
  "material-requirements-plan-approval"
)

export function useMaterialRequirementsPlanApprovalList(
  options?: Partial<MaterialRequirementsPlanApprovalQueryOptions>
) {
  const queryKey = [MATERIAL_REQUIREMENTS_PLAN_APPROVAL_KEYS.all, options]

  return useQuery<MaterialRequirementsPlanApprovalPaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return MaterialRequirementsApprovalPlanService.all(
        Object.assign({}, queryKey[1], pageParam)
      )
    },
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}

export function useMaterialRequirementsPlanApprovalById(id: number) {
  return useQuery({
    queryKey: [MATERIAL_REQUIREMENTS_PLAN_APPROVAL_KEYS.detail(id)],
    queryFn: () => MaterialRequirementsApprovalPlanService.get(id),
    enabled: !!id,
    ...DEFAULT_QUERY_OPTIONS,
  })
}

export function useCreateMaterialRequirementsPlanApproval() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")
  return useMutation({
    mutationFn: (
      data: MaterialRequirementsPlanApproval
    ): Promise<MaterialRequirementsPlanApproval> =>
      MaterialRequirementsApprovalPlanService.create(data),
    onMutate: async (newMaterialRequirementsPlanApproval) => {
      await queryClient.cancelQueries({
        queryKey: [MATERIAL_REQUIREMENTS_PLANNING_KEYS.all],
        exact: false,
      })
      const queryKey = [
        MATERIAL_REQUIREMENTS_PLANNING_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]
      const previousMaterialRequirementsPlanApproval =
        queryClient.getQueryData<MaterialRequirementsPlanningPaginator>(
          queryKey
        )
      queryClient.setQueryData<MaterialRequirementsPlanningPaginator>(
        queryKey,
        (old) => {
          if (!old)
            return {
              data: [
                newMaterialRequirementsPlanApproval as unknown as MaterialRequirementsPlanning,
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
                ...newMaterialRequirementsPlanApproval,
                id: Date.now(),
              } as unknown as MaterialRequirementsPlanning,
            ],
            count: old.count + 1,
          }
        }
      )
      return { previousMaterialRequirementsPlanApproval }
    },
    onSuccess: () => {
      toast.success(t("form-successfully-created"))
      router.refresh()
      router.push(
        routes.scm.productionControl.materialAvailability.materialAvailability
      )
    },
    onError: (err: any, newMaterialRequirementsPlanApproval, context) => {
      if (context?.previousMaterialRequirementsPlanApproval) {
        const queryKey = [
          MATERIAL_REQUIREMENTS_PLANNING_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(
          queryKey,
          context.previousMaterialRequirementsPlanApproval
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
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [MATERIAL_REQUIREMENTS_PLANNING_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useUpdateMaterialRequirementsPlanApproval() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")
  return useMutation({
    mutationFn: ({ data }: { data: MaterialRequirementsPlanApproval }) =>
      MaterialRequirementsApprovalPlanService.update(data),
    onMutate: async ({ data }) => {
      await queryClient.cancelQueries({
        queryKey: [MATERIAL_REQUIREMENTS_PLAN_APPROVAL_KEYS.all],
        exact: false,
      })
      await queryClient.cancelQueries({
        queryKey: [MATERIAL_REQUIREMENTS_PLAN_APPROVAL_KEYS.detail(data.id!)],
      })
      const queryKey = [
        MATERIAL_REQUIREMENTS_PLAN_APPROVAL_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]
      const previousMaterialRequirementsPlanApproval =
        queryClient.getQueryData<MaterialRequirementsPlanApprovalPaginator>(
          queryKey
        )
      const previousMaterialRequirementsPlanApprovalDetail =
        queryClient.getQueryData<MaterialRequirementsPlanApproval>(
          MATERIAL_REQUIREMENTS_PLAN_APPROVAL_KEYS.detail(data.id!)
        )
      queryClient.setQueryData<MaterialRequirementsPlanApprovalPaginator>(
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
        MATERIAL_REQUIREMENTS_PLAN_APPROVAL_KEYS.detail(data.id!),
        data
      )
      return {
        previousMaterialRequirementsPlanApproval,
        previousMaterialRequirementsPlanApprovalDetail,
      }
    },
    onError: (err: any, variables, context) => {
      if (context?.previousMaterialRequirementsPlanApproval) {
        const queryKey = [
          MATERIAL_REQUIREMENTS_PLAN_APPROVAL_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(
          queryKey,
          context.previousMaterialRequirementsPlanApproval
        )
      }
      if (context?.previousMaterialRequirementsPlanApprovalDetail) {
        queryClient.setQueryData(
          MATERIAL_REQUIREMENTS_PLAN_APPROVAL_KEYS.detail(variables.data.id!),
          context.previousMaterialRequirementsPlanApprovalDetail
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
        queryKey: [MATERIAL_REQUIREMENTS_PLAN_APPROVAL_KEYS.all],
        exact: false,
      })
      if (data?.id) {
        queryClient.invalidateQueries({
          queryKey: [MATERIAL_REQUIREMENTS_PLAN_APPROVAL_KEYS.detail(data.id!)],
        })
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [MATERIAL_REQUIREMENTS_PLAN_APPROVAL_KEYS.all],
      })
      queryClient.invalidateQueries({
        queryKey: [MATERIAL_REQUIREMENTS_PLAN_APPROVAL_KEYS.detail(data.id!)],
      })
      toast.success(t("form-successfully-updated"))
      router.push(
        routes.scm.productionControl.settings.materialRequirementsPlanningApproval
      )
    },
  })
}

export function useDeleteMaterialRequirementsPlanApproval() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (id: number) =>
      MaterialRequirementsApprovalPlanService.delete(id),
    onMutate: async (id) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [MATERIAL_REQUIREMENTS_PLAN_APPROVAL_KEYS.all],
        exact: false,
      })

      const queryKey = [
        MATERIAL_REQUIREMENTS_PLAN_APPROVAL_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      // Snapshot the previous value
      const previousMaterialRequirementsPlanApproval =
        queryClient.getQueryData<MaterialRequirementsPlanApprovalPaginator>(
          queryKey
        )

      // Optimistically remove the COA from the list
      queryClient.setQueryData<MaterialRequirementsPlanApprovalPaginator>(
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

      return { previousMaterialRequirementsPlanApproval }
    },

    onSuccess: () => {
      toast.success(t("form-successfully-deleted"))
    },

    onError: (err: any, variables, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousMaterialRequirementsPlanApproval) {
        const queryKey = [
          MATERIAL_REQUIREMENTS_PLAN_APPROVAL_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(
          queryKey,
          context.previousMaterialRequirementsPlanApproval
        )
      }
      toast.error(t("form-error-delete"))
      // toast.error(err?.response?.data)
    },

    onSettled: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [MATERIAL_REQUIREMENTS_PLAN_APPROVAL_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useMaterialRequirementsPlanApprovalOperations() {
  const queryClient = useQueryClient()

  const invalidateMaterialRequirementsPlanApprovalQueries = useCallback(() => {
    queryClient.invalidateQueries({
      queryKey: MATERIAL_REQUIREMENTS_PLAN_APPROVAL_KEYS.all,
    })
  }, [queryClient])

  return {
    invalidateMaterialRequirementsPlanApprovalQueries,
  }
}