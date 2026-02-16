import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

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

import {
  DEFAULT_PAGE_INDEX,
  DEFAULT_PAGE_SIZE,
  DEFAULT_PAGE_SIZE_200,
} from "@/config/constants"
import { routes } from "@/config/routes"
import { EmployeeService } from "@/server/service/hrms/employee/employee.service"
import { QUERY_KEYS } from "@/server/service/hrms/hrms-query-keys.constants"
import { createQueryKeys } from "@/server/service/query-config"
import { SelectOptionTypeForEmployee } from "@/types/hrms/common.types"
import {
  Employee,
  EmployeeFullDetails,
  EmployeeQueryOptions,
  EmployeesDataResponse,
} from "@/types/hrms/employee/employee.types"

// Fetch Employee list with pagination
const EMPLOYEE_KEYS = createQueryKeys(QUERY_KEYS.employeeList)

export function useEmployeeList(options?: Partial<EmployeeQueryOptions>) {
  const queryKey = [EMPLOYEE_KEYS.all, options]

  return useQuery<EmployeesDataResponse, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return EmployeeService.all(Object.assign({}, queryKey[1], pageParam))
    },
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}

// Fetch single Employee by ID
export function useEmployeeById(id: number) {
  return useQuery<EmployeeFullDetails>({
    queryKey: [QUERY_KEYS.employee, id],
    queryFn: () => EmployeeService.get(id),
    enabled: !!id,
  })
}

// Create new Employee
export function useCreateEmployee() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: Employee): Promise<Employee> =>
      EmployeeService.create(data),
    onMutate: async (newEmployee) => {
      await queryClient.cancelQueries({
        queryKey: [EMPLOYEE_KEYS.all],
        exact: false,
      })

      const queryKey = [
        EMPLOYEE_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousEmployee =
        queryClient.getQueryData<EmployeesDataResponse>(queryKey)

      queryClient.setQueryData<EmployeesDataResponse>(queryKey, (old) => {
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
    onSuccess: async (response) => {
      toast.success(
        <Text as="b">{t("form-employee-created-successfully")}</Text>
      )
      router.push(routes.hr.employeeDetails(response.id ?? 0))
    },
    onError: (err, newCOA, context) => {
      if (context?.previousEmployee) {
        const queryKey = [
          EMPLOYEE_KEYS.all,
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
        queryKey: [EMPLOYEE_KEYS.all],
        exact: false,
      })
    },
  })
}
// update new employee
export function useUpdateEmployee() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")
  const params = useParams()
  const employeeId = params.employeeId ?? ""
  return useMutation({
    mutationFn: ({ data }: { data: Employee }) => EmployeeService.update(data),
    onMutate: async ({ data }) => {
      await queryClient.cancelQueries({
        queryKey: [EMPLOYEE_KEYS.all],
        exact: false,
      })
      await queryClient.cancelQueries({
        queryKey: [EMPLOYEE_KEYS.detail(data.id ?? 0)],
      })

      const queryKey = [
        QUERY_KEYS.employeeList,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousEmployees =
        queryClient.getQueryData<EmployeesDataResponse>(queryKey)
      const previousEmployee = queryClient.getQueryData<Employee>(
        EMPLOYEE_KEYS.all
      )

      queryClient.setQueryData<EmployeesDataResponse>(queryKey, (old) => {
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

      queryClient.setQueryData(EMPLOYEE_KEYS.detail(data.id ?? 0), data)

      return { previousEmployees, previousEmployee }
    },
    onSuccess: async () => {
      // const newCompanyId = response.id  (Need correction here "id needed")
      toast.success(
        <Text as="b">{t("form-employee-updated-successfully")}</Text>
      )
      // router.push(`${routes.fms.coa}/${newCompanyId}`)
      router.push(routes.hr.employeeDetails(Number(employeeId)))
    },
    onError: (err, variables, context) => {
      if (context?.previousEmployees) {
        const queryKey = [
          EMPLOYEE_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousEmployees)
      }
      if (context?.previousEmployee) {
        queryClient.setQueryData(
          EMPLOYEE_KEYS.detail(variables.data.id ?? 0),
          context.previousEmployee
        )
      }
    },
    onSettled: (data) => {
      queryClient.invalidateQueries({
        queryKey: [EMPLOYEE_KEYS.all],
        exact: false,
      })
      if (data?.id) {
        queryClient.invalidateQueries({
          queryKey: EMPLOYEE_KEYS.detail(data.id),
        })
      }
    },
  })
}

// Delete Employee
export function useDeleteEmployee() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (id: number) => EmployeeService.delete(id),
    onMutate: async (id) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [EMPLOYEE_KEYS.all],
        exact: false,
      })

      const queryKey = [
        EMPLOYEE_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      // Snapshot the previous value
      const previousEmployees =
        queryClient.getQueryData<EmployeesDataResponse>(queryKey)

      // Optimistically remove the COA from the list
      queryClient.setQueryData<EmployeesDataResponse>(queryKey, (old) => {
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
      toast.success(
        <Text as="b">{t("form-employee-deleted-successfully")}</Text>
      )
      // queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.employeeList] })
    },

    onError: (err: AxiosError, variables, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (err?.response?.data) {
        toast.error(<Text as="b">{t("form-can-not-delete")}</Text>)
      }
      if (context?.previousEmployees) {
        const queryKey = [
          EMPLOYEE_KEYS.all,
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
        queryKey: [EMPLOYEE_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useBulkDeleteEmployees() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")
  return useMutation({
    mutationFn: (ids: number[]) => EmployeeService.bulkDelete(ids),
    onMutate: async (ids) => {
      await queryClient.cancelQueries({
        queryKey: [EMPLOYEE_KEYS.all],
        exact: false,
      })

      const queryKey = [
        EMPLOYEE_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousEmployees =
        queryClient.getQueryData<EmployeesDataResponse>(queryKey)

      queryClient.setQueryData<EmployeesDataResponse>(queryKey, (old) => {
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
      toast.success(<Text as="b">{t("form-selected-employees-deleted")}</Text>)
    },

    onError: (err: AxiosError, variables, context) => {
      if (err?.response?.data) {
        return toast.error(<Text as="b">{t("form-can-not-delete")}</Text>)
      }

      if (context?.previousEmployees) {
        const queryKey = [
          EMPLOYEE_KEYS.all,
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
        queryKey: [EMPLOYEE_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useEmployeeOptions() {
  const [employeeOptions, setEmployeeOptions] = useState<
    SelectOptionTypeForEmployee[]
  >([])

  const { data: employees, isLoading } = useEmployeeList({
    pageSize: DEFAULT_PAGE_SIZE_200,
  })

  useEffect(() => {
    if (employees) {
      setEmployeeOptions(
        employees.data.map((employee) => ({
          label: `${employee.firstName} ${employee.lastName}`,
          value: employee.id ?? 0,
        }))
      )
    }
  }, [employees])

  return { employeeOptions, isLoading }
}
