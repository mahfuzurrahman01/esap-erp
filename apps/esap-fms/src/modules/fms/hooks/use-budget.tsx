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
import {
  BudgetList,
  BudgetPaginator,
  BudgetQueryOptions,
} from "@/modules/fms/types"
import { createQueryKeys } from "@/server/service/query-config"

import { BudgetService } from "../service/budget.service"

const BUDGET_KEYS = createQueryKeys("budget")

export function useBudgetList(options?: Partial<BudgetQueryOptions>) {
  const queryKey = [BUDGET_KEYS.all, options]

  return useQuery<BudgetPaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return BudgetService.all(Object.assign({}, queryKey[1], pageParam))
    },
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}

export function useBudgetById(id: number) {
  return useQuery<BudgetList, Error>({
    queryKey: BUDGET_KEYS.detail(id),
    queryFn: () => BudgetService.get(id),
    enabled: !!id,
  })
}

export function useCreateBudget() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: BudgetList): Promise<BudgetList> =>
      BudgetService.create(data),
    onMutate: async (newBudget) => {
      await queryClient.cancelQueries({
        queryKey: [BUDGET_KEYS.all],
        exact: false,
      })

      const queryKey = [
        BUDGET_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousBudgets =
        queryClient.getQueryData<BudgetPaginator>(queryKey)

      queryClient.setQueryData<BudgetPaginator>(queryKey, (old) => {
        if (!old)
          return {
            data: [newBudget],
            count: 1,
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          }
        return {
          ...old,
          data: [...old.data, { ...newBudget, id: Date.now() }],
          count: old.count + 1,
        }
      })

      return { previousBudgets }
    },
    onSuccess: async (response) => {
      toast.success(<Text as="b">{t("form-budget-successfully-created")}</Text>)
      router.push(`${routes.fms.budget}`)
    },
    onError: (err, newBudget, context) => {
      toast.error(<Text as="b">{t("form-budget-failed-to-create")}</Text>)
      if (context?.previousBudgets) {
        const queryKey = [
          BUDGET_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousBudgets)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [BUDGET_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useUpdateBudget() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const params = useParams()
  const budgetId = params.budgetId ?? ""
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: BudgetList) => BudgetService.update(data),
    onMutate: async (data) => {
      await queryClient.cancelQueries({
        queryKey: [BUDGET_KEYS.all],
        exact: false,
      })

      // Only cancel queries if id exists
      if (data.id) {
        await queryClient.cancelQueries({
          queryKey: BUDGET_KEYS.detail(data.id),
        })
      }

      const queryKey = [
        BUDGET_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousBudgets =
        queryClient.getQueryData<BudgetPaginator>(queryKey)

      // Only get previous country data if id exists
      const previousBudget = data.id
        ? queryClient.getQueryData<BudgetList>(BUDGET_KEYS.detail(data.id))
        : undefined

      queryClient.setQueryData<BudgetPaginator>(queryKey, (old) => {
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
        queryClient.setQueryData(BUDGET_KEYS.detail(data.id), data)
      }

      return { previousBudgets, previousBudget }
    },
    onSuccess: async () => {
      toast.success(
        <Text as="b">{t("form-budget-successfully-updated")}</Text>
      )
      router.refresh()
      router.push(`${routes.fms.budget}/${budgetId}`)
    },
    onError: (err, variables, context) => {
      if (context?.previousBudgets) {
        const queryKey = [
          BUDGET_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousBudgets)
      }
      if (context?.previousBudget && variables.id) {
        queryClient.setQueryData(
          BUDGET_KEYS.detail(variables.id),
          context.previousBudget
        )
      }
    },
    onSettled: (data) => {
      queryClient.invalidateQueries({
        queryKey: [BUDGET_KEYS.all],
        exact: false,
      })
      if (data?.id) {
        queryClient.invalidateQueries({
          queryKey: BUDGET_KEYS.detail(data.id),
        })
      }
    },
  })
}

export function useDeleteBudget() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (id: number) => BudgetService.delete(id),
    onMutate: async (id) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [BUDGET_KEYS.all],
        exact: false,
      })

      const queryKey = [
        BUDGET_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      // Snapshot the previous value
      const previousBudgets =
        queryClient.getQueryData<BudgetPaginator>(queryKey)

      // Optimistically remove the Budget from the list
      queryClient.setQueryData<BudgetPaginator>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => item.id !== id),
          count: old.count - 1,
        }
      })

      return { previousBudgets }
    },

    onSuccess: () => {
      toast.success(<Text as="b">{t("form-budget-successfully-deleted")}</Text>)
    },

    onError: (err, variables, context) => {
      toast.error(<Text as="b">{err.message}</Text>)
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousBudgets) {
        const queryKey = [
          BUDGET_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousBudgets)
      }
    },

    onSettled: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [BUDGET_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useBulkDeleteBudget() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (ids: number[]) => BudgetService.bulk(ids),
    onMutate: async (ids) => {
      await queryClient.cancelQueries({
        queryKey: [BUDGET_KEYS.all],
        exact: false,
      })

      const queryKey = [
        BUDGET_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousBudgets =
        queryClient.getQueryData<BudgetPaginator>(queryKey)
      queryClient.setQueryData<BudgetPaginator>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => !ids.includes(item.id as number)),
          count: old.count - ids.length,
        }
      })

      return { previousBudgets }
    },
    onSuccess: () => {
      toast.success(
        <Text as="b">{t("form-budget-deleted-successfully")}</Text>
      )
    },
    onError: (err, variables, context) => {
      toast.error(
        <Text as="b">{t("form-budget-failed-to-delete")}</Text>
      )
      if (context?.previousBudgets) {
        const queryKey = [
          BUDGET_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousBudgets)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [BUDGET_KEYS.all],
        exact: false,
      })
    },
  })
}
