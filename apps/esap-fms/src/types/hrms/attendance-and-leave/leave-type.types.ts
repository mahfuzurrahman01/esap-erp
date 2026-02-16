import {
  HRMSFetchQueryOptions,
  PaginatedResponse,
} from "@/types/hrms/common.types"

export type LeaveType = {
  id?: number
  leaveTypeName: string
  description?: string | null
  createdDate?: string | null
  updatedDate?: string | null
}

export type LeaveTypeQueryOptions = HRMSFetchQueryOptions
export type LeaveTypesDataResponse = PaginatedResponse<LeaveType>
