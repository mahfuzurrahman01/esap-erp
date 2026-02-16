import { ApiEndpoint } from "@/server/client"
import {
  Recruitment,
  RecruitmentCreateInput,
  RecruitmentDataResponse,
  RecruitmentQueryOptions,
} from "@/types/hrms/recruitment/recruitment-type"
import HttpClient from "@/utils/axios"

export const RecruitmentService = {
  all: (params: Partial<RecruitmentQueryOptions>) => {
    return HttpClient.get<RecruitmentDataResponse>(
      ApiEndpoint.hr.fetchAllRecruitments,
      params
    )
  },

  get: (id: number) =>
    HttpClient.get<Recruitment>(`${ApiEndpoint.hr.fetchRecruitmentById(id)}`),

  create: (input: RecruitmentCreateInput) =>
    HttpClient.post<Recruitment>(ApiEndpoint.hr.createRecruitment, input),

  update: (input: RecruitmentCreateInput) =>
    HttpClient.put<Recruitment>(`${ApiEndpoint.hr.updateRecruitment}`, input),

  delete: (id: number) =>
    HttpClient.delete(`${ApiEndpoint.hr.deleteRecruitment(id)}`),

  bulkDelete: (ids: number[]) =>
    HttpClient.bulkDelete(`${ApiEndpoint.hr.deleteRecruitments}`, ids),
}
