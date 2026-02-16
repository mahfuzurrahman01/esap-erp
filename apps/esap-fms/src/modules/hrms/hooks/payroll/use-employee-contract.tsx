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
import { EmployeeContractService } from "@/server/service/hrms/payroll/employee-contract.service"
import { createQueryKeys } from "@/server/service/query-config"
import {
  EmployeeContract,
  EmployeeContractDataResponse,
  EmployeeContractQueryOptions,
} from "@/types/hrms/payroll/employee-contract.types"

const EMPLOYEE_CONTRACT_KEYS = createQueryKeys(QUERY_KEYS.employeeContractList)

export function useEmployeeContractList(
  options?: Partial<EmployeeContractQueryOptions>
) {
  const queryKey = [EMPLOYEE_CONTRACT_KEYS.all, options]

  return useQuery<EmployeeContractDataResponse, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return EmployeeContractService.all(
        Object.assign({}, queryKey[1], pageParam)
      )
    },
    placeholderData: keepPreviousData,
  })
}

export function useEmployeeContractById(id: number) {
  return useQuery<EmployeeContract>({
    queryKey: [QUERY_KEYS.employeeContract, id],
    queryFn: () => EmployeeContractService.get(id),
    enabled: !!id,
  })
}

export function useEmployeeContractByEmployeeId(id: number) {
  return useQuery<EmployeeContract>({
    queryKey: [QUERY_KEYS.employeeContract, id],
    queryFn: () => EmployeeContractService.getByEmployeeId(id),
    enabled: !!id,
  })
}

export function useCreateEmployeeContract() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: EmployeeContract): Promise<EmployeeContract> =>
      EmployeeContractService.create(data),
    onSuccess: () => {
      toast.success(
        <Text as="b">{t("form-employee-contract-created-successfully")}</Text>
      )
      router.push(routes.hr.employeeContracts)
    },
    onError: (err: AxiosError) => {
      if (err?.response?.data) {
        toast.error(<Text as="b">{t("form-something-went-wrong")}</Text>)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [EMPLOYEE_CONTRACT_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useUpdateEmployeeContract() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: EmployeeContract) =>
      EmployeeContractService.update(data),
    onSuccess: () => {
      toast.success(
        <Text as="b">{t("form-employee-contract-updated-successfully")}</Text>
      )
      router.push(routes.hr.employeeContracts)
    },
    onError: (err: AxiosError) => {
      if (err?.response?.data) {
        toast.error(<Text as="b">{t("form-something-went-wrong")}</Text>)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [EMPLOYEE_CONTRACT_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useDeleteEmployeeContract() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (id: number) => EmployeeContractService.delete(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({
        queryKey: [EMPLOYEE_CONTRACT_KEYS.all],
        exact: false,
      })

      const queryKey = [
        EMPLOYEE_CONTRACT_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousData =
        queryClient.getQueryData<EmployeeContractDataResponse>(queryKey)

      queryClient.setQueryData<EmployeeContractDataResponse>(
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
        <Text as="b">{t("form-employee-contract-deleted-successfully")}</Text>
      )
    },
    onError: (err: AxiosError, variables, context) => {
      if (err?.response?.data) {
        toast.error(<Text as="b">{t("form-can-not-delete")}</Text>)
      }
      if (context?.previousData) {
        const queryKey = [
          EMPLOYEE_CONTRACT_KEYS.all,
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
        queryKey: [EMPLOYEE_CONTRACT_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useBulkDeleteEmployeeContracts() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (ids: number[]) => EmployeeContractService.bulkDelete(ids),
    onMutate: async (ids) => {
      await queryClient.cancelQueries({
        queryKey: [EMPLOYEE_CONTRACT_KEYS.all],
        exact: false,
      })

      const queryKey = [
        EMPLOYEE_CONTRACT_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousData =
        queryClient.getQueryData<EmployeeContractDataResponse>(queryKey)

      queryClient.setQueryData<EmployeeContractDataResponse>(
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
        <Text as="b">{t("form-selected-employee-contracts-deleted")}</Text>
      )
    },
    onError: (err: AxiosError, variables, context) => {
      if (err?.response?.data) {
        toast.error(<Text as="b">{t("form-can-not-delete")}</Text>)
      }
      if (context?.previousData) {
        const queryKey = [
          EMPLOYEE_CONTRACT_KEYS.all,
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
        queryKey: [EMPLOYEE_CONTRACT_KEYS.all],
        exact: false,
      })
    },
  })
}
