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
import { SalaryCategoryService } from "@/server/service/hrms/payroll-configuration/salary-category.service"
import { createQueryKeys } from "@/server/service/query-config"
import {
  SalaryCategory,
  SalaryCategoryDataResponse,
  SalaryCategoryQueryOptions,
} from "@/types/hrms/payroll-configuration/salary-category.types"

const SALARY_CATEGORY_KEYS = createQueryKeys(QUERY_KEYS.salaryCategoryList)

export function useSalaryCategoryList(
  options?: Partial<SalaryCategoryQueryOptions>
) {
  const queryKey = [SALARY_CATEGORY_KEYS.all, options]

  return useQuery<SalaryCategoryDataResponse, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return SalaryCategoryService.all(
        Object.assign({}, queryKey[1], pageParam)
      )
    },
    placeholderData: keepPreviousData,
  })
}

export function useSalaryCategoryById(id: number) {
  return useQuery<SalaryCategory>({
    queryKey: [QUERY_KEYS.salaryCategory, id],
    queryFn: () => SalaryCategoryService.get(id),
    enabled: !!id,
  })
}

export function useCreateSalaryCategory() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: SalaryCategory): Promise<SalaryCategory> =>
      SalaryCategoryService.create(data),
    onSuccess: () => {
      toast.success(
        <Text as="b">{t("form-salary-category-created-successfully")}</Text>
      )
      router.push(routes.hr.salaryCategory)
    },
    onError: (err: AxiosError) => {
      if (err?.response?.data) {
        toast.error(<Text as="b">{t("form-something-went-wrong")}</Text>)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [SALARY_CATEGORY_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useUpdateSalaryCategory() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: SalaryCategory) => SalaryCategoryService.update(data),
    onSuccess: () => {
      toast.success(
        <Text as="b">{t("form-salary-category-updated-successfully")}</Text>
      )
      router.push(routes.hr.salaryCategory)
    },
    onError: (err: AxiosError) => {
      if (err?.response?.data) {
        toast.error(<Text as="b">{t("form-something-went-wrong")}</Text>)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [SALARY_CATEGORY_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useDeleteSalaryCategory() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (id: number) => SalaryCategoryService.delete(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({
        queryKey: [SALARY_CATEGORY_KEYS.all],
        exact: false,
      })

      const queryKey = [
        SALARY_CATEGORY_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousData =
        queryClient.getQueryData<SalaryCategoryDataResponse>(queryKey)

      queryClient.setQueryData<SalaryCategoryDataResponse>(queryKey, (old) => {
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
        <Text as="b">{t("form-salary-category-deleted-successfully")}</Text>
      )
    },
    onError: (err: AxiosError, variables, context) => {
      if (err?.response?.data) {
        toast.error(<Text as="b">{t("form-can-not-delete")}</Text>)
      }
      if (context?.previousData) {
        const queryKey = [
          SALARY_CATEGORY_KEYS.all,
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
        queryKey: [SALARY_CATEGORY_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useBulkDeleteSalaryCategories() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (ids: number[]) => SalaryCategoryService.bulkDelete(ids),
    onMutate: async (ids) => {
      await queryClient.cancelQueries({
        queryKey: [SALARY_CATEGORY_KEYS.all],
        exact: false,
      })

      const queryKey = [
        SALARY_CATEGORY_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousData =
        queryClient.getQueryData<SalaryCategoryDataResponse>(queryKey)

      queryClient.setQueryData<SalaryCategoryDataResponse>(queryKey, (old) => {
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
        <Text as="b">{t("form-selected-salary-categories-deleted")}</Text>
      )
    },
    onError: (err: AxiosError, variables, context) => {
      if (err?.response?.data) {
        toast.error(<Text as="b">{t("form-can-not-delete")}</Text>)
      }
      if (context?.previousData) {
        const queryKey = [
          SALARY_CATEGORY_KEYS.all,
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
        queryKey: [SALARY_CATEGORY_KEYS.all],
        exact: false,
      })
    },
  })
}
