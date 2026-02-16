import { ApiEndpoint } from "@/server/client"
import {
  ApprovalLeaveRequestFormInput,
  LeaveRequest,
  LeaveRequestDataResponse,
} from "@/types/hrms/attendance-and-leave/leave-request.types"
import HttpClient from "@/utils/axios"
import { LeaveRequestFormInput } from "@/validators/hrms/leave-request.schema"

export const LeaveRequestService = {
  all: (params: any) => {
    return HttpClient.get<LeaveRequestDataResponse>(
      ApiEndpoint.hr.fetchAllLeaveRequest,
      params
    )
  },
  create: (input: LeaveRequestFormInput) =>
    HttpClient.post<LeaveRequest>(ApiEndpoint.hr.createLeaveRequest, input),
  update: (input: ApprovalLeaveRequestFormInput) =>
    HttpClient.put<ApprovalLeaveRequestFormInput>(
      `${ApiEndpoint.hr.updateLeaveRequest}`,
      input
    ),
  delete: (id: number) =>
    HttpClient.delete(`${ApiEndpoint.hr.deleteLeaveRequest(id)}`),
}
