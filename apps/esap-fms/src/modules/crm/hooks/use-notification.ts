"use client"
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query"
import { useTranslations } from "next-intl"
import toast from "react-hot-toast"

import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "@/config/constants"
import {
  DEFAULT_QUERY_OPTIONS,
  createQueryKeys,
} from "@/server/service/query-config"

import { notification } from "../service/notification.service"
import {
  NotificationList,
  NotificationPaginator,
  NotificationQueryOptions,
} from "../types/notification"

export const NOTIFICATION_KEYS = createQueryKeys("Notification")

export function useNotificationList(
  options?: Partial<NotificationQueryOptions>
) {
  const queryKey = [NOTIFICATION_KEYS.all, options]

  return useQuery<NotificationPaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return notification.all(Object.assign({}, queryKey[1], pageParam))
    },
    placeholderData: keepPreviousData,
    throwOnError: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}

export function useNotificationById(id: any) {
  return useQuery({
    queryKey: [NOTIFICATION_KEYS.detail(id)],
    queryFn: () => notification.get(id),
    enabled: !!id,
    ...DEFAULT_QUERY_OPTIONS,
  })
}

export function useCreateNotification() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: any): Promise<any> => notification.create(data),
    onMutate: async (newNotification) => {
      await queryClient.cancelQueries({
        queryKey: [NOTIFICATION_KEYS.all],
        exact: false,
      })

      const queryKey = [
        NOTIFICATION_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousCountries =
        queryClient.getQueryData<NotificationPaginator>(queryKey)

      queryClient.setQueryData<NotificationPaginator>(queryKey, (old: any) => {
        if (!old)
          return {
            data: [newNotification],
            count: 1,
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          }
        return {
          ...old,
          data: [...old.data, { ...newNotification, id: Date.now() }],
          count: old.count + 1,
        }
      })

      return { previousCountries }
    },
    onSuccess: () => {
      // router.push(routes.crm.notifications)
      // toast.success(t("form-notification-created-successfully"))
    },
    onError: (err, newNotification, context) => {
      toast.error(t("form-failed-to-create-notification"))
      if (context?.previousCountries) {
        const queryKey = [
          NOTIFICATION_KEYS.all,
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
        queryKey: [NOTIFICATION_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useUpdateNotification() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: ({ id, data }: { id: any; data: any }) =>
      notification.update(id, data),
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({
        queryKey: [NOTIFICATION_KEYS.all],
        exact: false,
      })
      await queryClient.cancelQueries({
        queryKey: NOTIFICATION_KEYS.detail(id),
      })

      const queryKey = [
        NOTIFICATION_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousCountries =
        queryClient.getQueryData<NotificationPaginator>(queryKey)
      const previousNotification = queryClient.getQueryData<NotificationList>(
        NOTIFICATION_KEYS.detail(id)
      )

      queryClient.setQueryData<NotificationPaginator>(queryKey, (old: any) => {
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
            item.id === id ? { ...item, ...data } : item
          ),
        }
      })

      queryClient.setQueryData(NOTIFICATION_KEYS.detail(id), data)

      return { previousCountries, previousNotification }
    },
    onSuccess: () => {
      // router.push(routes.crm.notifications)
      // toast.success(t("form-notification-updated-successfully"))
    },
    onError: (err, variables, context) => {
      toast.error(t("form-failed-to-update-Notification"))
      if (context?.previousCountries) {
        const queryKey = [
          NOTIFICATION_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousCountries)
      }
      if (context?.previousNotification) {
        queryClient.setQueryData(
          NOTIFICATION_KEYS.detail(variables.id),
          context.previousNotification
        )
      }
    },
    onSettled: (data: any) => {
      queryClient.invalidateQueries({
        queryKey: [NOTIFICATION_KEYS.all],
        exact: false,
      })
      if (data?.id) {
        queryClient.invalidateQueries({
          queryKey: NOTIFICATION_KEYS.detail(data.id),
        })
      }
    },
  })
}

export function useDeleteNotification() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (id: any) => notification.delete(id),
    onMutate: async (id) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [NOTIFICATION_KEYS.all],
        exact: false,
      })

      const queryKey = [
        NOTIFICATION_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      // Snapshot the previous value
      const previousCountries =
        queryClient.getQueryData<NotificationPaginator>(queryKey)

      // Optimistically remove the COA from the list
      queryClient.setQueryData<NotificationPaginator>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => item.id !== id),
          count: old.total - 1,
        }
      })

      return { previousCountries }
    },

    onSuccess: () => {
      toast.success(t("form-Notification-deleted-successfully"))
    },

    onError: (err, variables, context) => {
      toast.error(t("form-failed-to-delete-Notification"))
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousCountries) {
        const queryKey = [
          NOTIFICATION_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousCountries)
      }
    },

    onSettled: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [NOTIFICATION_KEYS.all],
        exact: false,
      })
    },
  })
}
