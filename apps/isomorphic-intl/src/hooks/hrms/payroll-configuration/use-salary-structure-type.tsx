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
import { SalaryStructureTypeService } from "@/server/service/hrms/payroll-configuration/salary-structure-type.service"
import { createQueryKeys } from "@/server/service/query-config"
import {
  SalaryStructureType,
  SalaryStructureTypeCreateInput,
  SalaryStructureTypeDataResponse,
  SalaryStructureTypeQueryOptions,
  SalaryStructureTypeUpdateInput,
} from "@/types/hrms/payroll-configuration/salary-structure-type.types"

const SALARY_STRUCTURE_TYPE_KEYS = createQueryKeys(
  QUERY_KEYS.salaryStructureTypeList
)

export function useSalaryStructureTypeList(
  options?: Partial<SalaryStructureTypeQueryOptions>
) {
  const queryKey = [SALARY_STRUCTURE_TYPE_KEYS.all, options]

  return useQuery<SalaryStructureTypeDataResponse, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return SalaryStructureTypeService.all(
        Object.assign({}, queryKey[1], pageParam)
      )
    },
    placeholderData: keepPreviousData,
  })
}

export function useCreateSalaryStructureType() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (
      data: SalaryStructureTypeCreateInput
    ): Promise<SalaryStructureType> => SalaryStructureTypeService.create(data),
    onSuccess: () => {
      toast.success(
        <Text as="b">
          {t("form-salary-structure-type-created-successfully")}
        </Text>
      )
      router.push(routes.hr.salaryStructureType)
    },
    onError: (err: AxiosError) => {
      if (err?.response?.data) {
        toast.error(<Text as="b">{t("form-something-went-wrong")}</Text>)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [SALARY_STRUCTURE_TYPE_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useUpdateSalaryStructureType() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: SalaryStructureTypeUpdateInput) =>
      SalaryStructureTypeService.update(data),
    onSuccess: () => {
      toast.success(
        <Text as="b">
          {t("form-salary-structure-type-updated-successfully")}
        </Text>
      )
      router.push(routes.hr.salaryStructureType)
    },
    onError: (err: AxiosError) => {
      if (err?.response?.data) {
        toast.error(<Text as="b">{t("form-something-went-wrong")}</Text>)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [SALARY_STRUCTURE_TYPE_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useDeleteSalaryStructureType() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (id: number) => SalaryStructureTypeService.delete(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({
        queryKey: [SALARY_STRUCTURE_TYPE_KEYS.all],
        exact: false,
      })

      const queryKey = [
        SALARY_STRUCTURE_TYPE_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousData =
        queryClient.getQueryData<SalaryStructureTypeDataResponse>(queryKey)

      queryClient.setQueryData<SalaryStructureTypeDataResponse>(
        queryKey,
        (old) => {
          if (!old) return old
          return {
            ...old,
            data: old.data.filter((item) => item.id !== id),
            count: old.count - 1,
          }
        }
      )

      return { previousData }
    },
    onSuccess: () => {
      toast.success(
        <Text as="b">
          {t("form-salary-structure-type-deleted-successfully")}
        </Text>
      )
    },
    onError: (err: AxiosError, variables, context) => {
      if (err?.response?.data) {
        toast.error(<Text as="b">{t("form-can-not-delete")}</Text>)
      }
      if (context?.previousData) {
        const queryKey = [
          SALARY_STRUCTURE_TYPE_KEYS.all,
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
        queryKey: [SALARY_STRUCTURE_TYPE_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useBulkDeleteSalaryStructureTypes() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (ids: number[]) => SalaryStructureTypeService.bulkDelete(ids),
    onMutate: async (ids) => {
      await queryClient.cancelQueries({
        queryKey: [SALARY_STRUCTURE_TYPE_KEYS.all],
        exact: false,
      })

      const queryKey = [
        SALARY_STRUCTURE_TYPE_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousData =
        queryClient.getQueryData<SalaryStructureTypeDataResponse>(queryKey)

      queryClient.setQueryData<SalaryStructureTypeDataResponse>(
        queryKey,
        (old) => {
          if (!old) return old
          return {
            ...old,
            data: old.data.filter((item) => !ids.includes(item.id ?? 0)),
            count: old.count - ids.length,
          }
        }
      )

      return { previousData }
    },
    onSuccess: () => {
      toast.success(
        <Text as="b">{t("form-selected-salary-structure-types-deleted")}</Text>
      )
    },
    onError: (err: AxiosError, variables, context) => {
      if (err?.response?.data) {
        toast.error(<Text as="b">{t("form-can-not-delete")}</Text>)
      }
      if (context?.previousData) {
        const queryKey = [
          SALARY_STRUCTURE_TYPE_KEYS.all,
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
        queryKey: [SALARY_STRUCTURE_TYPE_KEYS.all],
        exact: false,
      })
    },
  })
}
