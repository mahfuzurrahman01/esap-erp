import { ApiEndpoint } from "@/server/client"
import {
  ResumeType,
  ResumeTypeDataResponse,
  ResumeTypeQueryOptions,
} from "@/types/hrms/employee/resume-types.types"
import HttpClient from "@/utils/axios"
import { ResumeTypeFormInput } from "@/validators/hrms/resume-types.schema"

export const ResumeTypeService = {
  all: (params: Partial<ResumeTypeQueryOptions>) => {
    return HttpClient.get<ResumeTypeDataResponse>(
      ApiEndpoint.hr.fetchAllResumeTypes,
      params
    )
  },
  create: (input: ResumeTypeFormInput) =>
    HttpClient.post<ResumeType>(ApiEndpoint.hr.createResumeType, input),
  update: (input: ResumeType) =>
    HttpClient.put<ResumeType>(`${ApiEndpoint.hr.updateResumeType}`, input),
  delete: (id: number) =>
    HttpClient.delete(`${ApiEndpoint.hr.deleteResumeType(id)}`),
  bulkDelete: (ids: number[]) =>
    HttpClient.bulkDelete(`${ApiEndpoint.hr.deleteResumeTypes}`, ids),
}
