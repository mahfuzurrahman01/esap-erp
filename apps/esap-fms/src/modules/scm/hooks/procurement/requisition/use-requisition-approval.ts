"use client";

import { useRouter } from "next/navigation";



import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "react-hot-toast";



import { DEFAULT_PAGE_SIZE } from "@/config/constants";
import { DEFAULT_PAGE_INDEX } from "@/config/constants";
import { routes } from "@/config/routes";
import { RequisitionApprovalService } from "@/modules/scm/service/procurement/requisition/requisition-approval.service";
import { RequisitionApproval, RequisitionApprovalPaginator, RequisitionApprovalQueryOptions } from "@/modules/scm/types/procurement/requisition/requisition-approval-types";
import { Requisition, RequisitionPaginator } from "@/modules/scm/types/procurement/requisition/requisition-types";
import { DEFAULT_QUERY_OPTIONS, createQueryKeys } from "@/server/service/query-config";





const REQUISITION_APPROVAL_KEYS = createQueryKeys("requisition-approval")

const REQUISITION_KEYS = createQueryKeys("requisition")

export function useRequisitionApprovalList(
  options?: Partial<RequisitionApprovalQueryOptions>
) {
  const queryKey = [REQUISITION_APPROVAL_KEYS.all, options]

  return useQuery<RequisitionApprovalPaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return RequisitionApprovalService.all(
        Object.assign({}, queryKey[1], pageParam)
      )
    },
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}

export function useRequisitionApprovalById(id: number) {
  return useQuery({
    queryKey: [REQUISITION_APPROVAL_KEYS.detail(id)],
    queryFn: () => RequisitionApprovalService.get(id),
    enabled: !!id,
    ...DEFAULT_QUERY_OPTIONS,
  })
}

export function useCreateRequisitionApproval() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: RequisitionApproval): Promise<RequisitionApproval> =>
      RequisitionApprovalService.create(data),
    onMutate: async (newRequisitionApproval) => {
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
            data: [newRequisitionApproval as unknown as Requisition],
            count: 1,
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          }
        return {
          ...old,
          data: [
            ...old.data,
            {
              ...newRequisitionApproval,
              id: Date.now(),
            } as unknown as Requisition,
          ],
          count: old.count + 1,
        }
      })
      return { previousRequisition }
    },
    onSuccess: () => {
      toast.success(t("form-successfully-created"))
      router.refresh()
      router.push(routes.scm.procurement.requisitions.requisitions)
    },
    onError: (err: any, newRequisitionApproval, context) => {
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

export function useUpdateRequisitionApproval() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")
  const router = useRouter()

  return useMutation({
    mutationFn: ({ data }: { data: RequisitionApproval }) =>
      RequisitionApprovalService.update(data),
    onMutate: async ({ data }) => {
      await queryClient.cancelQueries({
        queryKey: [REQUISITION_APPROVAL_KEYS.all],
        exact: false,
      })
      await queryClient.cancelQueries({
        queryKey: REQUISITION_APPROVAL_KEYS.detail(data.id!),
      })
      const queryKey = [
        REQUISITION_APPROVAL_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]
      const previousRequisitionApproval =
        queryClient.getQueryData<RequisitionApprovalPaginator>(queryKey)
      const previousRequisitionApprovalDetail =
        queryClient.getQueryData<RequisitionApproval>(
          REQUISITION_APPROVAL_KEYS.detail(data.id!)
        )
      queryClient.setQueryData<RequisitionApprovalPaginator>(
        queryKey,
        (old) => {
          if (!old)
            return {
              data: [data as unknown as RequisitionApproval],
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
      queryClient.setQueryData(REQUISITION_APPROVAL_KEYS.detail(data.id!), data)
      return { previousRequisitionApproval, previousRequisitionApprovalDetail }
    },
    onError: (err: any, variables, context) => {
      if (context?.previousRequisitionApproval) {
        const queryKey = [
          REQUISITION_APPROVAL_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousRequisitionApproval)
      }
      if (context?.previousRequisitionApprovalDetail) {
        queryClient.setQueryData(
          REQUISITION_APPROVAL_KEYS.detail(variables.data.id!),
          context.previousRequisitionApprovalDetail
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
        queryKey: [REQUISITION_APPROVAL_KEYS.all],
        exact: false,
      })
      if (data?.id) {
        queryClient.invalidateQueries({
          queryKey: [REQUISITION_APPROVAL_KEYS.detail(data.id!)],
        })
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: REQUISITION_APPROVAL_KEYS.all })
      queryClient.invalidateQueries({
        queryKey: [REQUISITION_APPROVAL_KEYS.detail(data.id!)],
      })
      toast.success(t("form-successfully-update"))
      router.push(routes.scm.procurement.setting.requisitionApproval)
    },
  })
}

export function useDeleteRequisitionApproval() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (id: number) => RequisitionApprovalService.delete(id),
    onMutate: async (id) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [REQUISITION_APPROVAL_KEYS.all],
        exact: false,
      })

      const queryKey = [
        REQUISITION_APPROVAL_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      // Snapshot the previous value
      const previousRequisitionsApproval =
        queryClient.getQueryData<RequisitionApprovalPaginator>(queryKey)

      // Optimistically remove the COA from the list
      queryClient.setQueryData<RequisitionApprovalPaginator>(
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

      return { previousRequisitionsApproval }
    },

    onSuccess: () => {
      toast.success(t("form-successfully-deleted"))
    },

    onError: (err: any, variables, context) => {
       toast.error(t("form-error-deleting-dependency"))
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousRequisitionsApproval) {
        const queryKey = [
          REQUISITION_APPROVAL_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousRequisitionsApproval)
       
      }
    },

    onSettled: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [REQUISITION_APPROVAL_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useBulkDeleteRequisitionApproval() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    // Change mutationFn to accept an array of IDs
    mutationFn: (ids: number[]) => RequisitionApprovalService.bulkDelete(ids),
    onMutate: async (ids) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [REQUISITION_APPROVAL_KEYS.all],
        exact: false,
      })

      const queryKey = [
        REQUISITION_APPROVAL_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      // Snapshot the previous value
      const previousRequisitionApproval =
        queryClient.getQueryData<RequisitionApprovalPaginator>(queryKey)

      // Optimistically remove multiple items from the list
      queryClient.setQueryData<RequisitionApprovalPaginator>(
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

      return { previousRequisitionApproval }
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
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousRequisitionApproval) {
        const queryKey = [
          REQUISITION_APPROVAL_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousRequisitionApproval)
      }
    },

    onSettled: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [REQUISITION_APPROVAL_KEYS.all],
        exact: false,
      })
    },
  })
}