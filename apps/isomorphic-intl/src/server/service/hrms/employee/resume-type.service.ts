import { ApiEndpoint } from "@/server/client"
import {
  ResumeType,
  ResumeTypeDataResponse,
  ResumeTypeQueryOptions,
} from "@/types/hrms/employee/resume-types.types"
import HttpClient, { ApiEndpoint as ApiBase } from "@/utils/axios"
import { ResumeTypeFormInput } from "@/validators/hrms/resume-types.schema"

export const ResumeTypeService = {
  all: (params: Partial<ResumeTypeQueryOptions>) => {
    return HttpClient.get<ResumeTypeDataResponse>(
      ApiEndpoint.hr.fetchAllResumeTypes,
      params,
      ApiBase.HRMS
    )
  },
  create: (input: ResumeTypeFormInput) =>
    HttpClient.post<ResumeType>(
      ApiEndpoint.hr.createResumeType,
      input,
      false,
      ApiBase.HRMS
    ),
  update: (input: ResumeType) =>
    HttpClient.put<ResumeType>(
      `${ApiEndpoint.hr.updateResumeType}`,
      input,
      false,
      ApiBase.HRMS
    ),
  delete: (id: number) =>
    HttpClient.delete(`${ApiEndpoint.hr.deleteResumeType(id)}`, ApiBase.HRMS),
  bulkDelete: (ids: number[]) =>
    HttpClient.bulkDelete(
      `${ApiEndpoint.hr.deleteResumeTypes}`,
      ids,
      ApiBase.HRMS
    ),
}
