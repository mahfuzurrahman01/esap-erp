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
import { Text } from "rizzui"

import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "@/config/constants"
import { CountryService } from "@/modules/fms/service/country.service"
import {
  CountryList,
  CountryPaginator,
  CountryQueryOptions,
} from "@/modules/fms/types"
import { createQueryKeys } from "@/server/service/query-config"

export const COUNTRY_KEYS = createQueryKeys("country")

export function useCountryList(options?: Partial<CountryQueryOptions>) {
  const queryKey = [COUNTRY_KEYS.all, options]

  return useQuery<CountryPaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return CountryService.all(Object.assign({}, queryKey[1], pageParam))
    },
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}

export function useCountryById(id: number) {
  return useQuery<CountryList, Error>({
    queryKey: COUNTRY_KEYS.detail(id),
    queryFn: () => CountryService.get(id),
    enabled: !!id,
  })
}

export function useCreateCountry() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: CountryList): Promise<CountryList> =>
      CountryService.create(data),
    onMutate: async (newCountry) => {
      await queryClient.cancelQueries({
        queryKey: [COUNTRY_KEYS.all],
        exact: false,
      })

      const queryKey = [
        COUNTRY_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousCountries =
        queryClient.getQueryData<CountryPaginator>(queryKey)

      queryClient.setQueryData<CountryPaginator>(queryKey, (old) => {
        if (!old)
          return {
            data: [newCountry],
            count: 1,
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          }
        return {
          ...old,
          data: [...old.data, { ...newCountry, id: Date.now() }],
          count: old.count + 1,
        }
      })

      return { previousCountries }
    },
    onSuccess: () => {
      toast.success(
        <Text as="b">{t("form-country-successfully-created")}</Text>
      )
      router.refresh()
    },
    onError: (err, newCountry, context) => {
      if (context?.previousCountries) {
        const queryKey = [
          COUNTRY_KEYS.all,
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
        queryKey: [COUNTRY_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useUpdateCountry() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: CountryList) => CountryService.update(data),
    onMutate: async (data) => {
      await queryClient.cancelQueries({
        queryKey: [COUNTRY_KEYS.all],
        exact: false,
      })

      // Only cancel queries if id exists
      if (data.id) {
        await queryClient.cancelQueries({
          queryKey: COUNTRY_KEYS.detail(data.id),
        })
      }

      const queryKey = [
        COUNTRY_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousCountries =
        queryClient.getQueryData<CountryPaginator>(queryKey)

      // Only get previous country data if id exists
      const previousCountry = data.id
        ? queryClient.getQueryData<CountryList>(COUNTRY_KEYS.detail(data.id))
        : undefined

      queryClient.setQueryData<CountryPaginator>(queryKey, (old) => {
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
        queryClient.setQueryData(COUNTRY_KEYS.detail(data.id), data)
      }

      return { previousCountries, previousCountry }
    },
    onSuccess: () => {
      toast.success(
        <Text as="b">{t("form-country-successfully-updated")}</Text>
      )
      router.refresh()
    },
    onError: (err, variables, context) => {
      if (context?.previousCountries) {
        const queryKey = [
          COUNTRY_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousCountries)
      }
      if (context?.previousCountry && variables.id) {
        queryClient.setQueryData(
          COUNTRY_KEYS.detail(variables.id),
          context.previousCountry
        )
      }
    },
    onSettled: (data) => {
      queryClient.invalidateQueries({
        queryKey: [COUNTRY_KEYS.all],
        exact: false,
      })
      if (data?.id) {
        queryClient.invalidateQueries({
          queryKey: COUNTRY_KEYS.detail(data.id),
        })
      }
    },
  })
}

export function useDeleteCountry() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (id: number) => CountryService.delete(id),
    onMutate: async (id) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [COUNTRY_KEYS.all],
        exact: false,
      })

      const queryKey = [
        COUNTRY_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      // Snapshot the previous value
      const previousCountries =
        queryClient.getQueryData<CountryPaginator>(queryKey)

      // Optimistically remove the COA from the list
      queryClient.setQueryData<CountryPaginator>(queryKey, (old) => {
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
      toast.success(
        <Text as="b">{t("form-country-successfully-deleted")}</Text>
      )
    },

    onError: (err, variables, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      // @ts-ignore
      toast.error(<Text as="b">{err.response?.data.message}</Text>)
      if (context?.previousCountries) {
        const queryKey = [
          COUNTRY_KEYS.all,
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
        queryKey: [COUNTRY_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useBulkDeleteCountry() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (ids: number[]) => CountryService.bulkDelete(ids),
    onMutate: async (ids) => {
      await queryClient.cancelQueries({
        queryKey: [COUNTRY_KEYS.all],
        exact: false,
      })

      const queryKey = [
        COUNTRY_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousCountries =
        queryClient.getQueryData<CountryPaginator>(queryKey)

      // Optimistically remove the bank transactions from the list
      queryClient.setQueryData<CountryPaginator>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => !ids.includes(item.id as number)),
          count: old.count - ids.length,
        }
      })

      return { previousCountries }
    },
    onSuccess: () => {
      toast.success(
        <Text as="b">{t("form-country-deleted-successfully")}</Text>
      )
    },
    onError: (err, variables, context) => {
      // @ts-ignore
      toast.error(<Text as="b">{err.response?.data.message}</Text>)
      if (context?.previousCountries) {
        const queryKey = [
          COUNTRY_KEYS.all,
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
        queryKey: [COUNTRY_KEYS.all],
        exact: false,
      })
    },
  })
}
