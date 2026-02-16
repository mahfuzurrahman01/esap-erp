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
import { EmployeeTypeService } from "@/server/service/hrms/employee/employee-types.service"
import { QUERY_KEYS } from "@/server/service/hrms/hrms-query-keys.constants"
import { createQueryKeys } from "@/server/service/query-config"
import {
  EmployeeType,
  EmployeeTypeDataResponse,
  EmployeeTypeQueryOptions,
} from "@/types/hrms/employee/employee-types.types"

const EMPLOYEE_TYPE_KEYS = createQueryKeys(QUERY_KEYS.employeeTypeList)
// Fetch EmployeeType list with pagination

export function useEmployeeTypeList(
  options?: Partial<EmployeeTypeQueryOptions>
) {
  const queryKey = [EMPLOYEE_TYPE_KEYS.all, options]

  return useQuery<EmployeeTypeDataResponse, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return EmployeeTypeService.all(Object.assign({}, queryKey[1], pageParam))
    },
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}

// add new employee type
export function useCreateEmployeeType() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: EmployeeType): Promise<EmployeeType> =>
      EmployeeTypeService.create(data),
    onMutate: async (newEmployee) => {
      await queryClient.cancelQueries({
        queryKey: [EMPLOYEE_TYPE_KEYS.all],
        exact: false,
      })

      const queryKey = [
        EMPLOYEE_TYPE_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousEmployee =
        queryClient.getQueryData<EmployeeTypeDataResponse>(queryKey)

      queryClient.setQueryData<EmployeeTypeDataResponse>(queryKey, (old) => {
        if (!old)
          return {
            data: [newEmployee],
            count: 1,
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          }
        return {
          ...old,
          data: [...old.data, { ...newEmployee, id: Date.now() }],
          count: old.count + 1,
        }
      })

      return { previousEmployee }
    },
    onSuccess: async () => {
      toast.success(<Text as="b">{t("form-employee-type-added")}</Text>)
      router.push(routes.hr.employeeSettingItems)
    },
    onError: (err, newCOA, context) => {
      if (context?.previousEmployee) {
        const queryKey = [
          EMPLOYEE_TYPE_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousEmployee)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [EMPLOYEE_TYPE_KEYS.all],
        exact: false,
      })
    },
  })
}

// Update existing EmployeeType
export function useUpdateEmployeeType() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: ({ data }: { data: EmployeeType }) =>
      EmployeeTypeService.update(data),
    onMutate: async ({ data }) => {
      await queryClient.cancelQueries({
        queryKey: [EMPLOYEE_TYPE_KEYS.all],
        exact: false,
      })
      await queryClient.cancelQueries({
        queryKey: [EMPLOYEE_TYPE_KEYS.detail(data.id ?? 0)],
      })

      const queryKey = [
        QUERY_KEYS.employeeList,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousEmployeeTypes =
        queryClient.getQueryData<EmployeeTypeDataResponse>(queryKey)
      const previousEmployeeType = queryClient.getQueryData<EmployeeType>(
        EMPLOYEE_TYPE_KEYS.all
      )

      queryClient.setQueryData<EmployeeTypeDataResponse>(queryKey, (old) => {
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

      queryClient.setQueryData(EMPLOYEE_TYPE_KEYS.detail(data.id ?? 0), data)

      return { previousEmployeeTypes, previousEmployeeType }
    },
    onSuccess: async () => {
      toast.success(<Text as="b">{t("form-employee-type-updated")}</Text>)

      router.push(routes.hr.employeeSettingItems)
    },
    onError: (err, variables, context) => {
      if (context?.previousEmployeeTypes) {
        const queryKey = [
          EMPLOYEE_TYPE_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousEmployeeTypes)
      }
      if (context?.previousEmployeeType) {
        queryClient.setQueryData(
          EMPLOYEE_TYPE_KEYS.detail(variables.data.id ?? 0),
          context.previousEmployeeType
        )
      }
    },
    onSettled: (data) => {
      queryClient.invalidateQueries({
        queryKey: [EMPLOYEE_TYPE_KEYS.all],
        exact: false,
      })
      if (data?.id) {
        queryClient.invalidateQueries({
          queryKey: EMPLOYEE_TYPE_KEYS.detail(data.id),
        })
      }
    },
  })
}

export function useDeleteEmployeeType() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (id: number) => EmployeeTypeService.delete(id),
    onMutate: async (id) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [EMPLOYEE_TYPE_KEYS.all],
        exact: false,
      })

      const queryKey = [
        EMPLOYEE_TYPE_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      // Snapshot the previous value
      const previousEmployees =
        queryClient.getQueryData<EmployeeTypeDataResponse>(queryKey)

      // Optimistically remove the COA from the list
      queryClient.setQueryData<EmployeeTypeDataResponse>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => item.id !== id),
          count: old.count - 1,
        }
      })

      return { previousEmployees }
    },

    onSuccess: () => {
      toast.success(<Text as="b">{t("form-employee-type-deleted")}</Text>)
      // queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.employeeList] })
    },

    onError: (err, variables, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousEmployees) {
        const queryKey = [
          EMPLOYEE_TYPE_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousEmployees)
      }
    },

    onSettled: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [EMPLOYEE_TYPE_KEYS.all],
        exact: false,
      })
    },
  })
}

// Advanced feature: Bulk operations

export function useBulkDeleteEmployeeType() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")
  return useMutation({
    mutationFn: (ids: number[]) => EmployeeTypeService.bulkDelete(ids),
    onMutate: async (ids) => {
      await queryClient.cancelQueries({
        queryKey: [EMPLOYEE_TYPE_KEYS.all],
        exact: false,
      })

      const queryKey = [
        EMPLOYEE_TYPE_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousEmployees =
        queryClient.getQueryData<EmployeeTypeDataResponse>(queryKey)

      queryClient.setQueryData<EmployeeTypeDataResponse>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => !ids.includes(item.id ?? 0)),
          count: old.count - ids.length,
        }
      })

      return { previousEmployees }
    },

    onSuccess: () => {
      toast.success(
        <Text as="b">{t("form-selected-employee-type-deleted")}</Text>
      )
    },

    onError: (err: AxiosError, variables, context) => {
      // if (err?.response?.data) {
      //   return toast.error(<Text as="b">{t("form-can-not-delete")}</Text>)
      // }

      if (context?.previousEmployees) {
        const queryKey = [
          EMPLOYEE_TYPE_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousEmployees)
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [EMPLOYEE_TYPE_KEYS.all],
        exact: false,
      })
    },
  })
}
