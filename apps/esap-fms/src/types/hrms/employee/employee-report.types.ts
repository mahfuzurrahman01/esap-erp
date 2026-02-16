import { HRMSFetchQueryOptions, PaginatedResponse } from "../common.types"

export interface EmployeeReport {
  badgeId?: string
  firstName?: string
  lastName?: string
  department?: string
  jobPosition?: string
  phone?: string
  email?: string
  isActive?: boolean
  manager?: string
  coach?: string
  country?: string
}
export type EmployeeMonthlyReportQueryOptions = HRMSFetchQueryOptions
export type EmployeeMonthlyReportDataResponse =
  PaginatedResponse<EmployeeReport>

// ========== Employee Daily Attendance Report ==========

export type EmployeeDailyAttendanceReport = {
  badgeId?: string
  firstName?: string
  lastName?: string
  checkIn?: string
  checkOut?: string
  workedHours?: number
  checkInMode?: string
  checkOutMode?: string
}
export type EmployeeDailyAttendanceReportDataResponse =
  PaginatedResponse<EmployeeDailyAttendanceReport>
export type EmployeeDailyAttendanceReportQueryOptions = HRMSFetchQueryOptions

// ========== Employee monthly time off report ==========

export type EmployeeMonthlyTimeOffReport = {
  badgeId?: string
  firstName?: string
  lastName?: string
  department?: string
  leaveType?: string
  startDate?: string
  endDate?: string
  duration?: number
  status?: string
  description?: string
}
export type EmployeeMonthlyTimeOffReportDataResponse =
  PaginatedResponse<EmployeeMonthlyTimeOffReport>
export type EmployeeMonthlyTimeOffReportQueryOptions = HRMSFetchQueryOptions

// ========== Employee yearly offday report ==========

export type EmployeeYearlyOffdayReport = {
  offDayName?: string
  leaveType?: string
  dateFrom?: string
  dateTo?: string
  description?: string
  totalDays?: number
}

export type EmployeeYearlyOffdayReportDataResponse =
  PaginatedResponse<EmployeeYearlyOffdayReport>
export type EmployeeYearlyOffdayReportQueryOptions = HRMSFetchQueryOptions

// ========== Saudi Employee Monthly Report ==========

export type SaudiEmployeeMonthlyReport = {
  badgeId?: string
  firstName?: string
  lastName?: string
  department?: string
  jobPosition?: string
  phone?: string
  email?: string
  country?: string
  manager?: string
}
export type SaudiEmployeeMonthlyReportDataResponse =
  PaginatedResponse<SaudiEmployeeMonthlyReport>
export type SaudiEmployeeMonthlyReportQueryOptions = HRMSFetchQueryOptions

// ========== Expatriate Employee Monthly Report ==========

export type ExpatriateEmployeeMonthlyReport = {
  badgeId?: string
  firstName?: string
  lastName?: string
  department?: string
  jobPosition?: string
  phone?: string
  email?: string
  country?: string
  manager?: string
}

export type ExpatriateEmployeeMonthlyReportDataResponse =
  PaginatedResponse<ExpatriateEmployeeMonthlyReport>
export type ExpatriateEmployeeMonthlyReportQueryOptions = HRMSFetchQueryOptions
