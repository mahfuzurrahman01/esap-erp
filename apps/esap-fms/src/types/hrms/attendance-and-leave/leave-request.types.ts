import { LeaveType } from "@/types/hrms/attendance-and-leave/leave-type.types"
import {
  HRMSFetchQueryOptions,
  PaginatedResponse,
} from "@/types/hrms/common.types"

import { Employee } from "../employee/employee.types"

export type LeaveRequest = {
  id?: number
  employeeId?: number
  employee?: Employee
  leaveTypeId: number
  leaveType?: LeaveType
  startDate: string
  endDate: string
  duration: number
  description?: string
  status?: string
}

export type ApprovalLeaveRequestFormInput = {
  id?: number
  status?: string
}

export type LeaveRequestDataResponse = PaginatedResponse<LeaveRequest>
export type ApprovalLeaveRequestDataResponse =
  PaginatedResponse<ApprovalLeaveRequestFormInput>
export type LeaveRequestQueryOptions = HRMSFetchQueryOptions
