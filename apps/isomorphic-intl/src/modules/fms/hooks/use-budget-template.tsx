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
import { budgetTemplate } from "@/modules/fms/service/budget-template.service"
import {
  BudgetTemplateList,
  BudgetTemplatePaginator,
  BudgetTemplateQueryOptions,
} from "@/modules/fms/types"
import { createQueryKeys, DEFAULT_QUERY_OPTIONS } from "@/server/service/query-config"

const BUDGET_TEMPLATE_KEYS = createQueryKeys("budget-template")

export function useBudgetTemplateList(
  options?: Partial<BudgetTemplateQueryOptions>
) {
  const queryKey = [BUDGET_TEMPLATE_KEYS.all, options]

  return useQuery<BudgetTemplatePaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return budgetTemplate.all(Object.assign({}, queryKey[1], pageParam))
    },
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}

export function useBudgetTemplateById(id: number) {
  return useQuery({
    queryKey: BUDGET_TEMPLATE_KEYS.detail(id),
    queryFn: () => budgetTemplate.get(id),
    enabled: !!id,
  })
}

export function useCreateBudgetTemplate() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: BudgetTemplateList): Promise<BudgetTemplateList> =>
      budgetTemplate.create(data),
    onMutate: async (newTemplate) => {
      await queryClient.cancelQueries({
        queryKey: [BUDGET_TEMPLATE_KEYS.all],
        exact: false,
      })

      const queryKey = [
        BUDGET_TEMPLATE_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousTemplates =
        queryClient.getQueryData<BudgetTemplatePaginator>(queryKey)

      queryClient.setQueryData<BudgetTemplatePaginator>(queryKey, (old) => {
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
    onSuccess: async (response) => {
      toast.success(
        <Text as="b">{t("form-budget-distribution-successfully-created")}</Text>
      )
      router.push(`${routes.fms.budgetDistribution}`)
    },
    onError: (err, newTemplate, context) => {
      if (context?.previousTemplates) {
        const queryKey = [
          BUDGET_TEMPLATE_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousTemplates)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [BUDGET_TEMPLATE_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useUpdateBudgetTemplate() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")
  const params = useParams()
  const budgetTemplateId = params.budgetTemplateId ?? ""

  return useMutation({
    mutationFn: (data: BudgetTemplateList) =>
      budgetTemplate.update(data),
    onMutate: async (data) => {
      await queryClient.cancelQueries({
        queryKey: [BUDGET_TEMPLATE_KEYS.all],
        exact: false,
      })

      // Only cancel queries if id exists
      if (data.id) {
        await queryClient.cancelQueries({
          queryKey: BUDGET_TEMPLATE_KEYS.detail(data.id),
        })
      }

      const queryKey = [
        BUDGET_TEMPLATE_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousBudgetTemplates =
        queryClient.getQueryData<BudgetTemplatePaginator>(queryKey)

      // Only get previous country data if id exists
      const previousBudgetTemplate = data.id
        ? queryClient.getQueryData<BudgetTemplateList>(
          BUDGET_TEMPLATE_KEYS.detail(data.id)
        )
        : undefined

      queryClient.setQueryData<BudgetTemplatePaginator>(queryKey, (old) => {
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
        queryClient.setQueryData(
          BUDGET_TEMPLATE_KEYS.detail(data.id),
          data
        )
      }

      return { previousBudgetTemplates, previousBudgetTemplate }
    },
    onSuccess: async () => {
      toast.success(
        <Text as="b">{t("form-budget-distribution-successfully-updated")}</Text>
      )
      router.push(`${routes.fms.budgetDistribution}/${budgetTemplateId}`)
    },
    onError: (err, variables, context) => {
      toast.error(
        <Text as="b">{t("form-budget-distribution-failed-to-update")}</Text>
      )
      if (context?.previousBudgetTemplates) {
        const queryKey = [
          BUDGET_TEMPLATE_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousBudgetTemplates)
      }
      if (context?.previousBudgetTemplate && variables.id) {
        queryClient.setQueryData(
          BUDGET_TEMPLATE_KEYS.detail(variables.id),
          context.previousBudgetTemplate
        )
      }
    },
    onSettled: (data) => {
      queryClient.invalidateQueries({
        queryKey: [BUDGET_TEMPLATE_KEYS.all],
        exact: false,
      })
      if (data?.id) {
        queryClient.invalidateQueries({
          queryKey: BUDGET_TEMPLATE_KEYS.detail(data.id),
        })
      }
    },
  })
}

export function useDeleteBudgetTemplate() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (id: number) => budgetTemplate.delete(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({
        queryKey: [BUDGET_TEMPLATE_KEYS.all],
        exact: false,
      })

      const queryKey = [
        BUDGET_TEMPLATE_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      // Snapshot the previous value
      const previousBudgets =
        queryClient.getQueryData<BudgetTemplatePaginator>(queryKey)

      // Optimistically remove the Budget from the list
      queryClient.setQueryData<BudgetTemplatePaginator>(queryKey, (old) => {
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
      toast.success(
        <Text as="b">{t("form-budget-distribution-successfully-deleted")}</Text>
      )
    },

    onError: (err, variables, context) => {
      // @ts-ignore
      const errorMessage = err?.response?.data?.message;
      if (errorMessage?.includes('REFERENCE constraint')) {
        toast.error(
          <Text as="b">
            {t("form-budget-distribution-cannot-delete-referenced")}
          </Text>
        );
      } else {
        toast.error(
          <Text as="b">
            {errorMessage}
          </Text>
        );
      }
      if (context?.previousBudgets) {
        const queryKey = [
          BUDGET_TEMPLATE_KEYS.all,
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
        queryKey: [BUDGET_TEMPLATE_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useBulkDeleteBudgetTemplate() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (ids: number[]) => budgetTemplate.bulk(ids),
    onMutate: async (ids) => {
      await queryClient.cancelQueries({
        queryKey: [BUDGET_TEMPLATE_KEYS.all],
        exact: false,
      })

      const queryKey = [
        BUDGET_TEMPLATE_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousBudgetTemplates =
        queryClient.getQueryData<BudgetTemplatePaginator>(queryKey)
      queryClient.setQueryData<BudgetTemplatePaginator>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => !ids.includes(item.id as number)),
          count: old.count - ids.length,
        }
      })

      return { previousBudgetTemplates }
    },
    onSuccess: () => {
      toast.success(
        <Text as="b">{t("form-budget-distribution-deleted-successfully")}</Text>
      )
    },
    onError: (err, variables, context) => {
      // @ts-ignore
      const errorMessage = err?.response?.data?.message;
      if (errorMessage?.includes('REFERENCE constraint')) {
        toast.error(
          <Text as="b">
            {t("form-budget-distribution-cannot-delete-referenced")}
          </Text>
        );
      } else {
        toast.error(
          <Text as="b">
            {t("form-budget-distribution-failed-to-delete")}
          </Text>
        );
      }
      if (context?.previousBudgetTemplates) {
        const queryKey = [
          BUDGET_TEMPLATE_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousBudgetTemplates)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [BUDGET_TEMPLATE_KEYS.all],
        exact: false,
      })
    },
  })
}
