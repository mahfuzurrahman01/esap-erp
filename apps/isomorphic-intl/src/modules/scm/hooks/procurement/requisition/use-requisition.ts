"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";



import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";



import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "@/config/constants";
import { routes } from "@/config/routes";
import { RequisitionService } from "@/modules/scm/service/procurement/requisition/requisition.service";
import { Requisition, RequisitionInput, RequisitionPaginator, RequisitionQueryOptions, RequisitionUpdate } from "@/modules/scm/types/procurement/requisition/requisition-types";
import { DEFAULT_QUERY_OPTIONS, createQueryKeys } from "@/server/service/query-config";





const REQUISITION_KEYS = createQueryKeys("requisition")

export function useRequisitionList(options?: Partial<RequisitionQueryOptions>) {
  const queryKey = [REQUISITION_KEYS.all, options]
  return useQuery<RequisitionPaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return RequisitionService.all(Object.assign({}, queryKey[1], pageParam))
    },
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}

export function useRequisitionById(id: number) {
  return useQuery({
    queryKey: [REQUISITION_KEYS.detail(id)],
    queryFn: () => RequisitionService.get(id),
    enabled: !!id,
    ...DEFAULT_QUERY_OPTIONS,
  })
}

export function useCreateRequisition() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: RequisitionInput): Promise<RequisitionInput> =>
      RequisitionService.create(data),
    onMutate: async (newRequisition) => {
      await queryClient.cancelQueries({
        queryKey: [REQUISITION_KEYS.all],
        exact: false,
      })
      const queryKey = [
        REQUISITION_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]
      const previousRequisition =
        queryClient.getQueryData<RequisitionPaginator>(queryKey)
      queryClient.setQueryData<RequisitionPaginator>(queryKey, (old) => {
        if (!old)
          return {
            data: [newRequisition as unknown as Requisition],
            count: 1,
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          }
        return {
          ...old,
          data: [
            ...old.data,
            { ...newRequisition, id: Date.now() } as unknown as Requisition,
          ],
          count: old.count + 1,
        }
      })
      return { previousRequisition }
    },
    onSuccess: () => {
      toast.success(t("form-successfully-created"))
      router.push(routes.scm.procurement.requisitions.requisitions)
    },
    onError: (err: any, newRequisition, context) => {
      if (context?.previousRequisition) {
        const queryKey = [
          REQUISITION_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousRequisition)
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
        queryKey: [REQUISITION_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useUpdateRequisition() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")
  const router = useRouter()

  return useMutation({
    mutationFn: ({ data }: { data: RequisitionUpdate }) =>
      RequisitionService.update(data),
    onMutate: async ({ data }) => {
      await queryClient.cancelQueries({
        queryKey: [REQUISITION_KEYS.all],
        exact: false,
      })
      await queryClient.cancelQueries({
        queryKey: [REQUISITION_KEYS.detail(data.id!)],
      })
      const queryKey = [
        REQUISITION_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]
      const previousRequisition =
        queryClient.getQueryData<RequisitionPaginator>(queryKey)
      const previousRequisitionDetail = queryClient.getQueryData<Requisition>(
        REQUISITION_KEYS.detail(data.id!)
      )
      queryClient.setQueryData<RequisitionPaginator>(queryKey, (old) => {
        if (!old)
          return {
            data: [data as unknown as Requisition],
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
      queryClient.setQueryData(REQUISITION_KEYS.detail(data.id!), data)
      return { previousRequisition, previousRequisitionDetail }
    },
    onError: (err: any, variables, context) => {
      if (context?.previousRequisition) {
        const queryKey = [
          REQUISITION_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousRequisition)
      }
      if (context?.previousRequisitionDetail) {
        queryClient.setQueryData(
          REQUISITION_KEYS.detail(variables.data.id!),
          context.previousRequisitionDetail
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
        queryKey: [REQUISITION_KEYS.all],
        exact: false,
      })
      if (data?.id) {
        queryClient.invalidateQueries({
          queryKey: [REQUISITION_KEYS.detail(data.id!)],
        })
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: REQUISITION_KEYS.all })
      queryClient.invalidateQueries({
        queryKey: [REQUISITION_KEYS.detail(data.id!)],
      })
      toast.success(t("form-successfully-update"))
      router.push(routes.scm.procurement.requisitions.requisitions)
    },
  })
}

export function useDeleteRequisition() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (id: number) => RequisitionService.delete(id),
    onMutate: async (id) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [REQUISITION_KEYS.all],
        exact: false,
      })

      const queryKey = [
        REQUISITION_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      // Snapshot the previous value
      const previousRequisitions =
        queryClient.getQueryData<RequisitionPaginator>(queryKey)

      queryClient.setQueryData<RequisitionPaginator>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => item.id !== id),
          count: old.count - 1,
        }
      })

      return { previousRequisitions }
    },

    onSuccess: () => {
      toast.success(t("form-successfully-deleted"))
    },

    onError: (err: any, variables, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousRequisitions) {
        const queryKey = [
          REQUISITION_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousRequisitions)
      }
      toast.error(t("form-error-deleting-dependency"))
    },

    onSettled: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [REQUISITION_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useBulkDeleteRequisition() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    // Change mutationFn to accept an array of IDs
    mutationFn: (ids: number[]) => RequisitionService.bulkDelete(ids),
    onMutate: async (ids) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [REQUISITION_KEYS.all],
        exact: false,
      })

      const queryKey = [
        REQUISITION_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      // Snapshot the previous value
      const previousRequisition =
        queryClient.getQueryData<RequisitionPaginator>(queryKey)

      // Optimistically remove multiple items from the list
      queryClient.setQueryData<RequisitionPaginator>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => !ids.includes(item.id!)),
          count: old.count - ids.length,
        }
      })

      return { previousRequisition }
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
      if (context?.previousRequisition) {
        const queryKey = [
          REQUISITION_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousRequisition)
        toast.error(t("form-error-deleting-dependency"))
        // toast.error(err.response.data)
      }
    },

    onSettled: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [REQUISITION_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useRequisitionOperations() {
  const queryClient = useQueryClient()

  const invalidateRequisitionQueries = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: [REQUISITION_KEYS.all] })
  }, [queryClient])

  return {
    invalidateRequisitionQueries,
  }
}

export function useSearchRequisition(
  searchTerm: string,
  filters: Partial<RequisitionQueryOptions>
) {
  return useQuery<RequisitionPaginator, AxiosError>({
    queryKey: ["requisition-search", searchTerm, filters],
    queryFn: () =>
      RequisitionService.search({
        pageIndex: filters.pageIndex ?? 1,
        pageSize: filters.pageSize ?? 10,
        searchTerm,
      }),
    enabled: !!searchTerm || Object.keys(filters).length > 0,
  })
}