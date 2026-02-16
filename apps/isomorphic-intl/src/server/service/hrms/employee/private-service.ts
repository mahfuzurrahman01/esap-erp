import { ApiEndpoint } from "@/server/client"
import { PrivateInformation } from "@/types/hrms/employee/employee.types"
import HttpClient from "@/utils/axios"

export const privateService = {
  get: (id: number) =>
    HttpClient.get<PrivateInformation>(
      `${ApiEndpoint.hr.fetchPrivateInfoById(id)}`
    ),
  create: (input: PrivateInformation) =>
    HttpClient.post<PrivateInformation>(
      ApiEndpoint.hr.createPrivateInformation,
      input
    ),

  update: (input: PrivateInformation) =>
    HttpClient.put<PrivateInformation>(
      `${ApiEndpoint.hr.updatePrivateInformation}`,
      input
    ),

  delete: (id: number) =>
    HttpClient.delete(`${ApiEndpoint.hr.deletePrivateInformation(id)}`),
  //   bulkDelete: (ids: number[]) =>
  //     HttpClient.post(`${ApiEndpoint.hr.deleteEmployees}`, { ids }),
}
