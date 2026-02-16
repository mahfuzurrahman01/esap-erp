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
import { createQueryKeys } from "@/server/service/query-config"

import { CurrencyExchangeService } from "../service/currency-exchange.service"
import {
  CurrencyExchangeList,
  CurrencyExchangePaginator,
  CurrencyExchangeQueryOptions,
} from "../types/currency-exchange"

const CURRENCY_EXCHANGE_KEYS = createQueryKeys("currency-exchange")

export function useCurrencyExchangeList(
  options?: Partial<CurrencyExchangeQueryOptions>
) {
  const queryKey = [CURRENCY_EXCHANGE_KEYS.all, options]

  return useQuery<CurrencyExchangePaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return CurrencyExchangeService.all(
        Object.assign({}, queryKey[1], pageParam)
      )
    },
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}

export function useCurrencyExchangeById(id: number) {
  return useQuery<CurrencyExchangeList, Error>({
    queryKey: CURRENCY_EXCHANGE_KEYS.detail(id),
    queryFn: () => CurrencyExchangeService.get(id),
    enabled: !!id,
  })
}

export function useCreateCurrencyExchange() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: CurrencyExchangeList): Promise<CurrencyExchangeList> =>
      CurrencyExchangeService.create(data),
    onMutate: async (newCurrencyExchange) => {
      await queryClient.cancelQueries({
        queryKey: [CURRENCY_EXCHANGE_KEYS.all],
        exact: false,
      })

      const queryKey = [
        CURRENCY_EXCHANGE_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousCurrencies =
        queryClient.getQueryData<CurrencyExchangePaginator>(queryKey)

      queryClient.setQueryData<CurrencyExchangePaginator>(queryKey, (old) => {
        if (!old)
          return {
            data: [newCurrencyExchange],
            count: 1,
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          }
        return {
          ...old,
          data: [...old.data, { ...newCurrencyExchange, id: Date.now() }],
          count: old.count + 1,
        }
      })

      return { previousCurrencies }
    },
    onSuccess: () => {
      toast.success(
        <Text as="b">{t("form-currency-exchange-successfully-created")}</Text>
      )
    },
    onError: (err, newCurrencyExchange, context) => {
      if (context?.previousCurrencies) {
        const queryKey = [
          CURRENCY_EXCHANGE_KEYS.all,
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
        queryKey: [CURRENCY_EXCHANGE_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useUpdateCurrencyExchange() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: CurrencyExchangeList }) =>
      CurrencyExchangeService.update(id, data),
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({
        queryKey: [CURRENCY_EXCHANGE_KEYS.all],
        exact: false,
      })
      await queryClient.cancelQueries({
        queryKey: CURRENCY_EXCHANGE_KEYS.detail(id),
      })

      const queryKey = [
        CURRENCY_EXCHANGE_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousCurrencies =
        queryClient.getQueryData<CurrencyExchangePaginator>(queryKey)
      const previousCurrencyExchange =
        queryClient.getQueryData<CurrencyExchangeList>(
          CURRENCY_EXCHANGE_KEYS.detail(id)
        )

      queryClient.setQueryData<CurrencyExchangePaginator>(queryKey, (old) => {
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
            item.id === id ? { ...item, ...data } : item
          ),
        }
      })

      queryClient.setQueryData(CURRENCY_EXCHANGE_KEYS.detail(id), data)

      return { previousCurrencies, previousCurrencyExchange }
    },
    onSuccess: () => {
      toast.success(
        <Text as="b">{t("form-currency-exchange-successfully-updated")}</Text>
      )
    },
    onError: (err, variables, context) => {
      if (context?.previousCurrencies) {
        const queryKey = [
          CURRENCY_EXCHANGE_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousCurrencies)
      }
      if (context?.previousCurrencyExchange) {
        queryClient.setQueryData(
          CURRENCY_EXCHANGE_KEYS.detail(variables.id),
          context.previousCurrencyExchange
        )
      }
    },
    onSettled: (data) => {
      queryClient.invalidateQueries({
        queryKey: [CURRENCY_EXCHANGE_KEYS.all],
        exact: false,
      })
      if (data?.id) {
        queryClient.invalidateQueries({
          queryKey: CURRENCY_EXCHANGE_KEYS.detail(data.id),
        })
      }
    },
  })
}

export function useDeleteCurrencyExchange() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (id: number) => CurrencyExchangeService.delete(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({
        queryKey: [CURRENCY_EXCHANGE_KEYS.all],
        exact: false,
      })

      const queryKey = [
        CURRENCY_EXCHANGE_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      // Snapshot the previous value
      const previousCurrencies =
        queryClient.getQueryData<CurrencyExchangePaginator>(queryKey)

      // Optimistically remove the COA from the list
      queryClient.setQueryData<CurrencyExchangePaginator>(queryKey, (old) => {
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
        <Text as="b">{t("form-currency-exchange-successfully-deleted")}</Text>
      )
    },

    onError: (err, variables, context) => {
      // @ts-ignore
      const errorMessage = err?.response?.data?.message;
      if (errorMessage?.includes('referenced')) {
        toast.error(
          <Text as="b">
            {t("form-currency-exchange-cannot-delete-referenced")}
          </Text>
        );
      } else {
        toast.error(
          <Text as="b">
            {t("form-currency-exchange-failed-to-delete")}
          </Text>
        );
      }
      if (context?.previousCurrencies) {
        const queryKey = [
          CURRENCY_EXCHANGE_KEYS.all,
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
        queryKey: [CURRENCY_EXCHANGE_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useBulkDeleteCurrencyExchange() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (ids: number[]) => CurrencyExchangeService.bulk(ids),
    onMutate: async (ids) => {
      await queryClient.cancelQueries({
        queryKey: [CURRENCY_EXCHANGE_KEYS.all],
        exact: false,
      })

      const queryKey = [
        CURRENCY_EXCHANGE_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousCurrencyExchanges =
        queryClient.getQueryData<CurrencyExchangePaginator>(queryKey)
      queryClient.setQueryData<CurrencyExchangePaginator>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => !ids.includes(item.id as number)),
          count: old.count - ids.length,
        }
      })

      return { previousCurrencyExchanges }
    },
    onSuccess: () => {
      toast.success(
        <Text as="b">{t("form-currency-exchange-deleted-successfully")}</Text>
      )
    },
    onError: (err, variables, context) => {
      // @ts-ignore
      const errorMessage = err?.response?.data?.message;
      if (errorMessage?.includes('REFERENCE constraint')) {
        toast.error(
          <Text as="b">
            {t("form-currency-exchange-cannot-delete-referenced")}
          </Text>
        );
      } else {
        toast.error(
          <Text as="b">
            {t("form-currency-exchange-failed-to-delete")}
          </Text>
        );
      }
      if (context?.previousCurrencyExchanges) {
        const queryKey = [
          CURRENCY_EXCHANGE_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousCurrencyExchanges)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [CURRENCY_EXCHANGE_KEYS.all],
        exact: false,
      })
    },
  })
}
