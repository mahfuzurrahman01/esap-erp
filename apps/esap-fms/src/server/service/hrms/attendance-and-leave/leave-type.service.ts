import { ApiEndpoint } from "@/server/client"
import {
  LeaveType,
  LeaveTypeQueryOptions,
  LeaveTypesDataResponse,
} from "@/types/hrms/attendance-and-leave/leave-type.types"
import HttpClient from "@/utils/axios"

export const LeaveTypeService = {
  all: (params: Partial<LeaveTypeQueryOptions>) => {
    return HttpClient.get<LeaveTypesDataResponse>(
      ApiEndpoint.hr.fetchAllLeaveTypes,
      params
    )
  },
  create: (input: LeaveType) =>
    HttpClient.post<LeaveType>(ApiEndpoint.hr.createLeaveType, input),
  update: (input: LeaveType) =>
    HttpClient.put<LeaveType>(`${ApiEndpoint.hr.updateLeaveType}`, input),
  delete: (id: number) =>
    HttpClient.delete(`${ApiEndpoint.hr.deleteLeaveType(id)}`),
  bulkDelete: (ids: number[]) =>
    HttpClient.bulkDelete(`${ApiEndpoint.hr.deleteLeaveTypes}`, ids),
}
