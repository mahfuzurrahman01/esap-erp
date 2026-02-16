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
import { LeaveRequestService } from "@/server/service/hrms/attendance-and-leave/leave-request.service"
import { QUERY_KEYS } from "@/server/service/hrms/hrms-query-keys.constants"
import { createQueryKeys } from "@/server/service/query-config"
import {
  ApprovalLeaveRequestDataResponse,
  ApprovalLeaveRequestFormInput,
  LeaveRequest,
  LeaveRequestDataResponse,
  LeaveRequestQueryOptions,
} from "@/types/hrms/attendance-and-leave/leave-request.types"

const LEAVE_REQUEST_KEYS = createQueryKeys(QUERY_KEYS.leaveRequestList)

export function useLeaveRequestList(
  options?: Partial<LeaveRequestQueryOptions>
) {
  const queryKey = [LEAVE_REQUEST_KEYS.all, options]

  return useQuery<LeaveRequestDataResponse, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return LeaveRequestService.all(Object.assign({}, queryKey[1], pageParam))
    },
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}

// export function useCreateOffDay() {
//   const queryClient = useQueryClient()
//   return useMutation<OffDay, AxiosError, OffDayPostData>({
//     mutationFn: (data) => OffDayService.create(data),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.offDayList] })
//     },
//   })
// }

export function useCreateLeaveRequest() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: LeaveRequest): Promise<LeaveRequest> =>
      LeaveRequestService.create(data),
    onMutate: async (newCOA) => {
      await queryClient.cancelQueries({
        queryKey: [LEAVE_REQUEST_KEYS.all],
        exact: false,
      })

      const queryKey = [
        LEAVE_REQUEST_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousOffDays =
        queryClient.getQueryData<LeaveRequestDataResponse>(queryKey)

      queryClient.setQueryData<LeaveRequestDataResponse>(queryKey, (old) => {
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
      })

      return { previousOffDays }
    },
    onSuccess: async () => {
      toast.success(<Text as="b">{t("form-leave-request-added")}</Text>)
      router.push(`${routes.hr.leaveRequest}`)
    },
    onError: (err: AxiosError, newCOA, context) => {
      //   if (err.response?.data === "Similar Data already exists") {
      //     toast.error(<Text as="b">{t("form-similar-data-error")}</Text>)
      //   }
      if (context?.previousOffDays) {
        const queryKey = [
          LEAVE_REQUEST_KEYS.all,
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
        queryKey: [LEAVE_REQUEST_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useLeaveRequestApproval() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (
      data: ApprovalLeaveRequestFormInput
    ): Promise<ApprovalLeaveRequestFormInput> =>
      LeaveRequestService.update(data),
    onMutate: async (newAttendance) => {
      await queryClient.cancelQueries({
        queryKey: [LEAVE_REQUEST_KEYS.all],
        exact: false,
      })

      const queryKey = [
        LEAVE_REQUEST_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousCOAs =
        queryClient.getQueryData<ApprovalLeaveRequestDataResponse>(queryKey)

      queryClient.setQueryData<ApprovalLeaveRequestDataResponse>(
        queryKey,
        (old) => {
          if (!old)
            return {
              data: [newAttendance],
              count: 1,
              pageIndex: DEFAULT_PAGE_INDEX,
              pageSize: DEFAULT_PAGE_SIZE,
            }
          return {
            ...old,
            data: [...old.data, { ...newAttendance, id: Date.now() }],
            count: old.count + 1,
          }
        }
      )

      return { previousCOAs }
    },
    onSuccess: async () => {
      toast.success(<Text as="b">{t("form-leave-request-updated")}</Text>)
      router.push(`${routes.hr.leaveRequest}`)
    },
    onError: (err: AxiosError, newAttendance, context) => {
      toast.error(<Text as="b">{err.response?.data as string}</Text>)
      if (context?.previousCOAs) {
        const queryKey = [
          LEAVE_REQUEST_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousCOAs)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [LEAVE_REQUEST_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useDeleteLeaveRequest() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (id: number) => LeaveRequestService.delete(id),
    onMutate: async (id) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [LEAVE_REQUEST_KEYS.all],
        exact: false,
      })

      const queryKey = [
        LEAVE_REQUEST_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      // Snapshot the previous value
      const previousOffDays =
        queryClient.getQueryData<LeaveRequestDataResponse>(queryKey)

      // Optimistically remove the COA from the list
      queryClient.setQueryData<LeaveRequestDataResponse>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => item.id !== id),
          count: old.count - 1,
        }
      })

      return { previousOffDays }
    },

    onSuccess: () => {
      toast.success(<Text as="b">{t("form-leave-request-deleted")}</Text>)
      // queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.employeeList] })
    },

    onError: (err, variables, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousOffDays) {
        const queryKey = [
          LEAVE_REQUEST_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousOffDays)
      }
    },

    onSettled: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [LEAVE_REQUEST_KEYS.all],
        exact: false,
      })
    },
  })
}
