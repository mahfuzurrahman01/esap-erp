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
import {
  DEFAULT_QUERY_OPTIONS,
  createQueryKeys,
} from "@/server/service/query-config"

import { reminder } from "../service/reminder.service"
import {
  ReminderList,
  ReminderPaginator,
  ReminderQueryOptions,
} from "../types/reminder"

export const Reminder_KEYS = createQueryKeys("Reminder")

export function useReminderList(options?: Partial<ReminderQueryOptions>) {
  const queryKey = [Reminder_KEYS.all, options]

  return useQuery<ReminderPaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return reminder.all(Object.assign({}, queryKey[1], pageParam))
    },
    placeholderData: keepPreviousData,
    throwOnError: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}

export function useReminderById(id: any) {
  return useQuery({
    queryKey: Reminder_KEYS.detail(id),
    queryFn: () => reminder.get(id),
    enabled: !!id,
    ...DEFAULT_QUERY_OPTIONS,
  })
}

export function useCreateReminder() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: any): Promise<any> => reminder.create(data),
    onMutate: async (newReminder) => {
      await queryClient.cancelQueries({
        queryKey: [Reminder_KEYS.all],
        exact: false,
      })

      const queryKey = [
        Reminder_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousCountries =
        queryClient.getQueryData<ReminderPaginator>(queryKey)

      queryClient.setQueryData<ReminderPaginator>(queryKey, (old: any) => {
        if (!old)
          return {
            data: [newReminder],
            count: 1,
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          }
        return {
          ...old,
          data: [...old.data, { ...newReminder, id: Date.now() }],
          count: old.count + 1,
        }
      })

      return { previousCountries }
    },
    onSuccess: () => {
      toast.success(t("form-Reminder-created-successfully"))
      router.refresh()
    },
    onError: (err, newReminder, context) => {
      toast.error(t("form-failed-to-create-Reminder"))
      if (context?.previousCountries) {
        const queryKey = [
          Reminder_KEYS.all,
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
        queryKey: [Reminder_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useUpdateReminder() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: ({ id, data }: { id: any; data: any }) =>
      reminder.update(id, data),
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({
        queryKey: [Reminder_KEYS.all],
        exact: false,
      })
      await queryClient.cancelQueries({
        queryKey: Reminder_KEYS.detail(id),
      })

      const queryKey = [
        Reminder_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousCountries =
        queryClient.getQueryData<ReminderPaginator>(queryKey)
      const previousReminder = queryClient.getQueryData<ReminderList>(
        Reminder_KEYS.detail(id)
      )

      queryClient.setQueryData<ReminderPaginator>(queryKey, (old: any) => {
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

      queryClient.setQueryData(Reminder_KEYS.detail(id), data)

      return { previousCountries, previousReminder }
    },
    onSuccess: () => {
      toast.success(t("form-Reminder-updated-successfully"))
      router.refresh()
    },
    onError: (err, variables, context) => {
      toast.error(t("form-failed-to-update-Reminder"))
      if (context?.previousCountries) {
        const queryKey = [
          Reminder_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousCountries)
      }
      if (context?.previousReminder) {
        queryClient.setQueryData(
          Reminder_KEYS.detail(variables.id),
          context.previousReminder
        )
      }
    },
    onSettled: (data: any) => {
      queryClient.invalidateQueries({
        queryKey: [Reminder_KEYS.all],
        exact: false,
      })
      if (data?.id) {
        queryClient.invalidateQueries({
          queryKey: Reminder_KEYS.detail(data.id),
        })
      }
    },
  })
}

export function useDeleteReminder() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (id: any) => reminder.delete(id),
    onMutate: async (id) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [Reminder_KEYS.all],
        exact: false,
      })

      const queryKey = [
        Reminder_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      // Snapshot the previous value
      const previousCountries =
        queryClient.getQueryData<ReminderPaginator>(queryKey)

      // Optimistically remove the COA from the list
      queryClient.setQueryData<ReminderPaginator>(queryKey, (old) => {
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
      toast.success(t("form-Reminder-deleted-successfully"))
    },

    onError: (err, variables, context) => {
      if (context?.previousCountries) {
        const queryKey = [
          Reminder_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousCountries)
      }
      toast.error(t("form-failed-to-delete-Reminder"))
    },

    onSettled: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [Reminder_KEYS.all],
        exact: false,
      })
    },
  })
}
