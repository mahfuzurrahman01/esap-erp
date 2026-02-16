"use client"

import { useParams, useRouter } from "next/navigation"

import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query"
import { useTranslations } from "next-intl"
import toast from "react-hot-toast"
import { Text } from "rizzui"

import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "@/config/constants"
import { routes } from "@/config/routes"
import { JournalEntryService } from "@/modules/fms/service/journal-entry.service"
import {
  JournalEntryList,
  JournalEntryPaginator,
  JournalEntryQueryOptions,
  JournalEntryView,
} from "@/modules/fms/types"
import { createQueryKeys } from "@/server/service/query-config"

export const JOURNAL_ENTRY_KEYS = createQueryKeys("journal-entry")

export function useJournalEntryList(
  options?: Partial<JournalEntryQueryOptions>
) {
  const queryKey = [JOURNAL_ENTRY_KEYS.all, options]

  return useQuery<JournalEntryPaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return JournalEntryService.all(Object.assign({}, queryKey[1], pageParam))
    },
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}

export function useJournalEntryById(id: number) {
  return useQuery<JournalEntryView, Error>({
    queryKey: JOURNAL_ENTRY_KEYS.detail(id),
    queryFn: () => JournalEntryService.get(id),
    enabled: !!id,
  })
}

export function useCreateJournalEntry() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: JournalEntryList): Promise<JournalEntryList> =>
      JournalEntryService.create(data),
    onMutate: async (newJournalEntry) => {
      await queryClient.cancelQueries({
        queryKey: [JOURNAL_ENTRY_KEYS.all],
        exact: false,
      })

      const queryKey = [
        JOURNAL_ENTRY_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousJournalEntries =
        queryClient.getQueryData<JournalEntryPaginator>(queryKey)

      queryClient.setQueryData<JournalEntryPaginator>(queryKey, (old) => {
        if (!old)
          return {
            data: [newJournalEntry],
            count: 1,
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          }
        return {
          ...old,
          data: [...old.data, { ...newJournalEntry, id: Date.now() }],
          count: old.count + 1,
        }
      })

      return { previousJournalEntries }
    },
    onSuccess: () => {
      toast.success(
        <Text as="b">{t("form-journal-entry-successfully-created")}</Text>
      )
      router.push(`${routes.fms.journalEntry}`)
    },
    onError: (err, newJournalEntry, context) => {
      if (context?.previousJournalEntries) {
        const queryKey = [
          JOURNAL_ENTRY_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousJournalEntries)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [JOURNAL_ENTRY_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useUpdateJournalEntry() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")
  const params = useParams()
  const journalEntryId = params.journalEntryId ?? ""

  return useMutation({
    mutationFn: (data: JournalEntryList) =>
      JournalEntryService.update(data),
    onMutate: async (data) => {
      await queryClient.cancelQueries({
        queryKey: [JOURNAL_ENTRY_KEYS.all],
        exact: false,
      })

      // Only cancel queries if id exists
      if (data.id) {
        await queryClient.cancelQueries({
          queryKey: JOURNAL_ENTRY_KEYS.detail(data.id),
        })
      }

      const queryKey = [
        JOURNAL_ENTRY_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousCountries =
        queryClient.getQueryData<JournalEntryPaginator>(queryKey)

      // Only get previous country data if id exists
      const previousCountry = data.id
        ? queryClient.getQueryData<JournalEntryList>(JOURNAL_ENTRY_KEYS.detail(data.id))
        : undefined

      queryClient.setQueryData<JournalEntryPaginator>(queryKey, (old) => {
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

      if (data.id) {
        queryClient.setQueryData(JOURNAL_ENTRY_KEYS.detail(data.id), data)
      }

      return { previousCountries, previousCountry }
    },
    onSuccess: () => {
      toast.success(
        <Text as="b">{t("form-journal-entry-successfully-updated")}</Text>
      )
      router.push(`${routes.fms.journalEntry}/${journalEntryId}`)
    },
    onError: (err, variables, context) => {
      if (context?.previousCountries) {
        const queryKey = [
          JOURNAL_ENTRY_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousCountries)
      }
      if (context?.previousCountry && variables.id) {
        queryClient.setQueryData(
          JOURNAL_ENTRY_KEYS.detail(variables.id),
          context.previousCountry
        )
      }
    },
    onSettled: (data) => {
      queryClient.invalidateQueries({
        queryKey: [JOURNAL_ENTRY_KEYS.all],
        exact: false,
      })
      if (data?.id) {
        queryClient.invalidateQueries({
          queryKey: JOURNAL_ENTRY_KEYS.detail(data.id),
        })
      }
    },
  })
}

export function useDeleteJournalEntry() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (id: number) => JournalEntryService.delete(id),
    onMutate: async (id) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [JOURNAL_ENTRY_KEYS.all],
        exact: false,
      })

      const queryKey = [
        JOURNAL_ENTRY_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      // Snapshot the previous value
      const previousJournalEntries =
        queryClient.getQueryData<JournalEntryPaginator>(queryKey)

      // Optimistically remove the COA from the list
      queryClient.setQueryData<JournalEntryPaginator>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => item.id !== id),
          count: old.count - 1,
        }
      })

      return { previousJournalEntries }
    },

    onSuccess: () => {
      toast.success(
        <Text as="b">{t("form-journal-entry-successfully-deleted")}</Text>
      )
    },

    onError: (err, variables, context) => {
      toast.error(
        <Text as="b">{t("form-journal-entry-failed-to-delete")}</Text>
      )
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousJournalEntries) {
        const queryKey = [
          JOURNAL_ENTRY_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousJournalEntries)
      }
    },

    onSettled: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [JOURNAL_ENTRY_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useBulkDeleteJournalEntry() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (ids: number[]) => JournalEntryService.bulk(ids),
    onMutate: async (ids) => {
      await queryClient.cancelQueries({
        queryKey: [JOURNAL_ENTRY_KEYS.all],
        exact: false,
      })

      const queryKey = [
        JOURNAL_ENTRY_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousJournalEntries = queryClient.getQueryData<JournalEntryPaginator>(queryKey)

      // Optimistically remove the bank transactions from the list
      queryClient.setQueryData<JournalEntryPaginator>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => !ids.includes(item.id as number)),
          count: old.count - ids.length,
        }
      })

      return { previousJournalEntries }
    },
    onSuccess: () => {
      toast.success(<Text as="b">{t("form-journal-entry-deleted-successfully")}</Text>)
    },
    onError: (err, variables, context) => {
      toast.error(<Text as="b">{t("form-journal-entry-failed-to-delete")}</Text>)
      if (context?.previousJournalEntries) {
        const queryKey = [
          JOURNAL_ENTRY_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousJournalEntries)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [JOURNAL_ENTRY_KEYS.all],
        exact: false,
      })
    },
  })
}