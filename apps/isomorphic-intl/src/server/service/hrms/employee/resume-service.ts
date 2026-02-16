import { ApiEndpoint } from "@/server/client"
import { ResumeDetails } from "@/types/hrms/employee/employee.types"
import HttpClient, { ApiEndpoint as ApiBase } from "@/utils/axios"

export const resumeService = {
  get: (id: number) =>
    HttpClient.get<ResumeDetails[]>(
      `${(ApiEndpoint.hr.fetchResumeById(id), ApiBase.HRMS)}`
    ),
  create: (input: ResumeDetails) =>
    HttpClient.post<ResumeDetails>(
      ApiEndpoint.hr.createResume,
      input,
      false,
      ApiBase.HRMS
    ),

  update: (input: ResumeDetails) =>
    HttpClient.put<ResumeDetails>(
      `${ApiEndpoint.hr.updateResume}`,
      input,
      false,
      ApiBase.HRMS
    ),

  delete: (id: number) =>
    HttpClient.delete(`${ApiEndpoint.hr.deleteResume(id)}`, ApiBase.HRMS),
  //   bulkDelete: (ids: number[]) =>
  //     HttpClient.post(`${ApiEndpoint.hr.deleteEmployees}`, { ids }),
}
