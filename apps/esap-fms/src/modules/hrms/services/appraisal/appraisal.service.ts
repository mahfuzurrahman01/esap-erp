import { ApiEndpoint } from "@/server/client"
import {
  Appraisal,
  AppraisalDataResponse,
  AppraisalQueryOptions,
} from "@/types/hrms/appraisal/appraisals.types"
import HttpClient from "@/utils/axios"

export const AppraisalService = {
  all: (params: Partial<AppraisalQueryOptions>) => {
    return HttpClient.get<AppraisalDataResponse>(
      ApiEndpoint.hr.fetchAllAppraisals,
      params
    )
  },

  get: (id: number) => {
    return HttpClient.get<Appraisal>(ApiEndpoint.hr.fetchAppraisalById(id))
  },

  create: (input: Appraisal) =>
    HttpClient.post<Appraisal>(ApiEndpoint.hr.createAppraisal, input),

  update: (input: Appraisal) =>
    HttpClient.put<Appraisal>(ApiEndpoint.hr.updateAppraisal, input),

  delete: (id: number) => HttpClient.delete(ApiEndpoint.hr.deleteAppraisal(id)),

  bulkDelete: (ids: number[]) =>
    HttpClient.bulkDelete(ApiEndpoint.hr.deleteAppraisals, ids),
}
