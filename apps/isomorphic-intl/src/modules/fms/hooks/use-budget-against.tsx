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
import { useRouter } from "next/navigation"

const BUDGET_AGAINST_KEYS = createQueryKeys("budget-against")

export function useBudgetAgainstList(
  options?: Partial<BudgetAgainstQueryOptions>
) {
  const queryKey = [BUDGET_AGAINST_KEYS.all, options]

  return useQuery<BudgetAgainstPaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return BudgetAgainstService.all(Object.assign({}, queryKey[1], pageParam))
    },
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}

export function useBudgetAgainstById(id: number) {
  return useQuery<BudgetAgainstList, Error>({
    queryKey: BUDGET_AGAINST_KEYS.detail(id),
    queryFn: () => BudgetAgainstService.get(id),
    enabled: !!id,
  })
}

export function useCreateBudgetAgainst() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: BudgetAgainstList): Promise<BudgetAgainstList> =>
      BudgetAgainstService.create(data),
    onMutate: async (newBudgetAgainst) => {
      await queryClient.cancelQueries({
        queryKey: [BUDGET_AGAINST_KEYS.all],
        exact: false,
      })

      const queryKey = [
        BUDGET_AGAINST_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousBudgetAgainsts =
        queryClient.getQueryData<BudgetAgainstPaginator>(queryKey)

      queryClient.setQueryData<BudgetAgainstPaginator>(queryKey, (old) => {
        if (!old)
          return {
            data: [newBudgetAgainst],
            count: 1,
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          }
        return {
          ...old,
          data: [...old.data, { ...newBudgetAgainst, id: Date.now() }],
          count: old.count + 1,
        }
      })

      return { previousBudgetAgainsts }
    },
    onSuccess: async () => {
      toast.success(<Text as="b">{t("form-budget-against-created")}</Text>)
    },
    onError: (err, newBudgetAgainst, context) => {
      toast.error(<Text as="b">{t("form-budget-against-failed-to-create")}</Text>)

      if (context?.previousBudgetAgainsts) {
        const queryKey = [
          BUDGET_AGAINST_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousBudgetAgainsts)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [BUDGET_AGAINST_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useUpdateBudgetAgainst() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: BudgetAgainstList) =>
      BudgetAgainstService.update(data),
    onMutate: async (data) => {
      await queryClient.cancelQueries({
        queryKey: [BUDGET_AGAINST_KEYS.all],
        exact: false,
      })

      // Only cancel queries if id exists
      if (data.id) {
        await queryClient.cancelQueries({
          queryKey: BUDGET_AGAINST_KEYS.detail(data.id),
        })
      }

      const queryKey = [
        BUDGET_AGAINST_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousBudgetAgainsts =
        queryClient.getQueryData<BudgetAgainstPaginator>(queryKey)

      // Only get previous country data if id exists
      const previousBudgetAgainst = data.id
        ? queryClient.getQueryData<BudgetAgainstList>(
          BUDGET_AGAINST_KEYS.detail(data.id)
        )
        : undefined

      queryClient.setQueryData<BudgetAgainstPaginator>(queryKey, (old) => {
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
        queryClient.setQueryData(BUDGET_AGAINST_KEYS.detail(data.id), data)
      }

      return { previousBudgetAgainsts, previousBudgetAgainst }
    },
    onSuccess: async () => {
      toast.success(
        <Text as="b">{t("form-budget-against-successfully-updated")}</Text>
      )
      router.refresh()
    },
    onError: (err, variables, context) => {
      if (context?.previousBudgetAgainsts) {
        const queryKey = [
          BUDGET_AGAINST_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousBudgetAgainsts)
      }
      if (context?.previousBudgetAgainst && variables.id) {
        queryClient.setQueryData(
          BUDGET_AGAINST_KEYS.detail(variables.id),
          context.previousBudgetAgainst
        )
      }
    },
    onSettled: (data) => {
      queryClient.invalidateQueries({
        queryKey: [BUDGET_AGAINST_KEYS.all],
        exact: false,
      })
      if (data?.id) {
        queryClient.invalidateQueries({
          queryKey: BUDGET_AGAINST_KEYS.detail(data.id),
        })
      }
    },
  })
}

export function useDeleteBudgetAgainst() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (id: number) => BudgetAgainstService.delete(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({
        queryKey: [BUDGET_AGAINST_KEYS.all],
        exact: false,
      })

      const queryKey = [
        BUDGET_AGAINST_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      // Snapshot the previous value
      const previousBudgetAgainsts =
        queryClient.getQueryData<BudgetAgainstPaginator>(queryKey)

      // Optimistically remove the COA from the list
      queryClient.setQueryData<BudgetAgainstPaginator>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => item.id !== id),
          count: old.count - 1,
        }
      })

      return { previousBudgetAgainsts }
    },

    onSuccess: () => {
      toast.success(
        <Text as="b">{t("form-budget-against-successfully-deleted")}</Text>
      )
    },

    onError: (err, variables, context) => {
      // @ts-ignore
      const errorMessage = err?.response?.data?.message;
      if (errorMessage?.includes('REFERENCE constraint')) {
        toast.error(
          <Text as="b">
            {t("form-budget-against-cannot-delete-referenced")}
          </Text>
        );
      } else {
        toast.error(
          <Text as="b">
            {errorMessage}
          </Text>
        );
      }
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousBudgetAgainsts) {
        const queryKey = [
          BUDGET_AGAINST_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousBudgetAgainsts)
      }
    },

    onSettled: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [BUDGET_AGAINST_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useBulkDeleteBudgetAgainst() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (ids: number[]) => BudgetAgainstService.bulk(ids),
    onMutate: async (ids) => {
      await queryClient.cancelQueries({
        queryKey: [BUDGET_AGAINST_KEYS.all],
        exact: false,
      })

      const queryKey = [
        BUDGET_AGAINST_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousBudgetAgainst =
        queryClient.getQueryData<BudgetAgainstPaginator>(queryKey)
      queryClient.setQueryData<BudgetAgainstPaginator>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => !ids.includes(item.id as number)),
          count: old.count - ids.length,
        }
      })

      return { previousBudgetAgainst }
    },
    onSuccess: () => {
      toast.success(
        <Text as="b">{t("form-budget-against-deleted-successfully")}</Text>
      )
    },
    onError: (err, variables, context) => {
      // @ts-ignore
      const errorMessage = err?.response?.data?.message;
      if (errorMessage?.includes('REFERENCE constraint')) {
        toast.error(
          <Text as="b">
            {t("form-budget-against-cannot-delete-referenced")}
          </Text>
        );
      } else {
        toast.error(
          <Text as="b">
            {t("form-budget-against-failed-to-delete")}
          </Text>
        );
      }
      if (context?.previousBudgetAgainst) {
        const queryKey = [
          BUDGET_AGAINST_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousBudgetAgainst)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [BUDGET_AGAINST_KEYS.all],
        exact: false,
      })
    },
  })
}
