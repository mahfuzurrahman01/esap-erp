"use client"

import { useParams, useRouter } from "next/navigation"

import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query"
import { useTranslations } from "next-intl"
import { toast } from "react-hot-toast"
import { Text } from "rizzui"

import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "@/config/constants"
import { routes } from "@/config/routes"
import { journalEntryTemplate } from "@/modules/fms/service/journal-entry-template.service"
import {
  JournalEntryQueryOptions,
  JournalTemplate,
  JournalTemplatePaginator,
  JournalTemplateView,
} from "@/modules/fms/types"
import { createQueryKeys } from "@/server/service/query-config"

const JOURNAL_TEMPLATE_KEYS = createQueryKeys("journal-entry-template")

export function useJournalEntryTemplateList(
  options?: Partial<JournalEntryQueryOptions>
) {
  const queryKey = [JOURNAL_TEMPLATE_KEYS.all, options]

  return useQuery<JournalTemplatePaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return journalEntryTemplate.all(Object.assign({}, queryKey[1], pageParam))
    },
    placeholderData: keepPreviousData,
  })
}

export function useJournalEntryTemplateById(id: number) {
  return useQuery<JournalTemplateView, Error>({
    queryKey: JOURNAL_TEMPLATE_KEYS.detail(id),
    queryFn: () => journalEntryTemplate.get(id),
    enabled: !!id,
  })
}

export function useCreateJournalEntryTemplate() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: JournalTemplate) => journalEntryTemplate.create(data),
    onMutate: async (newTemplate) => {
      await queryClient.cancelQueries({
        queryKey: [JOURNAL_TEMPLATE_KEYS.all],
        exact: false,
      })

      const queryKey = [
        JOURNAL_TEMPLATE_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousTemplates =
        queryClient.getQueryData<JournalTemplatePaginator>(queryKey)

      queryClient.setQueryData<JournalTemplatePaginator>(queryKey, (old) => {
        if (!old)
          return {
            data: [newTemplate],
            count: 1,
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          }
        return {
          ...old,
          data: [...old.data, { ...newTemplate, id: Date.now() }],
          count: old.count + 1,
        }
      })

      return { previousTemplates }
    },
    onSuccess: async () => {
      toast.success(<Text as="b">{t("form-journal-template-created")}</Text>)
      router.push(`${routes.fms.journalTemplate}`)
    },
    onError: (err, newTemplate, context) => {
      if (context?.previousTemplates) {
        queryClient.setQueryData(
          [JOURNAL_TEMPLATE_KEYS.all],
          context.previousTemplates
        )
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: JOURNAL_TEMPLATE_KEYS.all })
    },
  })
}

export function useUpdateJournalEntryTemplate() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")
  const params = useParams()
  const journalTemplateId = params.journalTemplateId ?? ""

  return useMutation({
    mutationFn: (data: JournalTemplate) =>
      journalEntryTemplate.update(data),
    onMutate: async (data) => {
      await queryClient.cancelQueries({
        queryKey: [JOURNAL_TEMPLATE_KEYS.all],
        exact: false,
      })

      // Only cancel queries if id exists
      if (data.id) {
        await queryClient.cancelQueries({
          queryKey: JOURNAL_TEMPLATE_KEYS.detail(data.id),
        })
      }

      const queryKey = [
        JOURNAL_TEMPLATE_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousCountries =
        queryClient.getQueryData<JournalTemplatePaginator>(queryKey)

      // Only get previous country data if id exists
      const previousCountry = data.id
        ? queryClient.getQueryData<JournalTemplateView>(JOURNAL_TEMPLATE_KEYS.detail(data.id))
        : undefined

      queryClient.setQueryData<JournalTemplatePaginator>(queryKey, (old) => {
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
        queryClient.setQueryData(JOURNAL_TEMPLATE_KEYS.detail(data.id), data)
      }

      return { previousCountries, previousCountry }
    },
    onSuccess: async () => {
      toast.success(
        <Text as="b">{t("form-journal-template-successfully-updated")}</Text>
      )
      router.push(`${routes.fms.journalTemplate}/${journalTemplateId}`)
    },
    onError: (err, variables, context) => {
      if (context?.previousCountries) {
        const queryKey = [
          JOURNAL_TEMPLATE_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousCountries)
      }
      if (context?.previousCountry && variables.id) {
        queryClient.setQueryData(
          JOURNAL_TEMPLATE_KEYS.detail(variables.id),
          context.previousCountry
        )
      }
    },
    onSettled: (data) => {
      queryClient.invalidateQueries({
        queryKey: [JOURNAL_TEMPLATE_KEYS.all],
        exact: false,
      })
      if (data?.id) {
        queryClient.invalidateQueries({
          queryKey: JOURNAL_TEMPLATE_KEYS.detail(data.id),
        })
      }
    },
  })
}

export function useDeleteJournalEntryTemplate() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (id: number) => journalEntryTemplate.delete(id),
    onMutate: async (id) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [JOURNAL_TEMPLATE_KEYS.all],
        exact: false,
      })

      const queryKey = [
        JOURNAL_TEMPLATE_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      // Snapshot the previous value
      const previousJournalEntries =
        queryClient.getQueryData<JournalTemplatePaginator>(queryKey)

      // Optimistically remove the COA from the list
      queryClient.setQueryData<JournalTemplatePaginator>(queryKey, (old) => {
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
        <Text as="b">{t("form-journal-template-successfully-deleted")}</Text>
      )
    },

    onError: (err, variables, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      toast.error(
        <Text as="b">{t("form-journal-template-failed-to-delete")}</Text>
      )

      if (context?.previousJournalEntries) {
        const queryKey = [
          JOURNAL_TEMPLATE_KEYS.all,
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
        queryKey: [JOURNAL_TEMPLATE_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useBulkDeleteJournalTemplate() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (ids: number[]) => journalEntryTemplate.bulk(ids),
    onMutate: async (ids) => {
      await queryClient.cancelQueries({
        queryKey: [JOURNAL_TEMPLATE_KEYS.all],
        exact: false,
      })

      const queryKey = [
        JOURNAL_TEMPLATE_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousJournalTemplates = queryClient.getQueryData<JournalTemplatePaginator>(queryKey)

      // Optimistically remove the bank transactions from the list
      queryClient.setQueryData<JournalTemplatePaginator>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => !ids.includes(item.id as number)),
          count: old.count - ids.length,
        }
      })

      return { previousJournalTemplates }
    },
    onSuccess: () => {
      toast.success(<Text as="b">{t("form-journal-template-deleted-successfully")}</Text>)
    },
    onError: (err, variables, context) => {
      toast.error(<Text as="b">{t("form-journal-template-failed-to-delete")}</Text>)
      if (context?.previousJournalTemplates) {
        const queryKey = [
          JOURNAL_TEMPLATE_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousJournalTemplates)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [JOURNAL_TEMPLATE_KEYS.all],
        exact: false,
      })
    },
  })
}