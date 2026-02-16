import { ApiEndpoint } from "@/server/client"
import {
  EmployeeDailyAttendanceReport,
  EmployeeDailyAttendanceReportQueryOptions,
  EmployeeMonthlyReportQueryOptions,
  EmployeeMonthlyTimeOffReport,
  EmployeeMonthlyTimeOffReportQueryOptions,
  EmployeeReport,
  EmployeeYearlyOffdayReport,
  EmployeeYearlyOffdayReportQueryOptions,
  ExpatriateEmployeeMonthlyReport,
  ExpatriateEmployeeMonthlyReportQueryOptions,
  SaudiEmployeeMonthlyReport,
  SaudiEmployeeMonthlyReportQueryOptions,
} from "@/types/hrms/employee/employee-report.types"
import HttpClient from "@/utils/axios"

export const EmployeeReportService = {
  getMonthlyReport: (params: Partial<EmployeeMonthlyReportQueryOptions>) => {
    return HttpClient.get<EmployeeReport[]>(
      ApiEndpoint.hr.fetchEmployeeMonthlyReport,
      params
    )
  },

  // ========== Employee daily attendance report ==========
  getDailyAttendanceReport: (
    params: Partial<EmployeeDailyAttendanceReportQueryOptions>
  ) => {
    return HttpClient.get<EmployeeDailyAttendanceReport[]>(
      ApiEndpoint.hr.fetchEmployeeDailyAttendanceReport,
      params
    )
  },

  // ========== Employee monthly time off report ==========

  getMonthlyTimeOffReport: (
    params: Partial<EmployeeMonthlyTimeOffReportQueryOptions>
  ) => {
    return HttpClient.get<EmployeeMonthlyTimeOffReport[]>(
      ApiEndpoint.hr.fetchEmployeeTimeOffReport,
      params
    )
  },

  // ========== Employee yearly offday report ==========

  getYearlyOffdayReport: (
    params: Partial<EmployeeYearlyOffdayReportQueryOptions>
  ) => {
    return HttpClient.get<EmployeeYearlyOffdayReport[]>(
      ApiEndpoint.hr.fetchEmployeeYearlyOffdayReport,
      params
    )
  },

  // ========== Saudi Employee Monthly Report ==========

  getSaudiEmployeeMonthlyReport: (
    params: Partial<SaudiEmployeeMonthlyReportQueryOptions>
  ) => {
    return HttpClient.get<SaudiEmployeeMonthlyReport[]>(
      ApiEndpoint.hr.fetchSaudiEmployeeMonthlyReport,
      params
    )
  },
  getExpatriateEmployeeMonthlyReport: (
    params: Partial<ExpatriateEmployeeMonthlyReportQueryOptions>
  ) => {
    return HttpClient.get<ExpatriateEmployeeMonthlyReport[]>(
      ApiEndpoint.hr.fetchExpatriateEmployeeMonthlyReport,
      params
    )
  },
}
