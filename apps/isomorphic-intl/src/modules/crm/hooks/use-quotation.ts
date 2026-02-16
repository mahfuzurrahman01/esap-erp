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
import { routes } from "@/config/routes"
import { quotation } from "@/modules/crm/service/quotation.service"
import {
  QuotationList,
  QuotationPaginator,
  QuotationQueryOptions,
} from "@/modules/crm/types/quotation"
import {
  DEFAULT_QUERY_OPTIONS,
  createQueryKeys,
} from "@/server/service/query-config"

export const QUOTATION_KEYS = createQueryKeys("quotation")

export function useQuotationList(options?: Partial<QuotationQueryOptions>) {
  const queryKey = [QUOTATION_KEYS.all, options]

  return useQuery<QuotationPaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return quotation.all(Object.assign({}, queryKey[1], pageParam))
    },
    placeholderData: keepPreviousData,
    throwOnError: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}

export function useQuotationById(id: any) {
  return useQuery({
    queryKey: [QUOTATION_KEYS.detail(id)],
    queryFn: () => quotation.get(id),
    enabled: !!id,
    throwOnError: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    ...DEFAULT_QUERY_OPTIONS,
  })
}

export function useCreateQuotation() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: any): Promise<any> => quotation.create(data),
    onMutate: async (newquotation) => {
      await queryClient.cancelQueries({
        queryKey: [QUOTATION_KEYS.all],
        exact: false,
      })

      const queryKey = [
        QUOTATION_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousCountries =
        queryClient.getQueryData<QuotationPaginator>(queryKey)

      queryClient.setQueryData<QuotationPaginator>(queryKey, (old: any) => {
        if (!old)
          return {
            data: [newquotation],
            count: 1,
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          }
        return {
          ...old,
          data: [...old.data, { ...newquotation, id: Date.now() }],
          count: old.count + 1,
        }
      })

      return { previousCountries }
    },
    onSuccess: () => {
      router.push(routes.crm.quotation)
      toast.success(t("form-quotation-created-successfully"))
    },
    onError: (err, newquotation, context) => {
      toast.error(t("form-failed-to-create-quotation"))
      if (context?.previousCountries) {
        const queryKey = [
          QUOTATION_KEYS.all,
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
        queryKey: [QUOTATION_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useUpdateQuotation() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: ({ id, data }: { id: any; data: any }) =>
      quotation.update(id, data),
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({
        queryKey: [QUOTATION_KEYS.all],
        exact: false,
      })
      await queryClient.cancelQueries({
        queryKey: QUOTATION_KEYS.detail(id),
      })

      const queryKey = [
        QUOTATION_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousCountries =
        queryClient.getQueryData<QuotationPaginator>(queryKey)
      const previousquotation = queryClient.getQueryData<QuotationList>(
        QUOTATION_KEYS.detail(id)
      )

      queryClient.setQueryData<QuotationPaginator>(queryKey, (old: any) => {
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

      queryClient.setQueryData(QUOTATION_KEYS.detail(id), data)

      return { previousCountries, previousquotation }
    },
    onSuccess: () => {
      router.push(routes.crm.quotation)
      toast.success(t("form-quotation-updated-successfully"))
    },
    onError: (err, variables, context) => {
      toast.error(t("form-failed-to-update-quotation"))
      if (context?.previousCountries) {
        const queryKey = [
          QUOTATION_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousCountries)
      }
      if (context?.previousquotation) {
        queryClient.setQueryData(
          QUOTATION_KEYS.detail(variables.id),
          context.previousquotation
        )
      }
    },
    onSettled: (data: any) => {
      queryClient.invalidateQueries({
        queryKey: [QUOTATION_KEYS.all],
        exact: false,
      })
      if (data?.id) {
        queryClient.invalidateQueries({
          queryKey: QUOTATION_KEYS.detail(data.id),
        })
      }
    },
  })
}

export function useDeleteQuotation() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (id: any) => quotation.delete(id),
    onMutate: async (id) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [QUOTATION_KEYS.all],
        exact: false,
      })

      const queryKey = [
        QUOTATION_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      // Snapshot the previous value
      const previousCountries =
        queryClient.getQueryData<QuotationPaginator>(queryKey)

      // Optimistically remove the COA from the list
      queryClient.setQueryData<QuotationPaginator>(queryKey, (old) => {
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
      toast.success(t("form-quotation-deleted-successfully"))
    },

    onError: (err, variables, context) => {
      toast.error(t("form-failed-to-delete-quotation"))
      if (context?.previousCountries) {
        const queryKey = [
          QUOTATION_KEYS.all,
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
        queryKey: [QUOTATION_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useBulkDeleteQuotation() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    // Change mutationFn to accept an array of IDs
    mutationFn: (ids: number[]) => quotation.bulkDelete(ids),
    onMutate: async (ids) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [QUOTATION_KEYS.all],
        exact: false,
      })

      const queryKey = [
        QUOTATION_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      // Snapshot the previous value
      const previousItems = queryClient.getQueryData<QuotationPaginator>(queryKey)

      // Optimistically remove multiple items from the list
      queryClient.setQueryData<QuotationPaginator>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => !ids.includes(item.id!)),
          count: old.count - ids.length,
        }
      })

      return { previousItems }
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
      if (context?.previousItems) {
        const queryKey = [
          QUOTATION_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousItems)
      }
      if(err.response.data.details){
        toast.error(err.response.data.details)
      }else{
        toast.error(t("form-error-bulk-delete"))
      }
    },

    onSettled: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [QUOTATION_KEYS.all],
        exact: false,
      })
    },
  })
}
