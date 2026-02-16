import { useRouter } from "next/navigation"

import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query"
import { AxiosError } from "axios"
import { useTranslations } from "next-intl"
import toast from "react-hot-toast"
import { Text } from "rizzui"

import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "@/config/constants"
import { routes } from "@/config/routes"
import { QUERY_KEYS } from "@/server/service/hrms/hrms-query-keys.constants"
import { SalaryRuleService } from "@/server/service/hrms/payroll-configuration/salary-rules.service"
import { createQueryKeys } from "@/server/service/query-config"
import {
  SalaryRule,
  SalaryRuleDataResponse,
  SalaryRuleQueryOptions,
} from "@/types/hrms/payroll-configuration/salary-rules.types"

const SALARY_RULE_KEYS = createQueryKeys(QUERY_KEYS.salaryRuleList)

export function useSalaryRuleList(options?: Partial<SalaryRuleQueryOptions>) {
  const queryKey = [SALARY_RULE_KEYS.all, options]

  return useQuery<SalaryRuleDataResponse, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return SalaryRuleService.all(Object.assign({}, queryKey[1], pageParam))
    },
    placeholderData: keepPreviousData,
  })
}

export function useSalaryRuleById(id: number) {
  return useQuery<SalaryRule>({
    queryKey: [QUERY_KEYS.salaryRule, id],
    queryFn: () => SalaryRuleService.get(id),
    enabled: !!id,
  })
}

export function useCreateSalaryRule() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: SalaryRule): Promise<SalaryRule> =>
      SalaryRuleService.create(data),
    onSuccess: () => {
      toast.success(
        <Text as="b">{t("form-salary-rule-created-successfully")}</Text>
      )
      router.push(routes.hr.salaryRules)
    },
    onError: (err: AxiosError) => {
      if (err?.response?.data) {
        toast.error(<Text as="b">{t("form-something-went-wrong")}</Text>)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [SALARY_RULE_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useUpdateSalaryRule() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: SalaryRule) => SalaryRuleService.update(data),
    onSuccess: () => {
      toast.success(
        <Text as="b">{t("form-salary-rule-updated-successfully")}</Text>
      )
      router.push(routes.hr.salaryRules)
    },
    onError: (err: AxiosError) => {
      if (err?.response?.data) {
        toast.error(<Text as="b">{t("form-something-went-wrong")}</Text>)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [SALARY_RULE_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useDeleteSalaryRule() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (id: number) => SalaryRuleService.delete(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({
        queryKey: [SALARY_RULE_KEYS.all],
        exact: false,
      })

      const queryKey = [
        SALARY_RULE_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousData =
        queryClient.getQueryData<SalaryRuleDataResponse>(queryKey)

      queryClient.setQueryData<SalaryRuleDataResponse>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => item.id !== id),
          count: old.count - 1,
        }
      })

      return { previousData }
    },
    onSuccess: () => {
      toast.success(
        <Text as="b">{t("form-salary-rule-deleted-successfully")}</Text>
      )
    },
    onError: (err: AxiosError, variables, context) => {
      if (err?.response?.data) {
        toast.error(<Text as="b">{t("form-can-not-delete")}</Text>)
      }
      if (context?.previousData) {
        const queryKey = [
          SALARY_RULE_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousData)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [SALARY_RULE_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useBulkDeleteSalaryRules() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (ids: number[]) => SalaryRuleService.bulkDelete(ids),
    onMutate: async (ids) => {
      await queryClient.cancelQueries({
        queryKey: [SALARY_RULE_KEYS.all],
        exact: false,
      })

      const queryKey = [
        SALARY_RULE_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousData =
        queryClient.getQueryData<SalaryRuleDataResponse>(queryKey)

      queryClient.setQueryData<SalaryRuleDataResponse>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => !ids.includes(item.id ?? 0)),
          count: old.count - ids.length,
        }
      })

      return { previousData }
    },
    onSuccess: () => {
      toast.success(
        <Text as="b">{t("form-selected-salary-rules-deleted")}</Text>
      )
    },
    onError: (err: AxiosError, variables, context) => {
      if (err?.response?.data) {
        toast.error(<Text as="b">{t("form-can-not-delete")}</Text>)
      }
      if (context?.previousData) {
        const queryKey = [
          SALARY_RULE_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousData)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [SALARY_RULE_KEYS.all],
        exact: false,
      })
    },
  })
}
