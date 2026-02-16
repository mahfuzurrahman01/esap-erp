import { ApiEndpoint } from "@/server/client"
import {
  AppraisalTemplate,
  AppraisalTemplateDataResponse,
  AppraisalTemplateQueryOptions,
} from "@/types/hrms/appraisal/appraisal-templates.types"
import HttpClient from "@/utils/axios"

export const AppraisalTemplateService = {
  all: (params: Partial<AppraisalTemplateQueryOptions>) => {
    return HttpClient.get<AppraisalTemplateDataResponse>(
      ApiEndpoint.hr.fetchAllAppraisalTemplates,
      params
    )
  },

  get: (id: number) => {
    return HttpClient.get<AppraisalTemplate>(
      ApiEndpoint.hr.fetchAppraisalTemplateById(id)
    )
  },

  create: (input: AppraisalTemplate) =>
    HttpClient.post<AppraisalTemplate>(
      ApiEndpoint.hr.createAppraisalTemplate,
      input
    ),

  update: (input: AppraisalTemplate) =>
    HttpClient.put<AppraisalTemplate>(
      ApiEndpoint.hr.updateAppraisalTemplate,
      input
    ),

  delete: (id: number) =>
    HttpClient.delete(ApiEndpoint.hr.deleteAppraisalTemplate(id)),

  bulkDelete: (ids: number[]) =>
    HttpClient.bulkDelete(ApiEndpoint.hr.deleteAppraisalTemplates, ids),
}
