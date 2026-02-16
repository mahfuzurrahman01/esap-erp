"use client"

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
import { createQueryKeys } from "@/server/service/query-config"

import { BudgetAgainstService } from "../service/budget-against.service"
import {
  BudgetAgainstList,
  BudgetAgainstPaginator,
  BudgetAgainstQueryOptions,
} from "../types/budget-against"
import { FiscalYearList, FiscalYearPaginator, FiscalYearQueryOptions } from "../types/fiscal-year"
import { FiscalYearService } from "../service/fiscal-year.service"

const FISCAL_YEAR_KEYS = createQueryKeys("fiscal-year")

export function useFiscalYearList(
  options?: Partial<FiscalYearQueryOptions>
) {
  const queryKey = [FISCAL_YEAR_KEYS.all, options]

  return useQuery<FiscalYearPaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return FiscalYearService.all(Object.assign({}, queryKey[1], pageParam))
    },
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}

export function useFiscalYearById(id: number) {
  return useQuery<FiscalYearList, Error>({
    queryKey: FISCAL_YEAR_KEYS.detail(id),
    queryFn: () => FiscalYearService.get(id),
    enabled: !!id,
  })
}

export function useCreateFiscalYear() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: FiscalYearList): Promise<FiscalYearList> =>
      FiscalYearService.create(data),
    onMutate: async (newFiscalYear) => {
      await queryClient.cancelQueries({
        queryKey: [FISCAL_YEAR_KEYS.all],
        exact: false,
      })

      const queryKey = [
        FISCAL_YEAR_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousFiscalYears =
        queryClient.getQueryData<FiscalYearPaginator>(queryKey)

      queryClient.setQueryData<FiscalYearPaginator>(queryKey, (old) => {
        if (!old)
          return {
            data: [newFiscalYear],
            count: 1,
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          }
        return {
          ...old,
          data: [...old.data, { ...newFiscalYear, id: Date.now() }],
          count: old.count + 1,
        }
      })

      return { previousFiscalYears }
    },
    onSuccess: async () => {
      toast.success(<Text as="b">{t("form-fiscal-year-created-successfully")}</Text>)
    },
    onError: (err, newFiscalYear, context) => {
      toast.error(<Text as="b">{t("form-fiscal-year-failed-to-create")}</Text>)
      if (context?.previousFiscalYears) {
        const queryKey = [
          FISCAL_YEAR_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousFiscalYears)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [FISCAL_YEAR_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useUpdateFiscalYear() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: FiscalYearList) => FiscalYearService.update(data),
    onMutate: async (data) => {
      if (!data.id) return

      await queryClient.cancelQueries({
        queryKey: [FISCAL_YEAR_KEYS.all],
        exact: false,
      })
      await queryClient.cancelQueries({
        queryKey: FISCAL_YEAR_KEYS.detail(data.id),
      })

      const queryKey = [
        FISCAL_YEAR_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousFiscalYears =
        queryClient.getQueryData<FiscalYearPaginator>(queryKey)
      const previousFiscalYear = queryClient.getQueryData<FiscalYearList>(
        FISCAL_YEAR_KEYS.detail(data.id)
      )

      queryClient.setQueryData<FiscalYearPaginator>(queryKey, (old) => {
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

      queryClient.setQueryData(FISCAL_YEAR_KEYS.detail(data.id), data)

      return { previousFiscalYears, previousFiscalYear }
    },
    onSuccess: async () => {
      toast.success(<Text as="b">{t("form-fiscal-year-updated-successfully")}</Text>)
    },
    onError: (err, variables, context) => {
      if (context?.previousFiscalYears) {
        const queryKey = [
          FISCAL_YEAR_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousFiscalYears)
      }
      if (context?.previousFiscalYear && variables.id) {
        queryClient.setQueryData(
          FISCAL_YEAR_KEYS.detail(variables.id),
          context.previousFiscalYear
        )
      }
    },
    onSettled: (data) => {
      queryClient.invalidateQueries({
        queryKey: [FISCAL_YEAR_KEYS.all],
        exact: false,
      })
      if (data?.id) {
        queryClient.invalidateQueries({
          queryKey: FISCAL_YEAR_KEYS.detail(data.id),
        })
      }
    },
  })
}

export function useDeleteFiscalYear() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (id: number) => FiscalYearService.delete(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({
        queryKey: [FISCAL_YEAR_KEYS.all],
        exact: false,
      })

      const queryKey = [
        FISCAL_YEAR_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      // Snapshot the previous value
      const previousFiscalYears =
        queryClient.getQueryData<FiscalYearPaginator>(queryKey)

      // Optimistically remove the COA from the list
      queryClient.setQueryData<FiscalYearPaginator>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => item.id !== id),
          count: old.count - 1,
        }
      })

      return { previousFiscalYears }
    },

    onSuccess: () => {
      toast.success(
        <Text as="b">{t("form-fiscal-year-successfully-deleted")}</Text>
      )
    },

    onError: (err, variables, context) => {
      // @ts-ignore
      const errorMessage = err?.response?.data?.message;
      if (errorMessage?.includes('REFERENCE constraint')) {
        toast.error(
          <Text as="b">
            {t("form-fiscal-year-cannot-delete-referenced")}
          </Text>
        );
      } else {
        toast.error(
          <Text as="b">
            {errorMessage}
          </Text>
        );
      }
      if (context?.previousFiscalYears) {
        const queryKey = [
          FISCAL_YEAR_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousFiscalYears)
      }
    },

    onSettled: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [FISCAL_YEAR_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useBulkDeleteFiscalYear() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (ids: number[]) => FiscalYearService.bulk(ids),
    onMutate: async (ids) => {
      await queryClient.cancelQueries({
        queryKey: [FISCAL_YEAR_KEYS.all],
        exact: false,
      })

      const queryKey = [
        FISCAL_YEAR_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousFiscalYears =
        queryClient.getQueryData<FiscalYearPaginator>(queryKey)
      queryClient.setQueryData<FiscalYearPaginator>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => !ids.includes(item.id as number)),
          count: old.count - ids.length,
        }
      })

      return { previousFiscalYears }
    },
    onSuccess: () => {
      toast.success(
        <Text as="b">{t("form-fiscal-year-deleted-successfully")}</Text>
      )
    },
    onError: (err, variables, context) => {
      // @ts-ignore
      const errorMessage = err?.response?.data?.message;
      if (errorMessage?.includes('REFERENCE constraint')) {
        toast.error(
          <Text as="b">
            {t("form-fiscal-year-cannot-delete-referenced")}
          </Text>
        );
      } else {
        toast.error(
          <Text as="b">
            {t("form-fiscal-year-failed-to-delete")}
          </Text>
        );
      }
      if (context?.previousFiscalYears) {
        const queryKey = [
          FISCAL_YEAR_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousFiscalYears)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [FISCAL_YEAR_KEYS.all],
        exact: false,
      })
    },
  })
}
