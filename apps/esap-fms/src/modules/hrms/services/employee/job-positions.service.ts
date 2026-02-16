import { ApiEndpoint } from "@/server/client"
import {
  JobPosition,
  JobPositionCreateInput,
  JobPositionQueryOptions,
  JobPositionUpdateInput,
  JobPositionsDataResponse,
} from "@/types/hrms/employee/job-positions.types"
import HttpClient from "@/utils/axios"

export const JobPositionService = {
  all: (params: Partial<JobPositionQueryOptions>) => {
    return HttpClient.get<JobPositionsDataResponse>(
      ApiEndpoint.hr.fetchAllJobPositions,
      params
    )
  },
  create: (input: JobPositionCreateInput) =>
    HttpClient.post<JobPosition>(ApiEndpoint.hr.createJobPosition, input),
  update: (input: JobPositionUpdateInput) =>
    HttpClient.put<JobPosition>(`${ApiEndpoint.hr.updateJobPosition}`, input),
  delete: (id: number) =>
    HttpClient.delete(`${ApiEndpoint.hr.deleteJobPosition(id)}`),
  bulkDelete: (ids: number[]) =>
    HttpClient.bulkDelete(`${ApiEndpoint.hr.deleteJobPositions}`, ids),
}
