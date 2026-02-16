"use client"

import { useRouter } from "next/navigation"

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
import { createQueryKeys } from "@/server/service/query-config"

import { TaxRuleService } from "../service/tax-rule.service"
import {
  TaxRuleList,
  TaxRulePaginator,
  TaxRuleQueryOptions,
} from "../types/tax-rule"

const TAX_RULE_KEYS = createQueryKeys("tax-rule")

export function useTaxRuleList(options?: Partial<TaxRuleQueryOptions>) {
  const queryKey = [TAX_RULE_KEYS.all, options]

  return useQuery<TaxRulePaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return TaxRuleService.all(Object.assign({}, queryKey[1], pageParam))
    },
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}

export function useTaxRuleById(id: number) {
  return useQuery<TaxRuleList, Error>({
    queryKey: TAX_RULE_KEYS.detail(id),
    queryFn: () => TaxRuleService.get(id),
    enabled: !!id,
  })
}

export function useCreateTaxRule() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: TaxRuleList): Promise<TaxRuleList> =>
      TaxRuleService.create(data),
    onMutate: async (newTaxRule) => {
      await queryClient.cancelQueries({
        queryKey: [TAX_RULE_KEYS.all],
        exact: false,
      })

      const queryKey = [
        TAX_RULE_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousTaxRules =
        queryClient.getQueryData<TaxRulePaginator>(queryKey)

      queryClient.setQueryData<TaxRulePaginator>(queryKey, (old) => {
        if (!old)
          return {
            data: [newTaxRule],
            count: 1,
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          }
        return {
          ...old,
          data: [...old.data, { ...newTaxRule, id: Date.now() }],
          count: old.count + 1,
        }
      })

      return { previousTaxRules }
    },
    onSuccess: async () => {
      toast.success(
        <Text as="b">{t("form-tax-rule-successfully-created")}</Text>
      )
      router.push(routes.fms.taxRule)
    },
    onError: (err, newTaxRule, context) => {
      if (context?.previousTaxRules) {
        const queryKey = [
          TAX_RULE_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousTaxRules)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [TAX_RULE_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useUpdateTaxRule() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: TaxRuleList }) =>
      TaxRuleService.update(id, data),
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({
        queryKey: [TAX_RULE_KEYS.all],
        exact: false,
      })
      await queryClient.cancelQueries({
        queryKey: TAX_RULE_KEYS.detail(id),
      })

      const queryKey = [
        TAX_RULE_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousTaxRules =
        queryClient.getQueryData<TaxRulePaginator>(queryKey)
      const previousTaxRule = queryClient.getQueryData<TaxRuleList>(
        TAX_RULE_KEYS.detail(id)
      )

      queryClient.setQueryData<TaxRulePaginator>(queryKey, (old) => {
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

      queryClient.setQueryData(TAX_RULE_KEYS.detail(id), data)

      return { previousTaxRules, previousTaxRule }
    },
    onSuccess: async () => {
      toast.success(
        <Text as="b">{t("form-tax-rule-successfully-updated")}</Text>
      )
      router.push(routes.fms.taxRule)
    },
    onError: (err, variables, context) => {
      if (context?.previousTaxRules) {
        const queryKey = [
          TAX_RULE_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousTaxRules)
      }
      if (context?.previousTaxRule) {
        queryClient.setQueryData(
          TAX_RULE_KEYS.detail(variables.id),
          context.previousTaxRule
        )
      }
    },
    onSettled: (data) => {
      queryClient.invalidateQueries({
        queryKey: [TAX_RULE_KEYS.all],
        exact: false,
      })
      if (data?.id) {
        queryClient.invalidateQueries({
          queryKey: TAX_RULE_KEYS.detail(data.id),
        })
      }
    },
  })
}

export function useDeleteTaxRule() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (id: number) => TaxRuleService.delete(id),
    onMutate: async (id) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [TAX_RULE_KEYS.all],
        exact: false,
      })

      const queryKey = [
        TAX_RULE_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      // Snapshot the previous value
      const previousTaxRules =
        queryClient.getQueryData<TaxRulePaginator>(queryKey)

      // Optimistically remove the TaxRule from the list
      queryClient.setQueryData<TaxRulePaginator>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => item.id !== id),
          count: old.count - 1,
        }
      })

      return { previousTaxRules }
    },

    onSuccess: () => {
      toast.success(
        <Text as="b">{t("form-tax-rule-successfully-deleted")}</Text>
      )
    },

    onError: (err, variables, context) => {
      // @ts-ignore
      const errorMessage = err?.response?.data?.message;
      if (errorMessage?.includes('referenced')) {
        toast.error(
          <Text as="b">
            {t("form-tax-rule-cannot-delete-referenced")}
          </Text>
        );
      } else {
        toast.error(
          <Text as="b">
            {t("form-tax-rule-failed-to-delete")}
          </Text>
        );
      }
      if (context?.previousTaxRules) {
        const queryKey = [
          TAX_RULE_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousTaxRules)
      }
    },

    onSettled: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [TAX_RULE_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useBulkDeleteTaxRule() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (ids: number[]) => TaxRuleService.bulk(ids),
    onMutate: async (ids) => {
      await queryClient.cancelQueries({
        queryKey: [TAX_RULE_KEYS.all],
        exact: false,
      })

      const queryKey = [
        TAX_RULE_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousTaxRules =
        queryClient.getQueryData<TaxRulePaginator>(queryKey)
      queryClient.setQueryData<TaxRulePaginator>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => !ids.includes(item.id as number)),
          count: old.count - ids.length,
        }
      })

      return { previousTaxRules }
    },
    onSuccess: () => {
      toast.success(
        <Text as="b">{t("form-tax-rule-deleted-successfully")}</Text>
      )
    },
    onError: (err, variables, context) => {
      // @ts-ignore
      const errorMessage = err?.response?.data?.message;
      if (errorMessage?.includes('REFERENCE constraint')) {
        toast.error(
          <Text as="b">
            {t("form-tax-rule-cannot-delete-referenced")}
          </Text>
        );
      } else {
        toast.error(
          <Text as="b">
            {t("form-tax-rule-failed-to-delete")}
          </Text>
        );
      }
      if (context?.previousTaxRules) {
        const queryKey = [
          TAX_RULE_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousTaxRules)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [TAX_RULE_KEYS.all],
        exact: false,
      })
    },
  })
}
