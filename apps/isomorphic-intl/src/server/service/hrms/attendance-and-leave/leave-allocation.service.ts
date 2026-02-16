import { ApiEndpoint } from "@/server/client"
import {
  LeaveAllocation,
  LeaveAllocationQueryOptions,
  LeaveAllocationsDataResponse,
} from "@/types/hrms/attendance-and-leave/leave-allocation.types"
import HttpClient from "@/utils/axios"

export const LeaveAllocationService = {
  all: (params: Partial<LeaveAllocationQueryOptions>) => {
    return HttpClient.get<LeaveAllocationsDataResponse>(
      ApiEndpoint.hr.fetchAllLeaveAllocations,
      params
    )
  },
  create: (input: LeaveAllocation) =>
    HttpClient.post<LeaveAllocation>(
      ApiEndpoint.hr.createLeaveAllocation,
      input
    ),
  update: (input: LeaveAllocation) =>
    HttpClient.put<LeaveAllocation>(
      `${ApiEndpoint.hr.updateLeaveAllocation}`,
      input
    ),
  delete: (id: number) =>
    HttpClient.delete(`${ApiEndpoint.hr.deleteLeaveAllocation(id)}`),
  bulkDelete: (ids: number[]) =>
    HttpClient.bulkDelete(`${ApiEndpoint.hr.deleteLeaveAllocations}`, ids),
}
