"use client"

import { useRouter } from "next/navigation"

import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query"
import { useTranslations } from "next-intl"
import toast from "react-hot-toast"

import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "@/config/constants"
import { approval } from "@/modules/crm/service/approval.service"
import {
  ApprovalList,
  ApprovalPaginator,
  ApprovalQueryOptions,
} from "@/modules/crm/types/approval"
import {
  DEFAULT_QUERY_OPTIONS,
  createQueryKeys,
} from "@/server/service/query-config"

export const APPROVAL_KEYS = createQueryKeys("Approval")

export function useApprovalList(options?: Partial<ApprovalQueryOptions>) {
  const queryKey = [APPROVAL_KEYS.all, options]

  return useQuery<ApprovalPaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return approval.all(Object.assign({}, queryKey[1], pageParam))
    },
    placeholderData: keepPreviousData,
    throwOnError: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}

export function useApprovalById(id: any) {
  return useQuery({
    queryKey: [APPROVAL_KEYS.detail(id)],
    queryFn: () => approval.get(id),
    enabled: !!id,
    ...DEFAULT_QUERY_OPTIONS,
  })
}

export function useCreateApproval() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: any): Promise<any> => approval.create(data),
    onMutate: async (newApproval) => {
      await queryClient.cancelQueries({
        queryKey: [APPROVAL_KEYS.all],
        exact: false,
      })

      const queryKey = [
        APPROVAL_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousCountries =
        queryClient.getQueryData<ApprovalPaginator>(queryKey)

      queryClient.setQueryData<ApprovalPaginator>(queryKey, (old: any) => {
        if (!old)
          return {
            data: [newApproval],
            count: 1,
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          }
        return {
          ...old,
          data: [...old.data, { ...newApproval, id: Date.now() }],
          count: old.count + 1,
        }
      })

      return { previousCountries }
    },
    onSuccess: () => {
      toast.success(t("form-successfully-sent-for-approval"))
      router.refresh()
    },
    onError: (err, newApproval, context) => {
      toast.error(t("form-failed-to-sent-for-approval"))
      if (context?.previousCountries) {
        const queryKey = [
          APPROVAL_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousCountries)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [APPROVAL_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useUpdateApproval() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: any) => approval.update(data),
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({
        queryKey: [APPROVAL_KEYS.all],
        exact: false,
      })
      await queryClient.cancelQueries({
        queryKey: APPROVAL_KEYS.detail(id),
      })

      const queryKey = [
        APPROVAL_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousCountries =
        queryClient.getQueryData<ApprovalPaginator>(queryKey)
      const previousApproval = queryClient.getQueryData<ApprovalList>(
        APPROVAL_KEYS.detail(id)
      )

      queryClient.setQueryData<ApprovalPaginator>(queryKey, (old: any) => {
        if (!old)
          return {
            data: [data],
            count: 1,
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          }
        return {
          ...old,
          data: old.data.map((item: any) =>
            item?.id === id ? { ...item, ...data } : item
          ),
        }
      })

      queryClient.setQueryData(APPROVAL_KEYS.detail(id), data)

      return { previousCountries, previousApproval }
    },
    onSuccess: () => {
      toast.success(t("form-approval-status-updated-successfully"))
      router.refresh()
    },
    onError: (err, variables, context) => {
      toast.error(t("form-failed-to-update-approval-status"))
      if (context?.previousCountries) {
        const queryKey = [
          APPROVAL_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousCountries)
      }
      if (context?.previousApproval) {
        queryClient.setQueryData(
          APPROVAL_KEYS.detail(variables.id),
          context.previousApproval
        )
      }
    },
    onSettled: (data: any) => {
      queryClient.invalidateQueries({
        queryKey: [APPROVAL_KEYS.all],
        exact: false,
      })
      if (data?.id) {
        queryClient.invalidateQueries({
          queryKey: APPROVAL_KEYS.detail(data.id),
        })
      }
    },
  })
}

export function useDeleteApproval() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (id: any) => approval.delete(id),
    onMutate: async (id) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [APPROVAL_KEYS.all],
        exact: false,
      })

      const queryKey = [
        APPROVAL_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      // Snapshot the previous value
      const previousCountries =
        queryClient.getQueryData<ApprovalPaginator>(queryKey)

      // Optimistically remove the COA from the list
      queryClient.setQueryData<ApprovalPaginator>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => item.id !== id),
          count: old.count - 1,
        }
      })

      return { previousCountries }
    },

    onSuccess: () => {
      toast.success(t("form-approval-deleted-successfully"))
    },

    onError: (err, variables, context) => {
      if (context?.previousCountries) {
        const queryKey = [
          APPROVAL_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousCountries)
      }
      toast.error(t("form-failed-to-delete-approval"))
    },

    onSettled: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [APPROVAL_KEYS.all],
        exact: false,
      })
    },
  })
}
