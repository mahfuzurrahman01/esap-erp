import { ApiEndpoint } from "@/server/client"
import { ResumeDetails } from "@/types/hrms/employee/employee.types"
import HttpClient from "@/utils/axios"

export const resumeService = {
  get: (id: number) =>
    HttpClient.get<ResumeDetails[]>(`${ApiEndpoint.hr.fetchResumeById(id)}`),
  create: (input: ResumeDetails) =>
    HttpClient.post<ResumeDetails>(ApiEndpoint.hr.createResume, input),

  update: (input: ResumeDetails) =>
    HttpClient.put<ResumeDetails>(`${ApiEndpoint.hr.updateResume}`, input),

  delete: (id: number) =>
    HttpClient.delete(`${ApiEndpoint.hr.deleteResume(id)}`),
  //   bulkDelete: (ids: number[]) =>
  //     HttpClient.post(`${ApiEndpoint.hr.deleteEmployees}`, { ids }),
}
