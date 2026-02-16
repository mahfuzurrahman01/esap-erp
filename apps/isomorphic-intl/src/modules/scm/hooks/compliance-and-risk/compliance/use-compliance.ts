"use client";

import { useRouter } from "next/navigation";



import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";



import { DEFAULT_PAGE_SIZE } from "@/config/constants";
import { DEFAULT_PAGE_INDEX } from "@/config/constants";
import { routes } from "@/config/routes";
import { ComplianceService } from "@/modules/scm/service/compliance-and-risk/compliance/compliance.service";
import { Compliance, CompliancePaginator, ComplianceQueryOptions } from "@/modules/scm/types/compliance-and-risk/compliance-types";
import { DEFAULT_QUERY_OPTIONS, createQueryKeys } from "@/server/service/query-config";





const COMPLIANCE_KEYS = createQueryKeys("compliance")

export function useComplianceList(options?: Partial<ComplianceQueryOptions>) {
  const queryKey = [COMPLIANCE_KEYS.all, options]

  return useQuery<CompliancePaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return ComplianceService.all(Object.assign({}, queryKey[1], pageParam))
    },
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}

export function useComplianceById(id: number) {
  return useQuery({
    queryKey: [COMPLIANCE_KEYS.detail(id)],
    queryFn: () => ComplianceService.get(id),
    enabled: !!id,
    ...DEFAULT_QUERY_OPTIONS,
  })
}

export function useCreateCompliance() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")
  return useMutation({
    mutationFn: (data: Compliance): Promise<Compliance> =>
      ComplianceService.create(data),
    onMutate: async (newCompliance) => {
      await queryClient.cancelQueries({
        queryKey: [COMPLIANCE_KEYS.all],
        exact: false,
      })
      const queryKey = [
        COMPLIANCE_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]
      const previousCompliance =
        queryClient.getQueryData<CompliancePaginator>(queryKey)
      queryClient.setQueryData<CompliancePaginator>(queryKey, (old) => {
        if (!old)
          return {
            data: [newCompliance as Compliance],
            count: 1,
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          }
        return {
          ...old,
          data: [
            ...old.data,
            {
              ...newCompliance,
              id: Date.now(),
            } as Compliance,
          ],
          count: old.count + 1,
        }
      })
      return { previousCompliance }
    },
    onSuccess: () => {
      toast.success(t("form-successfully-created"))
      router.push(routes.scm.complianceAndRisk.compliance.compliance)
    },
    onError: (err: any, newCompliance, context) => {
      if (context?.previousCompliance) {
        const queryKey = [
          COMPLIANCE_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousCompliance)
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
        queryKey: [COMPLIANCE_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useUpdateCompliance() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")
  return useMutation({
    mutationFn: ({ data }: { data: Compliance }) =>
      ComplianceService.update(data),
    onMutate: async ({ data }) => {
      await queryClient.cancelQueries({
        queryKey: [COMPLIANCE_KEYS.all],
        exact: false,
      })
      await queryClient.cancelQueries({
        queryKey: COMPLIANCE_KEYS.detail(data.id!),
      })
      const queryKey = [
        COMPLIANCE_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]
      const previousCompliance =
        queryClient.getQueryData<CompliancePaginator>(queryKey)
      const previousComplianceDetail = queryClient.getQueryData<Compliance>(
        COMPLIANCE_KEYS.detail(data.id!)
      )
      queryClient.setQueryData<CompliancePaginator>(queryKey, (old) => {
        if (!old) {
          return {
            data: [data as unknown as Compliance],
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
      queryClient.setQueryData(COMPLIANCE_KEYS.detail(data.id!), data)
      return { previousCompliance, previousComplianceDetail }
    },
    onError: (err: any, variables, context) => {
      if (context?.previousCompliance) {
        const queryKey = [
          COMPLIANCE_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousCompliance)
      }
      if (context?.previousComplianceDetail) {
        queryClient.setQueryData(
          COMPLIANCE_KEYS.detail(variables.data.id!),
          context.previousComplianceDetail
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
        queryKey: [COMPLIANCE_KEYS.all],
        exact: false,
      })
      if (data?.id) {
        queryClient.invalidateQueries({
          queryKey: COMPLIANCE_KEYS.detail(data.id!),
        })
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: COMPLIANCE_KEYS.all })
      queryClient.invalidateQueries({
        queryKey: [COMPLIANCE_KEYS.detail(data.id!)],
      })
      toast.success(t("form-successfully-updated"))
      router.push(routes.scm.complianceAndRisk.compliance.compliance)
    },
  })
}

export function useDeleteCompliance() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (id: number) => ComplianceService.delete(id),
    onMutate: async (id) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [COMPLIANCE_KEYS.all],
        exact: false,
      })

      const queryKey = [
        COMPLIANCE_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      // Snapshot the previous value
      const previousCompliance =
        queryClient.getQueryData<CompliancePaginator>(queryKey)

      // Optimistically remove the COA from the list
      queryClient.setQueryData<CompliancePaginator>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => item.id !== id),
          count: old.count - 1,
        }
      })

      return { previousCompliance }
    },

    onSuccess: () => {
      toast.success(t("form-successfully-deleted"))
    },

    onError: (err: any, variables, context) => {
      toast.error(t("form-error-deleting-dependency"))
      // toast.error(err.response?.data?.errors)
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousCompliance) {
        const queryKey = [
          COMPLIANCE_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousCompliance)
      }
      // toast.error(err.response.data)
    },

    onSettled: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [COMPLIANCE_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useBulkDeleteCompliance() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    // Change mutationFn to accept an array of IDs
    mutationFn: (ids: number[]) => ComplianceService.bulkDelete(ids),
    onMutate: async (ids) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [COMPLIANCE_KEYS.all],
        exact: false,
      })

      const queryKey = [
        COMPLIANCE_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      // Snapshot the previous value
      const previousCompliance =
        queryClient.getQueryData<CompliancePaginator>(queryKey)

      // Optimistically remove multiple items from the list
      queryClient.setQueryData<CompliancePaginator>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => !ids.includes(item.id!)),
          count: old.count - ids.length,
        }
      })

      return { previousCompliance }
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
      if (context?.previousCompliance) {
        const queryKey = [
          COMPLIANCE_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousCompliance)
      }
    },

    onSettled: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [COMPLIANCE_KEYS.all],
        exact: false,
      })
    },
  })
}