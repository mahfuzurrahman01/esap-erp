import {
  HRMSFetchQueryOptions,
  PaginatedResponse,
} from "@/types/hrms/common.types"

export type Attendance = {
  id?: number
  employeeId: number
  checkIn?: string
  checkOut?: string
  checkInMode?: string
  checkOutMode?: string
  workedHours?: number
  employee?: Employee
  createdDate?: string | null
  updatedDate?: string | null
}

type Employee = {
  id: number
  firstName: string
  lastName?: string
  email: string
  avatarUrl?: string
  department?: { id: number; departmentName: string }
  phone?: string
  emergencyPhone?: string
  jobPosition?: string
  country?: string
  createdDate: string
  updatedDate: string
}

export type AttendanceFormInputType = {
  employeeId: number
  checkIn?: string
  checkOut?: string
  checkInMode?: string
  checkOutMode?: string
}

export type AttendancesDataResponse = PaginatedResponse<Attendance>
export type AttendanceQueryOptions = HRMSFetchQueryOptions
