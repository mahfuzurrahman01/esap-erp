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
import { LeaveAllocationService } from "@/server/service/hrms/attendance-and-leave/leave-allocation.service"
import { QUERY_KEYS } from "@/server/service/hrms/hrms-query-keys.constants"
import { createQueryKeys } from "@/server/service/query-config"
import {
  LeaveAllocation,
  LeaveAllocationQueryOptions,
  LeaveAllocationsDataResponse,
} from "@/types/hrms/attendance-and-leave/leave-allocation.types"

const LEAVE_ALLOCATION_KEYS = createQueryKeys(QUERY_KEYS.leaveAllocationList)

export function useLeaveAllocationList(
  options?: Partial<LeaveAllocationQueryOptions>
) {
  const queryKey = [LEAVE_ALLOCATION_KEYS.all, options]

  return useQuery<LeaveAllocationsDataResponse, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return LeaveAllocationService.all(
        Object.assign({}, queryKey[1], pageParam)
      )
    },
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}

// add leave allocation

export function useCreateLeaveAllocation() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: LeaveAllocation): Promise<LeaveAllocation> =>
      LeaveAllocationService.create(data),
    onMutate: async (newCOA) => {
      await queryClient.cancelQueries({
        queryKey: [LEAVE_ALLOCATION_KEYS.all],
        exact: false,
      })

      const queryKey = [
        LEAVE_ALLOCATION_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousOffDays =
        queryClient.getQueryData<LeaveAllocationsDataResponse>(queryKey)

      queryClient.setQueryData<LeaveAllocationsDataResponse>(
        queryKey,
        (old) => {
          if (!old)
            return {
              data: [newCOA],
              count: 1,
              pageIndex: DEFAULT_PAGE_INDEX,
              pageSize: DEFAULT_PAGE_SIZE,
            }
          return {
            ...old,
            data: [...old.data, { ...newCOA, id: Date.now() }],
            count: old.count + 1,
          }
        }
      )

      return { previousOffDays }
    },
    onSuccess: async () => {
      toast.success(<Text as="b">{t("form-leave-allocation-added")}</Text>)
      router.push(`${routes.hr.leaveAllocations}`)
    },
    onError: (err: AxiosError, newCOA, context) => {
      if (err.response?.data === "Similar Data already exists") {
        toast.error(<Text as="b">{t("form-similar-data-error")}</Text>)
      }
      if (context?.previousOffDays) {
        const queryKey = [
          LEAVE_ALLOCATION_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousOffDays)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [LEAVE_ALLOCATION_KEYS.all],
        exact: false,
      })
    },
  })
}

// export function useUpdateLeaveAllocation() {
//   const queryClient = useQueryClient()

//   return useMutation<LeaveAllocation, AxiosError, LeaveAllocationPutData>({
//     mutationFn: (data) => LeaveAllocationService.update(data),
//     onSuccess: (data) => {
//       queryClient.invalidateQueries({
//         queryKey: [QUERY_KEYS.leaveAllocationList],
//       })
//       queryClient.invalidateQueries({
//         queryKey: [QUERY_KEYS.leaveAllocationList, data.id],
//       })
//     },
//   })
// }

export function useUpdateLeaveAllocation() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: ({ data }: { data: LeaveAllocation }) =>
      LeaveAllocationService.update(data),
    onMutate: async ({ data }) => {
      await queryClient.cancelQueries({
        queryKey: [LEAVE_ALLOCATION_KEYS.all],
        exact: false,
      })
      await queryClient.cancelQueries({
        queryKey: [LEAVE_ALLOCATION_KEYS.detail(data.id ?? 0)],
      })

      const queryKey = [
        QUERY_KEYS.offDayList,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousOffDays =
        queryClient.getQueryData<LeaveAllocationsDataResponse>(queryKey)
      const previousOffDay = queryClient.getQueryData<LeaveAllocation>(
        LEAVE_ALLOCATION_KEYS.all
      )

      queryClient.setQueryData<LeaveAllocationsDataResponse>(
        queryKey,
        (old) => {
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
        }
      )

      queryClient.setQueryData(LEAVE_ALLOCATION_KEYS.detail(data.id ?? 0), data)

      return { previousOffDays, previousOffDay }
    },
    onSuccess: async () => {
      toast.success(<Text as="b">{t("form-leave-allocation-updated")}</Text>)
      router.push(`${routes.hr.leaveAllocations}`)
    },
    onError: (err: AxiosError, variables, context) => {
      if (err.response?.data === "Similar Data already exists") {
        toast.error(<Text as="b">{t("form-similar-data-error")}</Text>)
      }
      if (context?.previousOffDays) {
        const queryKey = [
          LEAVE_ALLOCATION_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousOffDays)
      }
      if (context?.previousOffDay) {
        queryClient.setQueryData(
          LEAVE_ALLOCATION_KEYS.detail(variables.data.id ?? 0),
          context.previousOffDay
        )
      }
    },
    onSettled: (data) => {
      queryClient.invalidateQueries({
        queryKey: [LEAVE_ALLOCATION_KEYS.all],
        exact: false,
      })
      if (data?.id) {
        queryClient.invalidateQueries({
          queryKey: LEAVE_ALLOCATION_KEYS.detail(data.id),
        })
      }
    },
  })
}

export function useDeleteLeaveAllocation() {
  const queryClient = useQueryClient()
  return useMutation<void, AxiosError, number>({
    mutationFn: async (id) => {
      await LeaveAllocationService.delete(id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.leaveAllocationList],
      })
    },
  })
}

export function useBulkDeleteLeaveAllocation() {
  const queryClient = useQueryClient()
  const bulkDelete = useMutation<void, AxiosError, number[]>({
    mutationFn: async (ids) => {
      await LeaveAllocationService.bulkDelete(ids)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.leaveAllocationList],
      })
    },
  })

  return { bulkDelete }
}
