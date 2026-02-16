import { ApiEndpoint } from "@/server/client"
import { WorkInformation } from "@/types/hrms/employee/employee.types"
import HttpClient from "@/utils/axios"

export const workService = {
  get: (id: number) =>
    HttpClient.get<WorkInformation>(`${ApiEndpoint.hr.fetchWorkInfoById(id)}`),
  create: (input: WorkInformation) =>
    HttpClient.post<WorkInformation>(ApiEndpoint.hr.createWorkInfo, input),

  update: (input: WorkInformation) =>
    HttpClient.put<WorkInformation>(`${ApiEndpoint.hr.updateWorkInfo}`, input),

  delete: (id: number) =>
    HttpClient.delete(`${ApiEndpoint.hr.deleteWorkInformation(id)}`),
  //   bulkDelete: (ids: number[]) =>
  //     HttpClient.post(`${ApiEndpoint.hr.deleteEmployees}`, { ids }),
}
