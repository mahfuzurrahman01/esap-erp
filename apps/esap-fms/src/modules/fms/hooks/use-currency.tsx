"use client"

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
import { CurrencyService } from "@/modules/fms/service/currency.service"
import {
  CurrencyList,
  CurrencyPaginator,
  CurrencyQueryOptions,
} from "@/modules/fms/types"
import {
  DEFAULT_QUERY_OPTIONS,
  createQueryKeys,
} from "@/server/service/query-config"

const CURRENCY_KEYS = createQueryKeys("currency")

export function useCurrencyList(options?: Partial<CurrencyQueryOptions>) {
  const queryKey = [CURRENCY_KEYS.all, options]

  return useQuery<CurrencyPaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return CurrencyService.all(Object.assign({}, queryKey[1], pageParam))
    },
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}

export function useCurrencyById(id: number) {
  return useQuery({
    queryKey: CURRENCY_KEYS.detail(id),
    queryFn: () => CurrencyService.get(id),
    enabled: !!id,
    ...DEFAULT_QUERY_OPTIONS,
  })
}

export function useCreateCurrency() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: CurrencyList): Promise<CurrencyList> =>
      CurrencyService.create(data),
    onMutate: async (newCurrency) => {
      await queryClient.cancelQueries({
        queryKey: [CURRENCY_KEYS.all],
        exact: false,
      })

      const queryKey = [
        CURRENCY_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousCurrencies =
        queryClient.getQueryData<CurrencyPaginator>(queryKey)

      queryClient.setQueryData<CurrencyPaginator>(queryKey, (old) => {
        if (!old)
          return {
            data: [newCurrency],
            count: 1,
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          }
        return {
          ...old,
          data: [...old.data, { ...newCurrency, id: Date.now() }],
          count: old.count + 1,
        }
      })

      return { previousCurrencies }
    },
    onSuccess: () => {
      toast.success(
        <Text as="b">{t("form-currency-successfully-created")}</Text>
      )
    },
    onError: (err, newCurrency, context) => {
      if (context?.previousCurrencies) {
        const queryKey = [
          CURRENCY_KEYS.all,
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
        queryKey: [CURRENCY_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useUpdateCurrency() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: CurrencyList) =>
      CurrencyService.update(data),
    onMutate: async (data) => {
      await queryClient.cancelQueries({
        queryKey: [CURRENCY_KEYS.all],
        exact: false,
      })

      // Only cancel queries if id exists
      if (data.id) {
        await queryClient.cancelQueries({
          queryKey: CURRENCY_KEYS.detail(data.id),
        })
      }

      const queryKey = [
        CURRENCY_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousCurrencies =
        queryClient.getQueryData<CurrencyPaginator>(queryKey)
      const previousCurrency = data.id
        ? queryClient.getQueryData<CurrencyList>(
          CURRENCY_KEYS.detail(data.id)
        )
        : undefined

      queryClient.setQueryData<CurrencyPaginator>(queryKey, (old) => {
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
        queryClient.setQueryData(CURRENCY_KEYS.detail(data.id), data)
      }

      return { previousCurrencies, previousCurrency }
    },
    onSuccess: () => {
      toast.success(
        <Text as="b">{t("form-currency-successfully-updated")}</Text>
      )
    },
    onError: (err, variables, context) => {
      if (context?.previousCurrencies) {
        const queryKey = [
          CURRENCY_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousCurrencies)
      }
      if (context?.previousCurrency && variables.id) {
        queryClient.setQueryData(
          CURRENCY_KEYS.detail(variables.id),
          context.previousCurrency
        )
      }
    },
    onSettled: (data) => {
      queryClient.invalidateQueries({
        queryKey: [CURRENCY_KEYS.all],
        exact: false,
      })
      if (data?.id) {
        queryClient.invalidateQueries({
          queryKey: CURRENCY_KEYS.detail(data.id),
        })
      }
    },
  })
}

export function useDeleteCurrency() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (id: number) => CurrencyService.delete(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({
        queryKey: [CURRENCY_KEYS.all],
        exact: false,
      })

      const queryKey = [
        CURRENCY_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      // Snapshot the previous value
      const previousCurrencies =
        queryClient.getQueryData<CurrencyPaginator>(queryKey)

      // Optimistically remove the COA from the list
      queryClient.setQueryData<CurrencyPaginator>(queryKey, (old) => {
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
        <Text as="b">{t("form-currency-successfully-deleted")}</Text>
      )
    },

    onError: (err, variables, context) => {
      toast.error(
        <Text as="b">{t("form-currency-failed-to-delete")}</Text>
      )

      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousCurrencies) {
        const queryKey = [
          CURRENCY_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousCurrencies)
      }
    },

    onSettled: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [CURRENCY_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useBulkDeleteCurrency() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (ids: number[]) => CurrencyService.bulk(ids),
    onMutate: async (ids) => {
      await queryClient.cancelQueries({
        queryKey: [CURRENCY_KEYS.all],
        exact: false,
      })

      const queryKey = [
        CURRENCY_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousCurrencies =
        queryClient.getQueryData<CurrencyPaginator>(queryKey)
      queryClient.setQueryData<CurrencyPaginator>(queryKey, (old) => {
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
        <Text as="b">{t("form-currency-deleted-successfully")}</Text>
      )
    },
    onError: (err, variables, context) => {
      console.log(err.cause)
      toast.error(
        <Text as="b">{t("form-currency-failed-to-delete")}</Text>
      )
      if (context?.previousCurrencies) {
        const queryKey = [
          CURRENCY_KEYS.all,
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
        queryKey: [CURRENCY_KEYS.all],
        exact: false,
      })
    },
  })
}
