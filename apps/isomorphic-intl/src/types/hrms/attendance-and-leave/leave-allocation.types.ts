import { LeaveType } from "@/types/hrms/attendance-and-leave/leave-type.types"
import {
  HRMSFetchQueryOptions,
  PaginatedResponse,
} from "@/types/hrms/common.types"

import { Employee } from "../employee/employee.types"

export type LeaveAllocation = {
  id?: number
  employeeId: number
  employee?: Employee
  leaveTypeId: number
  leaveType?: LeaveType
  validFrom?: string // utc date string
  validTo?: string // utc date string
  totalDays?: number
  remainingDays?: number
}

export type LeaveAllocationQueryOptions = HRMSFetchQueryOptions
export type LeaveAllocationsDataResponse = PaginatedResponse<LeaveAllocation>
