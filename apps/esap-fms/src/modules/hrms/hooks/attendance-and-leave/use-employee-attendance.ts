import { keepPreviousData, useQuery } from "@tanstack/react-query"

import { AttendanceService } from "@/server/service/hrms/attendance-and-leave/attendance.service"
import { QUERY_KEYS } from "@/server/service/hrms/hrms-query-keys.constants"
import {
  AttendanceQueryOptions,
  AttendancesDataResponse,
} from "@/types/hrms/attendance-and-leave/attendance.types"

// Fetch Attendance list with pagination
export function useEmployeeAttendanceList(
  options?: Partial<AttendanceQueryOptions>
) {
  const { data, isLoading, isError, isFetching, refetch } = useQuery<
    AttendancesDataResponse,
    Error
  >({
    queryKey: [QUERY_KEYS.attendanceList, options],
    queryFn: ({ queryKey, pageParam }) => {
      return AttendanceService.all(Object.assign({}, queryKey[1], pageParam))
    },
    placeholderData: keepPreviousData, // don't have 0 rows flash while changing pages/loading next page
  })

  return {
    data,
    isLoading,
    error: isError,
    isFetching,
    refetch,
  }
}
