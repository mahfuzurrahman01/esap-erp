import { LeaveType } from "@/types/hrms/attendance-and-leave/leave-type.types"

export type EmployeeLeaveRequest = {
  id: number
  leaveType: LeaveType
  dateFrom: string
  dateTo: string
  status: string
}

export type LeaveStats = {
  id?: number
  offDayName: string
  leaveTypeId: number
  dateFrom: string
  dateTo: string
  description?: string | null
}
