import { LeaveType } from "@/types/hrms/attendance-and-leave/leave-type.types"
import {
  HRMSFetchQueryOptions,
  PaginatedResponse,
} from "@/types/hrms/common.types"

export type OffDay = {
  id?: number
  offDayName: string
  leaveTypeId: number
  leaveType?: LeaveType
  dateFrom: string
  dateTo: string
  description?: string
}

export type OffDaysDataResponse = PaginatedResponse<OffDay>
export type OffDayQueryOptions = HRMSFetchQueryOptions
