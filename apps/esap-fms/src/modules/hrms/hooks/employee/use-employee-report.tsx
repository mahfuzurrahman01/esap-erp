import { keepPreviousData, useQuery } from "@tanstack/react-query"

import { EmployeeReportService } from "@/server/service/hrms/employee/report.service"
import { QUERY_KEYS } from "@/server/service/hrms/hrms-query-keys.constants"
import { createQueryKeys } from "@/server/service/query-config"
import {
  EmployeeDailyAttendanceReport,
  EmployeeDailyAttendanceReportQueryOptions,
  EmployeeMonthlyReportQueryOptions,
  EmployeeMonthlyTimeOffReport,
  EmployeeMonthlyTimeOffReportQueryOptions,
  EmployeeReport,
  EmployeeYearlyOffdayReport,
  EmployeeYearlyOffdayReportQueryOptions,
  ExpatriateEmployeeMonthlyReportQueryOptions,
  SaudiEmployeeMonthlyReport,
  SaudiEmployeeMonthlyReportQueryOptions,
} from "@/types/hrms/employee/employee-report.types"

// Create query keys for dashboard report
const EMPLOYEE_REPORT_KEYS = createQueryKeys(QUERY_KEYS.employeeMonthlyReport)
const ATTENDANCE_REPORT_KEYS = createQueryKeys(
  QUERY_KEYS.employeeDailyAttendanceReport
)
const TIME_OFF_REPORT_KEYS = createQueryKeys(QUERY_KEYS.employeeTimeOffReport)
const YEARLY_OFFDAY_REPORT_KEYS = createQueryKeys(
  QUERY_KEYS.employeeYearlyOffdayReport
)
const SAUDI_EMPLOYEE_MONTHLY_REPORT_KEYS = createQueryKeys(
  QUERY_KEYS.saudiEmployeeMonthlyReport
)
const EXPATRIATE_EMPLOYEE_MONTHLY_REPORT_KEYS = createQueryKeys(
  QUERY_KEYS.expatriateEmployeeMonthlyReport
)
// Fetch department statistics

export function useEmployeeMonthlyReport(
  options?: Partial<EmployeeMonthlyReportQueryOptions>
) {
  const queryKey = [EMPLOYEE_REPORT_KEYS.all, options]

  return useQuery<EmployeeReport[], Error>({
    queryKey,
    queryFn: () => EmployeeReportService.getMonthlyReport(options || {}),
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}

// ========== Employee Daily Attendance Report ==========

export function useEmployeeDailyAttendanceReport(
  options?: Partial<EmployeeDailyAttendanceReportQueryOptions>
) {
  const queryKey = [ATTENDANCE_REPORT_KEYS.all, options]

  return useQuery<EmployeeDailyAttendanceReport[], Error>({
    queryKey,
    queryFn: () =>
      EmployeeReportService.getDailyAttendanceReport(options || {}),
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}

// ========== Employee monthly time off report ==========

export function useEmployeeMonthlyTimeOffReport(
  options?: Partial<EmployeeMonthlyTimeOffReportQueryOptions>
) {
  const queryKey = [TIME_OFF_REPORT_KEYS.all, options]

  return useQuery<EmployeeMonthlyTimeOffReport[], Error>({
    queryKey,
    queryFn: () => EmployeeReportService.getMonthlyTimeOffReport(options || {}),
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}

// ========== Employee yearly offday report ==========

export function useYearlyOffdayReport(
  options?: Partial<EmployeeYearlyOffdayReportQueryOptions>
) {
  const queryKey = [YEARLY_OFFDAY_REPORT_KEYS.all, options]

  return useQuery<EmployeeYearlyOffdayReport[], Error>({
    queryKey,
    queryFn: () => EmployeeReportService.getYearlyOffdayReport(options || {}),
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}

// ========== Saudi Employee Monthly Report ==========

export function useSaudiEmployeeMonthlyReport(
  options?: Partial<SaudiEmployeeMonthlyReportQueryOptions>
) {
  const queryKey = [SAUDI_EMPLOYEE_MONTHLY_REPORT_KEYS.all, options]

  return useQuery<SaudiEmployeeMonthlyReport[], Error>({
    queryKey,
    queryFn: () =>
      EmployeeReportService.getSaudiEmployeeMonthlyReport(options || {}),
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}

// ========== Expatriate Employee Monthly Report ==========

export function useExpatriateEmployeeMonthlyReport(
  options?: Partial<ExpatriateEmployeeMonthlyReportQueryOptions>
) {
  const queryKey = [EXPATRIATE_EMPLOYEE_MONTHLY_REPORT_KEYS.all, options]

  return useQuery<SaudiEmployeeMonthlyReport[], Error>({
    queryKey,
    queryFn: () =>
      EmployeeReportService.getExpatriateEmployeeMonthlyReport(options || {}),
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}
