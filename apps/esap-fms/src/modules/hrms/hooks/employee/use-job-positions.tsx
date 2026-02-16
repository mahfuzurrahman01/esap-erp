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
import { JobPositionService } from "@/server/service/hrms/employee/job-positions.service"
import { QUERY_KEYS } from "@/server/service/hrms/hrms-query-keys.constants"
import { createQueryKeys } from "@/server/service/query-config"
import {
  JobPosition,
  JobPositionQueryOptions,
  JobPositionsDataResponse,
} from "@/types/hrms/employee/job-positions.types"

// Fetch Job positions list with pagination
const JOB_POSITIONS_KEYS = createQueryKeys(QUERY_KEYS.jobPositionsList)

export function useJobPositionList(options?: Partial<JobPositionQueryOptions>) {
  const queryKey = [JOB_POSITIONS_KEYS.all, options]

  return useQuery<JobPositionsDataResponse, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return JobPositionService.all(Object.assign({}, queryKey[1], pageParam))
    },
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}

// Create new Job position
export function useCreateJobPosition() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: JobPosition): Promise<JobPosition> =>
      JobPositionService.create(data),
    onMutate: async (newEmployee) => {
      await queryClient.cancelQueries({
        queryKey: [JOB_POSITIONS_KEYS.all],
        exact: false,
      })

      const queryKey = [
        JOB_POSITIONS_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousEmployee =
        queryClient.getQueryData<JobPositionsDataResponse>(queryKey)

      queryClient.setQueryData<JobPositionsDataResponse>(queryKey, (old) => {
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
      toast.success(<Text as="b">{t("form-job-position-added")}</Text>)
      router.push(routes.hr.jobPositions)
    },
    onError: (err: AxiosError, newCOA, context) => {
      if (err?.response?.data == "Similar Data already exists") {
        toast.error(<Text as="b">{t("form-similar-data-error")}</Text>)
      }
      if (context?.previousEmployee) {
        const queryKey = [
          JOB_POSITIONS_KEYS.all,
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
        queryKey: [JOB_POSITIONS_KEYS.all],
        exact: false,
      })
    },
  })
}

// Update existing Job position
export function useUpdateJobPosition() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: ({ data }: { data: JobPosition }) =>
      JobPositionService.update(data),
    onMutate: async ({ data }) => {
      await queryClient.cancelQueries({
        queryKey: [JOB_POSITIONS_KEYS.all],
        exact: false,
      })
      await queryClient.cancelQueries({
        queryKey: [JOB_POSITIONS_KEYS.detail(data.id ?? 0)],
      })

      const queryKey = [
        QUERY_KEYS.employeeList,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousEmployees =
        queryClient.getQueryData<JobPositionsDataResponse>(queryKey)
      const previousEmployee = queryClient.getQueryData<JobPosition>(
        JOB_POSITIONS_KEYS.all
      )

      queryClient.setQueryData<JobPositionsDataResponse>(queryKey, (old) => {
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

      queryClient.setQueryData(JOB_POSITIONS_KEYS.detail(data.id ?? 0), data)

      return { previousEmployees, previousEmployee }
    },
    onSuccess: async () => {
      // const newCompanyId = response.id  (Need correction here "id needed")
      toast.success(<Text as="b">{t("form-job-position-updated")}</Text>)
      // router.push(`${routes.fms.coa}/${newCompanyId}`)
      router.push(routes.hr.jobPositions)
    },
    onError: (err, variables, context) => {
      if (context?.previousEmployees) {
        const queryKey = [
          JOB_POSITIONS_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousEmployees)
      }
      if (context?.previousEmployee) {
        queryClient.setQueryData(
          JOB_POSITIONS_KEYS.detail(variables.data.id ?? 0),
          context.previousEmployee
        )
      }
    },
    onSettled: (data) => {
      queryClient.invalidateQueries({
        queryKey: [JOB_POSITIONS_KEYS.all],
        exact: false,
      })
      if (data?.id) {
        queryClient.invalidateQueries({
          queryKey: JOB_POSITIONS_KEYS.detail(data.id),
        })
      }
    },
  })
}

// Delete Job position
export function useDeleteJobPosition() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")
  return useMutation({
    mutationFn: (id: number) => JobPositionService.delete(id),
    onMutate: async (id) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [JOB_POSITIONS_KEYS.all],
        exact: false,
      })

      const queryKey = [
        JOB_POSITIONS_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      // Snapshot the previous value
      const previousEmployees =
        queryClient.getQueryData<JobPositionsDataResponse>(queryKey)

      // Optimistically remove the COA from the list
      queryClient.setQueryData<JobPositionsDataResponse>(queryKey, (old) => {
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
      toast.success(<Text as="b">{t("form-job-position-deleted")}</Text>)
      // queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.employeeList] })
    },

    onError: (err: AxiosError, variables, context) => {
      if (err.message == "Request failed with status code 500") {
        toast.error(<Text as="b">{t("form-dependency-message")}</Text>)
      }
      // If the mutation fails, use the context returned from onMutate to roll back

      if (context?.previousEmployees) {
        const queryKey = [
          JOB_POSITIONS_KEYS.all,
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
        queryKey: [JOB_POSITIONS_KEYS.all],
        exact: false,
      })
    },
  })
}

// Advanced feature: Bulk operations

export function useBulkDeleteJobPosition() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")
  return useMutation({
    mutationFn: (ids: number[]) => JobPositionService.bulkDelete(ids),
    onMutate: async (ids) => {
      await queryClient.cancelQueries({
        queryKey: [JOB_POSITIONS_KEYS.all],
        exact: false,
      })

      const queryKey = [
        JOB_POSITIONS_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousEmployees =
        queryClient.getQueryData<JobPositionsDataResponse>(queryKey)

      queryClient.setQueryData<JobPositionsDataResponse>(queryKey, (old) => {
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
        <Text as="b">{t("form-selected-job-positions-deleted")}</Text>
      )
    },

    onError: (err: AxiosError, variables, context) => {
      if (err?.response?.data) {
        return toast.error(<Text as="b">{t("form-can-not-delete")}</Text>)
      }

      if (context?.previousEmployees) {
        const queryKey = [
          JOB_POSITIONS_KEYS.all,
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
        queryKey: [JOB_POSITIONS_KEYS.all],
        exact: false,
      })
    },
  })
}
