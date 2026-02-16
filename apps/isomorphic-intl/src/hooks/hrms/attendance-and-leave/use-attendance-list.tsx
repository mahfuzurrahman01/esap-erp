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
import { AttendanceService } from "@/server/service/hrms/attendance-and-leave/attendance.service"
import { QUERY_KEYS } from "@/server/service/hrms/hrms-query-keys.constants"
import {
  DEFAULT_QUERY_OPTIONS,
  createQueryKeys,
} from "@/server/service/query-config"
import {
  Attendance,
  AttendanceQueryOptions,
  AttendancesDataResponse,
} from "@/types/hrms/attendance-and-leave/attendance.types"
import { AttendancePutData } from "@/validators/hrms/attendance.schema"

// Fetch Attendance list with pagination
const ATTENDANCE_KEYS = createQueryKeys(QUERY_KEYS.attendanceList)

// fetch all attendance list
export function useAttendanceList(options?: Partial<AttendanceQueryOptions>) {
  const queryKey = [ATTENDANCE_KEYS.all, options]

  return useQuery<AttendancesDataResponse, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return AttendanceService.all(Object.assign({}, queryKey[1], pageParam))
    },
    placeholderData: keepPreviousData,
    staleTime: 0,
    gcTime: 10 * 60 * 1000,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  })
}

// Fetch single Attendance by ID
export function useAttendanceById(id: number) {
  return useQuery({
    queryKey: ATTENDANCE_KEYS.detail(id),
    queryFn: () => AttendanceService.get(id),
    enabled: !!id,
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  })
}

// Create new Attendance
export function useCreateAttendanceCheckIn() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: Attendance): Promise<Attendance> =>
      AttendanceService.checkIn(data),
    onMutate: async (newAttendance) => {
      await queryClient.cancelQueries({
        queryKey: [ATTENDANCE_KEYS.all],
        exact: false,
      })

      const queryKey = [
        ATTENDANCE_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousCOAs =
        queryClient.getQueryData<AttendancesDataResponse>(queryKey)

      queryClient.setQueryData<AttendancesDataResponse>(queryKey, (old) => {
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
      })

      return { previousCOAs }
    },
    onSuccess: async () => {
      toast.success(<Text as="b">{t("form-attendance-added")}</Text>)
      router.push(`${routes.hr.attendances}`)
    },
    onError: (err: AxiosError, newAttendance, context) => {
      if (err?.response?.data == "Check-in already recorded for today.") {
        toast.error(
          <Text as="b">{t("form-check-in-already-recorded-for-today")}</Text>
        )
      }
      if (context?.previousCOAs) {
        const queryKey = [
          ATTENDANCE_KEYS.all,
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
        queryKey: [ATTENDANCE_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useCreateAttendanceCheckOut() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: Attendance): Promise<Attendance> =>
      AttendanceService.checkOut(data),
    onMutate: async (newAttendance) => {
      await queryClient.cancelQueries({
        queryKey: [ATTENDANCE_KEYS.all],
        exact: false,
      })

      const queryKey = [
        ATTENDANCE_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousCOAs =
        queryClient.getQueryData<AttendancesDataResponse>(queryKey)

      queryClient.setQueryData<AttendancesDataResponse>(queryKey, (old) => {
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
      })

      return { previousCOAs }
    },
    onSuccess: async () => {
      toast.success(<Text as="b">{t("form-attendance-added")}</Text>)
      router.push(`${routes.hr.attendances}`)
    },
    onError: (err: AxiosError, newAttendance, context) => {
      if (
        err?.response?.data == "No check-in found for the given employee today."
      ) {
        toast.error(<Text as="b">{t("form-no-check-in-found-for-today")}</Text>)
      }
      if (context?.previousCOAs) {
        const queryKey = [
          ATTENDANCE_KEYS.all,
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
        queryKey: [ATTENDANCE_KEYS.all],
        exact: false,
      })
    },
  })
}

// Update existing Attendance
export function useUpdateAttendance() {
  const queryClient = useQueryClient()

  return useMutation<Attendance, AxiosError, AttendancePutData>({
    mutationFn: (data) => AttendanceService.update(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.attendanceList] })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.attendance, data.id],
      })
    },
  })
}

// Delete Attendance
export function useDeleteAttendance() {
  const queryClient = useQueryClient()
  return useMutation<void, AxiosError, number>({
    mutationFn: async (id) => {
      await AttendanceService.delete(id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.attendanceList] })
    },
  })
}

// Advanced feature: Bulk operations
export function useBulkDeleteAttendance() {
  const queryClient = useQueryClient()
  const bulkDelete = useMutation<void, AxiosError, number[]>({
    mutationFn: async (ids) => {
      await AttendanceService.bulkDelete(ids)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.attendanceList] })
    },
  })

  return { bulkDelete }
}

// Fetch Attendance statistics by employee ID
export function useAttendanceStatisticsByEmployeeId(id: number) {
  return useQuery<any, AxiosError>({
    queryKey: [QUERY_KEYS.attendance, id],
    queryFn: () => AttendanceService.getEmployeeAttendanceStatistics(id),
    enabled: !!id,
  })
}
