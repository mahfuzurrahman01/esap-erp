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
import { LeaveTypeService } from "@/server/service/hrms/attendance-and-leave/leave-type.service"
import { QUERY_KEYS } from "@/server/service/hrms/hrms-query-keys.constants"
import { createQueryKeys } from "@/server/service/query-config"
import {
  LeaveType,
  LeaveTypeQueryOptions,
  LeaveTypesDataResponse,
} from "@/types/hrms/attendance-and-leave/leave-type.types"

// Fetch Leave Type list with pagination
const LEAVE_TYPE_KEYS = createQueryKeys(QUERY_KEYS.leaveTypeList)

export function useLeaveTypeList(options?: Partial<LeaveTypeQueryOptions>) {
  const queryKey = [LEAVE_TYPE_KEYS.all, options]

  return useQuery<LeaveTypesDataResponse, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return LeaveTypeService.all(Object.assign({}, queryKey[1], pageParam))
    },
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}

// Create new Leave Type
export function useCreateLeaveType() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: LeaveType): Promise<LeaveType> =>
      LeaveTypeService.create(data),
    onMutate: async (newEmployee) => {
      await queryClient.cancelQueries({
        queryKey: [LEAVE_TYPE_KEYS.all],
        exact: false,
      })

      const queryKey = [
        LEAVE_TYPE_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousEmployee =
        queryClient.getQueryData<LeaveTypesDataResponse>(queryKey)

      queryClient.setQueryData<LeaveTypesDataResponse>(queryKey, (old) => {
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
      toast.success(<Text as="b">{t("form-leave-type-added")}</Text>)
      router.push(routes.hr.leaveType)
    },
    onError: (err: AxiosError, newCOA, context) => {
      if (err.response?.data === "Similar Data already exists") {
        toast.error(<Text as="b">{t("form-similar-data-error")}</Text>)
      }
      if (context?.previousEmployee) {
        const queryKey = [
          LEAVE_TYPE_KEYS.all,
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
        queryKey: [LEAVE_TYPE_KEYS.all],
        exact: false,
      })
    },
  })
}

// Update existing Leave Type

export function useUpdateLeaveType() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: ({ data }: { data: LeaveType }) =>
      LeaveTypeService.update(data),
    onMutate: async ({ data }) => {
      await queryClient.cancelQueries({
        queryKey: [LEAVE_TYPE_KEYS.all],
        exact: false,
      })
      await queryClient.cancelQueries({
        queryKey: [LEAVE_TYPE_KEYS.detail(data.id ?? 0)],
      })

      const queryKey = [
        QUERY_KEYS.employeeList,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousEmployeeTypes =
        queryClient.getQueryData<LeaveTypesDataResponse>(queryKey)
      const previousEmployeeType = queryClient.getQueryData<LeaveType>(
        LEAVE_TYPE_KEYS.all
      )

      queryClient.setQueryData<LeaveTypesDataResponse>(queryKey, (old) => {
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

      queryClient.setQueryData(LEAVE_TYPE_KEYS.detail(data.id ?? 0), data)

      return { previousEmployeeTypes, previousEmployeeType }
    },
    onSuccess: async () => {
      toast.success(<Text as="b">{t("form-leave-type-updated")}</Text>)

      router.push(routes.hr.leaveType)
    },
    onError: (err: AxiosError, variables, context) => {
      if (err.response?.data === "Similar Data already exists") {
        toast.error(<Text as="b">{t("form-similar-data-error")}</Text>)
      }
      if (context?.previousEmployeeTypes) {
        const queryKey = [
          LEAVE_TYPE_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousEmployeeTypes)
      }
      if (context?.previousEmployeeType) {
        queryClient.setQueryData(
          LEAVE_TYPE_KEYS.detail(variables.data.id ?? 0),
          context.previousEmployeeType
        )
      }
    },
    onSettled: (data) => {
      queryClient.invalidateQueries({
        queryKey: [LEAVE_TYPE_KEYS.all],
        exact: false,
      })
      if (data?.id) {
        queryClient.invalidateQueries({
          queryKey: LEAVE_TYPE_KEYS.detail(data.id),
        })
      }
    },
  })
}

// Delete Leave Type

export function useDeleteLeaveType() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (id: number) => LeaveTypeService.delete(id),
    onMutate: async (id) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [LEAVE_TYPE_KEYS.all],
        exact: false,
      })

      const queryKey = [
        LEAVE_TYPE_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      // Snapshot the previous value
      const previousEmployees =
        queryClient.getQueryData<LeaveTypesDataResponse>(queryKey)

      // Optimistically remove the COA from the list
      queryClient.setQueryData<LeaveTypesDataResponse>(queryKey, (old) => {
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
      toast.success(<Text as="b">{t("form-leave-type-deleted")}</Text>)
      // queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.employeeList] })
    },

    onError: (err, variables, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousEmployees) {
        const queryKey = [
          LEAVE_TYPE_KEYS.all,
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
        queryKey: [LEAVE_TYPE_KEYS.all],
        exact: false,
      })
    },
  })
}

// Advanced feature: Bulk operations
export function useBulkDeleteLeaveType() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")
  return useMutation({
    mutationFn: (ids: number[]) => LeaveTypeService.bulkDelete(ids),
    onMutate: async (ids) => {
      await queryClient.cancelQueries({
        queryKey: [LEAVE_TYPE_KEYS.all],
        exact: false,
      })

      const queryKey = [
        LEAVE_TYPE_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousEmployees =
        queryClient.getQueryData<LeaveTypesDataResponse>(queryKey)

      queryClient.setQueryData<LeaveTypesDataResponse>(queryKey, (old) => {
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
      toast.success(<Text as="b">{t("form-selected-leave-type-deleted")}</Text>)
    },

    onError: (err: AxiosError, variables, context) => {
      if (err?.response?.data) {
        return toast.error(<Text as="b">{t("form-can-not-delete")}</Text>)
      }

      if (context?.previousEmployees) {
        const queryKey = [
          LEAVE_TYPE_KEYS.all,
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
        queryKey: [LEAVE_TYPE_KEYS.all],
        exact: false,
      })
    },
  })
}

export const useLeaveTypeOptions = () => {
  const { data, isLoading } = useLeaveTypeList()

  const options =
    data?.data.map((leaveType) => ({
      label: leaveType.leaveTypeName,
      value: leaveType.id,
    })) ?? []

  return { leaveTypeOptions: options, isLoading }
}
