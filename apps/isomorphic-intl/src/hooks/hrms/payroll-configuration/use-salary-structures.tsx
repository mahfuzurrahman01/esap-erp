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
import { SalaryStructureService } from "@/server/service/hrms/payroll-configuration/salary-structures.service"
import { createQueryKeys } from "@/server/service/query-config"
import {
  SalaryStructure,
  SalaryStructureCreateInput,
  SalaryStructureDataResponse,
  SalaryStructureQueryOptions,
  SalaryStructureUpdateInput,
} from "@/types/hrms/payroll-configuration/salary-structure.types"

const SALARY_STRUCTURE_KEYS = createQueryKeys(QUERY_KEYS.salaryStructureList)

export function useSalaryStructureList(
  options?: Partial<SalaryStructureQueryOptions>
) {
  const queryKey = [SALARY_STRUCTURE_KEYS.all, options]

  return useQuery<SalaryStructureDataResponse, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return SalaryStructureService.all(
        Object.assign({}, queryKey[1], pageParam)
      )
    },
    placeholderData: keepPreviousData,
  })
}

export function useSalaryStructureById(id: number) {
  return useQuery<SalaryStructure>({
    queryKey: [QUERY_KEYS.salaryStructure, id],
    queryFn: () => SalaryStructureService.get(id),
    enabled: !!id,
  })
}

export function useCreateSalaryStructure() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: SalaryStructureCreateInput): Promise<SalaryStructure> =>
      SalaryStructureService.create(data),
    onSuccess: () => {
      toast.success(
        <Text as="b">{t("form-salary-structure-created-successfully")}</Text>
      )
      router.push(routes.hr.salaryStructures)
    },
    onError: (err: AxiosError) => {
      if (err?.response?.data) {
        toast.error(<Text as="b">{t("form-something-went-wrong")}</Text>)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [SALARY_STRUCTURE_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useUpdateSalaryStructure() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: SalaryStructureUpdateInput) =>
      SalaryStructureService.update(data),
    onSuccess: () => {
      toast.success(
        <Text as="b">{t("form-salary-structure-updated-successfully")}</Text>
      )
      router.push(routes.hr.salaryStructures)
    },
    onError: (err: AxiosError) => {
      if (err?.response?.data) {
        toast.error(<Text as="b">{t("form-something-went-wrong")}</Text>)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [SALARY_STRUCTURE_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useDeleteSalaryStructure() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (id: number) => SalaryStructureService.delete(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({
        queryKey: [SALARY_STRUCTURE_KEYS.all],
        exact: false,
      })

      const queryKey = [
        SALARY_STRUCTURE_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousData =
        queryClient.getQueryData<SalaryStructureDataResponse>(queryKey)

      queryClient.setQueryData<SalaryStructureDataResponse>(queryKey, (old) => {
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
        <Text as="b">{t("form-salary-structure-deleted-successfully")}</Text>
      )
    },
    onError: (err: AxiosError, variables, context) => {
      if (err?.response?.data) {
        toast.error(<Text as="b">{t("form-can-not-delete")}</Text>)
      }
      if (context?.previousData) {
        const queryKey = [
          SALARY_STRUCTURE_KEYS.all,
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
        queryKey: [SALARY_STRUCTURE_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useBulkDeleteSalaryStructures() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (ids: number[]) => SalaryStructureService.bulkDelete(ids),
    onMutate: async (ids) => {
      await queryClient.cancelQueries({
        queryKey: [SALARY_STRUCTURE_KEYS.all],
        exact: false,
      })

      const queryKey = [
        SALARY_STRUCTURE_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousData =
        queryClient.getQueryData<SalaryStructureDataResponse>(queryKey)

      queryClient.setQueryData<SalaryStructureDataResponse>(queryKey, (old) => {
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
        <Text as="b">{t("form-selected-salary-structures-deleted")}</Text>
      )
    },
    onError: (err: AxiosError, variables, context) => {
      if (err?.response?.data) {
        toast.error(<Text as="b">{t("form-can-not-delete")}</Text>)
      }
      if (context?.previousData) {
        const queryKey = [
          SALARY_STRUCTURE_KEYS.all,
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
        queryKey: [SALARY_STRUCTURE_KEYS.all],
        exact: false,
      })
    },
  })
}
