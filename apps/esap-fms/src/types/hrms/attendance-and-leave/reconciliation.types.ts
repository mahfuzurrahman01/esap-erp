import {
  HRMSFetchQueryOptions,
  PaginatedResponse,
} from "@/types/hrms/common.types"

export type ReconciliationRequest = {
  requestId?: number | undefined
  id?: number | undefined
  attendanceId: number
  attendance?: Attendance
  requestedCheckOut?: string
  reason: string
  status?: string
  requestDate?: Date
  responseDate?: Date
}

export type ApprovalFormInput = {
  requestId?: number
  status?: string
}

type Attendance = {
  id: number
  employeeId: number
  employee?: Employee | null
  checkIn?: Date
  checkOut?: Date
  mode?: string
  workedHours?: number
  createdDate?: Date
  updatedDate?: Date
}

type Employee = {
  id: number
  firstName: string
  lastName?: string
  avatarUrl?: string
  department?: Department
  phone?: string
  emergencyPhone?: string
  email?: string
  jobPosition?: string
  country?: string
  manager?: null
  coach?: null
  resumes?: any[]
  workInformation?: null
  privateInformation?: null
  createdDate: Date
  updatedDate: Date
}

type Department = {
  id: number
  departmentName: string
}

export type ReconciliationQueryOptions = HRMSFetchQueryOptions & {
  departmentId?: number | string
  employeeId?: number | string
  status?: string
}

export type ReconciliationDataResponse =
  PaginatedResponse<ReconciliationRequest>

export type ApprovalQueryOptions = HRMSFetchQueryOptions & {
  departmentId?: number | string
  employeeId?: number
  status?: string
}
export type ApprovalDataResponse = PaginatedResponse<ApprovalFormInput>
