"use client"

import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query"

import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "@/config/constants"
import { journalEntryType } from "@/modules/fms/service/journal-entry-type.service"
import {
  JournalEntryType,
  JournalEntryTypePaginator,
  JournalEntryTypeQueryOptions,
} from "@/modules/fms/types"
import {
  DEFAULT_QUERY_OPTIONS,
  createQueryKeys,
} from "@/server/service/query-config"
import { useTranslations } from "next-intl"
import toast from "react-hot-toast"
import { Text } from "rizzui/typography"

const JOURNAL_ENTRY_TYPE_KEYS = createQueryKeys("journal-entry-type")

export function useJournalEntryTypeList(
  options?: Partial<JournalEntryTypeQueryOptions>
) {
  const queryKey = [JOURNAL_ENTRY_TYPE_KEYS.all, options]

  return useQuery<JournalEntryTypePaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return journalEntryType.all(Object.assign({}, queryKey[1], pageParam))
    },
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}

export function useJournalEntryTypeById(id: number) {
  return useQuery({
    queryKey: JOURNAL_ENTRY_TYPE_KEYS.detail(id),
    queryFn: () => journalEntryType.get(id),
    enabled: !!id,
    ...DEFAULT_QUERY_OPTIONS,
  })
}

export function useCreateJournalEntryType() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: JournalEntryType) => journalEntryType.create(data),
    onMutate: async (newEntry) => {
      await queryClient.cancelQueries({
        queryKey: [JOURNAL_ENTRY_TYPE_KEYS.all],
        exact: false,
      })

      const queryKey = [
        JOURNAL_ENTRY_TYPE_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousEntries =
        queryClient.getQueryData<JournalEntryTypePaginator>(queryKey)

      queryClient.setQueryData<JournalEntryTypePaginator>(queryKey, (old) => {
        if (!old)
          return {
            data: [newEntry],
            count: 1,
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          }
        return {
          ...old,
          data: [...old.data, { ...newEntry, id: Date.now() }],
          count: old.count + 1,
        }
      })

      return { previousEntries }
    },
    onSuccess: () => {
      toast.success(
        <Text as="b">{t("form-journal-entry-type-successfully-created")}</Text>
      )
    },
    onError: (err, newEntry, context) => {
      if (context?.previousEntries) {
        queryClient.setQueryData(
          [JOURNAL_ENTRY_TYPE_KEYS.all],
          context.previousEntries
        )
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: JOURNAL_ENTRY_TYPE_KEYS.all })
    },
  })
}

export function useUpdateJournalEntryType() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: JournalEntryType) =>
      journalEntryType.update(data),
    onMutate: async (data) => {
      await queryClient.cancelQueries({
        queryKey: [JOURNAL_ENTRY_TYPE_KEYS.all],
        exact: false,
      })

      // Only cancel queries if id exists
      if (data.id) {
        await queryClient.cancelQueries({
          queryKey: JOURNAL_ENTRY_TYPE_KEYS.detail(data.id),
        })
      }

      const queryKey = [
        JOURNAL_ENTRY_TYPE_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousCurrencies =
        queryClient.getQueryData<JournalEntryTypePaginator>(queryKey)
      const previousCurrency = data.id
        ? queryClient.getQueryData<JournalEntryType>(
          JOURNAL_ENTRY_TYPE_KEYS.detail(data.id)
        )
        : undefined

      queryClient.setQueryData<JournalEntryTypePaginator>(queryKey, (old) => {
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
      })

      // Only set query data if id exists
      if (data.id) {
        queryClient.setQueryData(JOURNAL_ENTRY_TYPE_KEYS.detail(data.id), data)
      }

      return { previousCurrencies, previousCurrency }
    },
    onSuccess: () => {
      toast.success(
        <Text as="b">{t("form-journal-entry-type-successfully-updated")}</Text>
      )
    },
    onError: (err, variables, context) => {
      if (context?.previousCurrencies) {
        const queryKey = [
          JOURNAL_ENTRY_TYPE_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousCurrencies)
      }
      if (context?.previousCurrency && variables.id) {
        queryClient.setQueryData(
          JOURNAL_ENTRY_TYPE_KEYS.detail(variables.id),
          context.previousCurrency
        )
      }
    },
    onSettled: (data) => {
      queryClient.invalidateQueries({
        queryKey: [JOURNAL_ENTRY_TYPE_KEYS.all],
        exact: false,
      })
      if (data?.id) {
        queryClient.invalidateQueries({
          queryKey: JOURNAL_ENTRY_TYPE_KEYS.detail(data.id),
        })
      }
    },
  })
}

export function useDeleteJournalEntryType() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (id: number) => journalEntryType.delete(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({
        queryKey: [JOURNAL_ENTRY_TYPE_KEYS.all],
        exact: false,
      })

      const queryKey = [
        JOURNAL_ENTRY_TYPE_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      // Snapshot the previous value
      const previousCurrencies =
        queryClient.getQueryData<JournalEntryTypePaginator>(queryKey)

      // Optimistically remove the COA from the list
      queryClient.setQueryData<JournalEntryTypePaginator>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => item.id !== id),
          count: old.count - 1,
        }
      })

      return { previousCurrencies }
    },

    onSuccess: () => {
      toast.success(
        <Text as="b">{t("form-journal-entry-type-successfully-deleted")}</Text>
      )
    },

    onError: (err, variables, context) => {
      toast.error(
        <Text as="b">{t("form-journal-type-failed-to-delete")}</Text>
      )

      if (context?.previousCurrencies) {
        const queryKey = [
          JOURNAL_ENTRY_TYPE_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousCurrencies)
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [JOURNAL_ENTRY_TYPE_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useBulkDeleteJournalEntryType() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (ids: number[]) => journalEntryType.bulk(ids),
    onMutate: async (ids) => {
      await queryClient.cancelQueries({
        queryKey: [JOURNAL_ENTRY_TYPE_KEYS.all],
        exact: false,
      })

      const queryKey = [
        JOURNAL_ENTRY_TYPE_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousCurrencies =
        queryClient.getQueryData<JournalEntryTypePaginator>(queryKey)
      queryClient.setQueryData<JournalEntryTypePaginator>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => !ids.includes(item.id as number)),
          count: old.count - ids.length,
        }
      })

      return { previousCurrencies }
    },
    onSuccess: () => {
      toast.success(
        <Text as="b">{t("form-journal-entry-type-deleted-successfully")}</Text>
      )
    },
    onError: (err, variables, context) => {
      toast.error(
        <Text as="b">{t("form-journal-entry-type-failed-to-delete")}</Text>
      )
      if (context?.previousCurrencies) {
        const queryKey = [
          JOURNAL_ENTRY_TYPE_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousCurrencies)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [JOURNAL_ENTRY_TYPE_KEYS.all],
        exact: false,
      })
    },
  })
}
