import { ApiEndpoint } from "@/server/client"
import {
  Application,
  ApplicationCreateInput,
  ApplicationDataResponse,
  ApplicationQueryOptions,
} from "@/types/hrms/recruitment/applications-type"
import HttpClient from "@/utils/axios"

export const ApplicationService = {
  all: (params: Partial<ApplicationQueryOptions>) => {
    return HttpClient.get<ApplicationDataResponse>(
      ApiEndpoint.hr.fetchAllApplications,
      params
    )
  },

  get: (id: number) =>
    HttpClient.get<Application>(`${ApiEndpoint.hr.fetchApplicationById(id)}`),

  create: (input: ApplicationCreateInput) =>
    HttpClient.post<Application>(ApiEndpoint.hr.createApplication, input, true),

  updateStatus: (id: number, status: Application["status"]) =>
    HttpClient.patch<Application>(ApiEndpoint.hr.updateApplicationStatus, {
      id,
      status,
    }),

  delete: (id: number) =>
    HttpClient.delete(`${ApiEndpoint.hr.deleteApplication(id)}`),

  bulkDelete: (ids: number[]) =>
    HttpClient.bulkDelete(`${ApiEndpoint.hr.deleteApplications}`, ids),
}
