"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";



import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";



import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "@/config/constants";
import { routes } from "@/config/routes";
import { MaterialRequirementsPlanService } from "@/modules/scm/service/production-control/material-requirements-planning/material-requirements-plan.service";
import { MaterialRequirementsPlanning, MaterialRequirementsPlanningPaginator, MaterialRequirementsPlanningQueryOptions } from "@/modules/scm/types/production-control/materials-requirements-planning/material-requirements-planning-types";
import { DEFAULT_QUERY_OPTIONS, createQueryKeys } from "@/server/service/query-config";





const MATERIAL_REQUIREMENTS_PLANNING_KEYS = createQueryKeys(
  "material-requirements-planning"
)

export function useMaterialRequirementsPlanningList(
  options?: Partial<MaterialRequirementsPlanningQueryOptions>
) {
  const queryKey = [MATERIAL_REQUIREMENTS_PLANNING_KEYS.all, options]

  return useQuery<MaterialRequirementsPlanningPaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return MaterialRequirementsPlanService.all(
        Object.assign({}, queryKey[1], pageParam)
      )
    },
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}

export function useMaterialRequirementsPlanningById(id: number) {
  return useQuery({
    queryKey: [MATERIAL_REQUIREMENTS_PLANNING_KEYS.detail(id)],
    queryFn: () => MaterialRequirementsPlanService.get(id),
    enabled: !!id,
    ...DEFAULT_QUERY_OPTIONS,
  })
}

export function useCreateMaterialRequirementsPlanning() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (
      data: MaterialRequirementsPlanning
    ): Promise<MaterialRequirementsPlanning> =>
      MaterialRequirementsPlanService.create(data),
    onMutate: async (newMaterialRequirementsPlanning) => {
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
      const previousMaterialRequirementsPlannings =
        queryClient.getQueryData<MaterialRequirementsPlanningPaginator>(
          queryKey
        )
      queryClient.setQueryData<MaterialRequirementsPlanningPaginator>(
        queryKey,
        (old) => {
          if (!old)
            return {
              data: [newMaterialRequirementsPlanning],
              count: 1,
              pageIndex: DEFAULT_PAGE_INDEX,
              pageSize: DEFAULT_PAGE_SIZE,
            }
          return {
            ...old,
            data: [
              ...old.data,
              { ...newMaterialRequirementsPlanning, id: Date.now() },
            ],
            count: old.count + 1,
          }
        }
      )
      return { previousMaterialRequirementsPlannings }
    },
    onSuccess: () => {
      toast.success(t("form-created-successfully"))
      router.push(
        routes.scm.productionControl.materialAvailability.materialAvailability
      )
    },
    onError: (err: any, newMaterialRequirementsPlanning, context) => {
      if (context?.previousMaterialRequirementsPlannings) {
        const queryKey = [
          MATERIAL_REQUIREMENTS_PLANNING_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(
          queryKey,
          context.previousMaterialRequirementsPlannings
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

export function useUpdateMaterialRequirementsPlanning() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")
  const router = useRouter()
  return useMutation({
    mutationFn: ({ data }: { data: MaterialRequirementsPlanning }) =>
      MaterialRequirementsPlanService.update(data),
    onMutate: async ({ data }) => {
      await queryClient.cancelQueries({
        queryKey: [MATERIAL_REQUIREMENTS_PLANNING_KEYS.all],
        exact: false,
      })
      await queryClient.cancelQueries({
        queryKey: [MATERIAL_REQUIREMENTS_PLANNING_KEYS.detail(data.id!)],
      })
      const queryKey = [
        MATERIAL_REQUIREMENTS_PLANNING_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]
      const previousMaterialRequirementsPlannings =
        queryClient.getQueryData<MaterialRequirementsPlanningPaginator>(
          queryKey
        )
      const previousMaterialRequirementsPlanning =
        queryClient.getQueryData<MaterialRequirementsPlanning>(
          MATERIAL_REQUIREMENTS_PLANNING_KEYS.detail(data.id!)
        )
      queryClient.setQueryData<MaterialRequirementsPlanningPaginator>(
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
        MATERIAL_REQUIREMENTS_PLANNING_KEYS.detail(data.id!),
        data
      )
      return {
        previousMaterialRequirementsPlannings,
        previousMaterialRequirementsPlanning,
      }
    },
    onError: (err: any, variables, context) => {
      if (context?.previousMaterialRequirementsPlannings) {
        const queryKey = [
          MATERIAL_REQUIREMENTS_PLANNING_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(
          queryKey,
          context.previousMaterialRequirementsPlannings
        )
      }
      if (context?.previousMaterialRequirementsPlanning) {
        queryClient.setQueryData(
          MATERIAL_REQUIREMENTS_PLANNING_KEYS.detail(variables.data.id!),
          context.previousMaterialRequirementsPlanning
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
        queryKey: [MATERIAL_REQUIREMENTS_PLANNING_KEYS.all],
        exact: false,
      })
      if (data?.id) {
        queryClient.invalidateQueries({
          queryKey: [MATERIAL_REQUIREMENTS_PLANNING_KEYS.detail(data.id!)],
        })
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [MATERIAL_REQUIREMENTS_PLANNING_KEYS.all],
      })
      queryClient.invalidateQueries({
        queryKey: [MATERIAL_REQUIREMENTS_PLANNING_KEYS.detail(data.id!)],
      })
      toast.success(t("form-updated-successfully"))
      router.push(
        routes.scm.productionControl.materialAvailability.materialAvailability
      )
    },
  })
}

export function useDeleteMaterialRequirementsPlanning() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (id: number) => MaterialRequirementsPlanService.delete(id),
    onMutate: async (id) => {
      // Cancel any outgoing refetches
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

      // Snapshot the previous value
      const previousMaterialRequirementsPlannings =
        queryClient.getQueryData<MaterialRequirementsPlanningPaginator>(
          queryKey
        )

      // Optimistically remove the stock transfer from the list
      queryClient.setQueryData<MaterialRequirementsPlanningPaginator>(
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

      return { previousMaterialRequirementsPlannings }
    },

    onSuccess: () => {
      toast.success(t("form-successfully-deleted"))
    },

    onError: (err: any, variables, context) => {
      if (context?.previousMaterialRequirementsPlannings) {
        const queryKey = [
          MATERIAL_REQUIREMENTS_PLANNING_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(
          queryKey,
          context.previousMaterialRequirementsPlannings
        )
      }
      toast.error(t("form-error-delete"))
      // toast.error(err?.response?.data)
    },

    onSettled: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [MATERIAL_REQUIREMENTS_PLANNING_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useBulkDeleteMaterialRequirementsPlanning() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    // Change mutationFn to accept an array of IDs
    mutationFn: (ids: number[]) =>
      MaterialRequirementsPlanService.bulkDelete(ids),
    onMutate: async (ids) => {
      // Cancel any outgoing refetches
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

      // Snapshot the previous value
      const previousMaterialRequirementsPlannings =
        queryClient.getQueryData<MaterialRequirementsPlanningPaginator>(
          queryKey
        )

      // Optimistically remove multiple items from the list
      queryClient.setQueryData<MaterialRequirementsPlanningPaginator>(
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

      return { previousMaterialRequirementsPlannings }
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
      if (context?.previousMaterialRequirementsPlannings) {
        const queryKey = [
          MATERIAL_REQUIREMENTS_PLANNING_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(
          queryKey,
          context.previousMaterialRequirementsPlannings
        )
      }
      toast.error(t("form-error-bulk-delete"))
      // toast.error(err?.response?.data)
    },

    onSettled: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [MATERIAL_REQUIREMENTS_PLANNING_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useMaterialRequirementsPlanningOperations() {
  const queryClient = useQueryClient()

  const invalidateMaterialRequirementsPlanningQueries = useCallback(() => {
    queryClient.invalidateQueries({
      queryKey: ["material-requirements-planning-list"],
    })
  }, [queryClient])

  return {
    invalidateMaterialRequirementsPlanningQueries,
  }
}