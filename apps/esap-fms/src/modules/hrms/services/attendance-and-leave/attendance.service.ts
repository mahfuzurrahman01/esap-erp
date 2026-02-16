import { ApiEndpoint } from "@/server/client"
import {
  Attendance,
  AttendanceQueryOptions,
  AttendancesDataResponse,
} from "@/types/hrms/attendance-and-leave/attendance.types"
import httpClient from "@/utils/axios"
import {
  AttendancePostData,
  AttendancePutData,
} from "@/validators/hrms/attendance.schema"

export const AttendanceService = {
  all: (params: Partial<AttendanceQueryOptions>) => {
    return httpClient.get<AttendancesDataResponse>(
      ApiEndpoint.hr.fetchAllAttendances,
      params
    )
  },
  get: (id: number) =>
    httpClient.get<Attendance>(`${ApiEndpoint.hr.fetchAttendanceById(id)}`),
  create: (input: AttendancePostData) =>
    httpClient.post<Attendance>(ApiEndpoint.hr.createAttendance, input),
  checkIn: (input: AttendancePostData) =>
    httpClient.post<Attendance>(ApiEndpoint.hr.attendanceCheckIn, input),
  checkOut: (input: AttendancePostData) =>
    httpClient.post<Attendance>(ApiEndpoint.hr.attendanceCheckOut, input),
  update: (input: AttendancePutData) =>
    httpClient.put<Attendance>(`${ApiEndpoint.hr.updateAttendance}`, input),
  delete: (id: number) =>
    httpClient.delete(`${ApiEndpoint.hr.deleteAttendance(id)}`),
  bulkDelete: (ids: number[]) =>
    httpClient.post(`${ApiEndpoint.hr.deleteAttendances}`, { ids }),
  getEmployeeAttendanceStatistics: (employeeId: number) =>
    httpClient.get<any>(
      `${ApiEndpoint.hr.fetchEmployeeAttendanceStatistics(employeeId)}`
    ),
  getEmployeeAttendance: (
    employeeId: number,
    params: Partial<AttendanceQueryOptions>
  ) =>
    httpClient.get<AttendancesDataResponse>(
      `${ApiEndpoint.hr.fetchEmployeeAttendance(employeeId)}`,
      params
    ),
}
