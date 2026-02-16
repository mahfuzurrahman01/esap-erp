"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";



import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";



import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "@/config/constants";
import { routes } from "@/config/routes";
import { ReturnProcessApprovalService } from "@/modules/scm/service/logistic-and-transport/return-process/return-process-approval.service";
import { ReturnProcessApproval, ReturnProcessApprovalPaginator, ReturnProcessApprovalQueryOptions } from "@/modules/scm/types/logistics-and-transport/return-process/return-process-approval-types";
import { ReturnProcess, ReturnProcessPaginator } from "@/modules/scm/types/logistics-and-transport/return-process/return-process-types";
import { DEFAULT_QUERY_OPTIONS, createQueryKeys } from "@/server/service/query-config";





const RETURN_PROCESS_APPROVAL_KEYS = createQueryKeys("return-process-approval")

const RETURN_PROCESS_KEYS = createQueryKeys("return-process")

export function useReturnProcessApprovalList(
  options?: Partial<ReturnProcessApprovalQueryOptions>
) {
  const queryKey = [RETURN_PROCESS_APPROVAL_KEYS.all, options]

  return useQuery<ReturnProcessApprovalPaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return ReturnProcessApprovalService.all(
        Object.assign({}, queryKey[1], pageParam)
      )
    },
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}

export function useReturnProcessApprovalById(id: number) {
  return useQuery({
    queryKey: [RETURN_PROCESS_APPROVAL_KEYS.detail(id)],
    queryFn: () => ReturnProcessApprovalService.get(id),
    enabled: !!id,
    ...DEFAULT_QUERY_OPTIONS,
  })
}

export function useCreateReturnProcessApproval() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")
  return useMutation({
    mutationFn: (data: ReturnProcessApproval): Promise<ReturnProcess> =>
      ReturnProcessApprovalService.create(data),
    onMutate: async (newReturnProcessApproval) => {
      await queryClient.cancelQueries({
        queryKey: [RETURN_PROCESS_KEYS.all],
        exact: false,
      })
      const queryKey = [
        RETURN_PROCESS_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]
      const previousReturnProcessApproval =
        queryClient.getQueryData<ReturnProcessPaginator>(queryKey)
      queryClient.setQueryData<ReturnProcessPaginator>(queryKey, (old) => {
        if (!old)
          return {
            data: [newReturnProcessApproval],
            count: 1,
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          }
        return {
          ...old,
          data: [...old.data, { ...newReturnProcessApproval, id: Date.now() }],
          count: old.count + 1,
        }
      })
      return { previousReturnProcessApproval }
    },
    onSuccess: () => {
      toast.success(t("form-successfully-created"))
      router.push(
        routes.scm.logisticsAndTransport.returnManagement.returnManagement
      )
    },
    onError: (err: any, newReturnProcessApproval, context) => {
      if (context?.previousReturnProcessApproval) {
        const queryKey = [
          RETURN_PROCESS_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(
          queryKey,
          context.previousReturnProcessApproval
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
        queryKey: [RETURN_PROCESS_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useUpdateReturnProcessApproval() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")
  return useMutation({
    mutationFn: ({ data }: { data: ReturnProcessApproval }) =>
      ReturnProcessApprovalService.update(data),
    onMutate: async ({ data }) => {
      await queryClient.cancelQueries({
        queryKey: [RETURN_PROCESS_APPROVAL_KEYS.all],
        exact: false,
      })
      await queryClient.cancelQueries({
        queryKey: [RETURN_PROCESS_APPROVAL_KEYS.detail(data.id!)],
      })
      const queryKey = [
        RETURN_PROCESS_APPROVAL_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]
      const previousReturnProcessApproval =
        queryClient.getQueryData<ReturnProcessApprovalPaginator>(queryKey)
      const previousReturnProcessApprovalDetail =
        queryClient.getQueryData<ReturnProcessApproval>(
          RETURN_PROCESS_APPROVAL_KEYS.detail(data.id!)
        )
      queryClient.setQueryData<ReturnProcessApprovalPaginator>(
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
        RETURN_PROCESS_APPROVAL_KEYS.detail(data.id!),
        data
      )
      return {
        previousReturnProcessApproval,
        previousReturnProcessApprovalDetail,
      }
    },
    onError: (err: any, variables, context) => {
      if (context?.previousReturnProcessApproval) {
        const queryKey = [
          RETURN_PROCESS_APPROVAL_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(
          queryKey,
          context.previousReturnProcessApproval
        )
      }
      if (context?.previousReturnProcessApprovalDetail) {
        queryClient.setQueryData(
          RETURN_PROCESS_APPROVAL_KEYS.detail(variables.data.id!),
          context.previousReturnProcessApprovalDetail
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
        queryKey: [RETURN_PROCESS_APPROVAL_KEYS.all],
        exact: false,
      })
      if (data?.id) {
        queryClient.invalidateQueries({
          queryKey: [RETURN_PROCESS_APPROVAL_KEYS.detail(data.id!)],
        })
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [RETURN_PROCESS_APPROVAL_KEYS.all],
      })
      queryClient.invalidateQueries({
        queryKey: [RETURN_PROCESS_APPROVAL_KEYS.detail(data.id!)],
      })
      toast.success(t("form-successfully-updated"))
      router.push(
        routes.scm.logisticsAndTransport.settings.returnProcessApproval
      )
    },
  })
}

export function useDeleteReturnProcessApproval() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (id: number) => ReturnProcessApprovalService.delete(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({
        queryKey: [RETURN_PROCESS_APPROVAL_KEYS.all],
        exact: false,
      })

      const queryKey = [
        RETURN_PROCESS_APPROVAL_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      // Snapshot the previous value
      const previousReturnProcessApproval =
        queryClient.getQueryData<ReturnProcessApprovalPaginator>(queryKey)

      // Optimistically remove the COA from the list
      queryClient.setQueryData<ReturnProcessApprovalPaginator>(
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

      return { previousReturnProcessApproval }
    },

    onSuccess: () => {
      toast.success(t("form-successfully-deleted"))
    },

    onError: (err: any, variables, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousReturnProcessApproval) {
        const queryKey = [
          RETURN_PROCESS_APPROVAL_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(
          queryKey,
          context.previousReturnProcessApproval
        )
      }
      toast.error(t("form-error-deleting"))
      // toast.error(err.response.data)
    },

    onSettled: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [RETURN_PROCESS_APPROVAL_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useBulkDeleteReturnProcessApproval() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    // Change mutationFn to accept an array of IDs
    mutationFn: (ids: number[]) => ReturnProcessApprovalService.bulkDelete(ids),
    onMutate: async (ids) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [RETURN_PROCESS_APPROVAL_KEYS.all],
        exact: false,
      })

      const queryKey = [
        RETURN_PROCESS_APPROVAL_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      // Snapshot the previous value
      const previousReturnProcessApproval =
        queryClient.getQueryData<ReturnProcessApprovalPaginator>(queryKey)

      // Optimistically remove multiple items from the list
      queryClient.setQueryData<ReturnProcessApprovalPaginator>(
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

      return { previousReturnProcessApproval }
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
      if (context?.previousReturnProcessApproval) {
        const queryKey = [
          RETURN_PROCESS_APPROVAL_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(
          queryKey,
          context.previousReturnProcessApproval
        )
      }
      toast.error(t("form-error-bulk-delete-dependency"))
      // toast.error(err.response.data)
    },

    onSettled: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [RETURN_PROCESS_APPROVAL_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useReturnProcessApprovalOperations() {
  const queryClient = useQueryClient()

  const invalidateReturnProcessApprovalQueries = useCallback(() => {
    queryClient.invalidateQueries({
      queryKey: RETURN_PROCESS_APPROVAL_KEYS.all,
    })
  }, [queryClient])

  return {
    invalidateReturnProcessApprovalQueries,
  }
}