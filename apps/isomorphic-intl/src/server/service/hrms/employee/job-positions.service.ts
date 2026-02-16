import { ApiEndpoint } from "@/server/client"
import {
  JobPosition,
  JobPositionCreateInput,
  JobPositionQueryOptions,
  JobPositionUpdateInput,
  JobPositionsDataResponse,
} from "@/types/hrms/employee/job-positions.types"
import HttpClient, { ApiEndpoint as ApiBase } from "@/utils/axios"

export const JobPositionService = {
  all: (params: Partial<JobPositionQueryOptions>) => {
    return HttpClient.get<JobPositionsDataResponse>(
      ApiEndpoint.hr.fetchAllJobPositions,
      params,
      ApiBase.HRMS
    )
  },
  create: (input: JobPositionCreateInput) =>
    HttpClient.post<JobPosition>(
      ApiEndpoint.hr.createJobPosition,
      input,
      false,
      ApiBase.HRMS
    ),
  update: (input: JobPositionUpdateInput) =>
    HttpClient.put<JobPosition>(
      `${ApiEndpoint.hr.updateJobPosition}`,
      input,
      false,
      ApiBase.HRMS
    ),
  delete: (id: number) =>
    HttpClient.delete(`${ApiEndpoint.hr.deleteJobPosition(id)}`, ApiBase.HRMS),
  bulkDelete: (ids: number[]) =>
    HttpClient.bulkDelete(
      `${ApiEndpoint.hr.deleteJobPositions}`,
      ids,
      ApiBase.HRMS
    ),
}
