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
import { WorkingScheduleService } from "@/server/service/hrms/employee/work-schedule.service"
import { QUERY_KEYS } from "@/server/service/hrms/hrms-query-keys.constants"
import { createQueryKeys } from "@/server/service/query-config"
import {
  WorkingSchedule,
  WorkingScheduleDataResponse,
  WorkingScheduleQueryOptions,
} from "@/types/hrms/employee/working-schedule.types"

const WORKING_SCHEDULE_KEYS = createQueryKeys(QUERY_KEYS.workingScheduleList)
// Fetch WorkingSchedule list with pagination
export function useWorkingScheduleList(
  options?: Partial<WorkingScheduleQueryOptions>
) {
  const queryKey = [WORKING_SCHEDULE_KEYS.all, options]

  return useQuery<WorkingScheduleDataResponse, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return WorkingScheduleService.all(
        Object.assign({}, queryKey[1], pageParam)
      )
    },
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}

// Create new WorkingSchedule
export function useCreateWorkingSchedule() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: WorkingSchedule): Promise<WorkingSchedule> =>
      WorkingScheduleService.create(data),
    onMutate: async (newEmployee) => {
      await queryClient.cancelQueries({
        queryKey: [WORKING_SCHEDULE_KEYS.all],
        exact: false,
      })

      const queryKey = [
        WORKING_SCHEDULE_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousEmployee =
        queryClient.getQueryData<WorkingScheduleDataResponse>(queryKey)

      queryClient.setQueryData<WorkingScheduleDataResponse>(queryKey, (old) => {
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
      toast.success(<Text as="b">{t("form-working-schedule-added")}</Text>)
      router.push(`${routes.hr.workingSchedule}`)
    },
    onError: (err, newCOA, context) => {
      if (context?.previousEmployee) {
        const queryKey = [
          WORKING_SCHEDULE_KEYS.all,
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
        queryKey: [WORKING_SCHEDULE_KEYS.all],
        exact: false,
      })
    },
  })
}

// Update existing WorkingSchedule

export function useUpdateWorkingSchedule() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: ({ data }: { data: WorkingSchedule }) =>
      WorkingScheduleService.update(data),
    onMutate: async ({ data }) => {
      await queryClient.cancelQueries({
        queryKey: [WORKING_SCHEDULE_KEYS.all],
        exact: false,
      })
      await queryClient.cancelQueries({
        queryKey: [WORKING_SCHEDULE_KEYS.detail(data.id ?? 0)],
      })

      const queryKey = [
        QUERY_KEYS.employeeList,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousEmployeeTypes =
        queryClient.getQueryData<WorkingScheduleDataResponse>(queryKey)
      const previousEmployeeType = queryClient.getQueryData<WorkingSchedule>(
        WORKING_SCHEDULE_KEYS.all
      )

      queryClient.setQueryData<WorkingScheduleDataResponse>(queryKey, (old) => {
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

      queryClient.setQueryData(WORKING_SCHEDULE_KEYS.detail(data.id ?? 0), data)

      return { previousEmployeeTypes, previousEmployeeType }
    },
    onSuccess: async () => {
      toast.success(<Text as="b">{t("form-working-schedule-updated")}</Text>)
      router.push(`${routes.hr.workingSchedule}`)
    },
    onError: (err, variables, context) => {
      if (context?.previousEmployeeTypes) {
        const queryKey = [
          WORKING_SCHEDULE_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousEmployeeTypes)
      }
      if (context?.previousEmployeeType) {
        queryClient.setQueryData(
          WORKING_SCHEDULE_KEYS.detail(variables.data.id ?? 0),
          context.previousEmployeeType
        )
      }
    },
    onSettled: (data) => {
      queryClient.invalidateQueries({
        queryKey: [WORKING_SCHEDULE_KEYS.all],
        exact: false,
      })
      if (data?.id) {
        queryClient.invalidateQueries({
          queryKey: WORKING_SCHEDULE_KEYS.detail(data.id),
        })
      }
    },
  })
}

// Delete WorkingSchedule
export function useDeleteWorkingSchedule() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")
  const router = useRouter()
  return useMutation({
    mutationFn: (id: number) => WorkingScheduleService.delete(id),
    onMutate: async (id) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [WORKING_SCHEDULE_KEYS.all],
        exact: false,
      })

      const queryKey = [
        WORKING_SCHEDULE_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      // Snapshot the previous value
      const previousCOAs =
        queryClient.getQueryData<WorkingScheduleDataResponse>(queryKey)

      // Optimistically remove the COA from the list
      queryClient.setQueryData<WorkingScheduleDataResponse>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => item.id !== id),
          count: old.count - 1,
        }
      })

      return { previousCOAs }
    },

    onSuccess: () => {
      toast.success(<Text as="b">{t("form-working-schedule-deleted")}</Text>)
      router.push(`${routes.hr.workingSchedule}`)
    },

    onError: (err, variables, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousCOAs) {
        const queryKey = [
          WORKING_SCHEDULE_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousCOAs)
      }
    },

    onSettled: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [WORKING_SCHEDULE_KEYS.all],
        exact: false,
      })
    },
  })
}

// Advanced feature: Bulk operations

export function useBulkDeleteWorkingSchedule() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")
  return useMutation({
    mutationFn: (ids: number[]) => WorkingScheduleService.bulkDelete(ids),
    onMutate: async (ids) => {
      await queryClient.cancelQueries({
        queryKey: [WORKING_SCHEDULE_KEYS.all],
        exact: false,
      })

      const queryKey = [
        WORKING_SCHEDULE_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousEmployees =
        queryClient.getQueryData<WorkingScheduleDataResponse>(queryKey)

      queryClient.setQueryData<WorkingScheduleDataResponse>(queryKey, (old) => {
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
        <Text as="b">{t("form-selected-work-schedule-deleted")}</Text>
      )
    },

    onError: (err: AxiosError, variables, context) => {
      if (err?.response?.data) {
        return toast.error(<Text as="b">{t("form-can-not-delete")}</Text>)
      }

      if (context?.previousEmployees) {
        const queryKey = [
          WORKING_SCHEDULE_KEYS.all,
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
        queryKey: [WORKING_SCHEDULE_KEYS.all],
        exact: false,
      })
    },
  })
}
